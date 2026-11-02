import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/features/auth/UseAuth";
import { authService } from "@/features/auth/AuthService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { cn } from "@/utils/cn";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{7,15}$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

const roleLabel: Record<string, string> = {
  customer: "Customer",
  owner: "Restaurant owner",
  admin: "Admin",
};

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [serverError, setServerError] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name ?? "", phone: "" },
  });

  // ProtectedRoute guarantees a user, this only satisfies TypeScript
  if (!user) return null;

  const onSubmit = async (values: FormValues) => {
    setServerError("");
    setSaved(false);
    try {
      const updated = await authService.updateProfile({
        name: values.name,
        phone: values.phone ?? "", // an empty string clears the phone number
      });
      updateUser(updated);
      reset({ name: updated.name, phone: values.phone ?? "" });
      setSaved(true);
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <div className="container-page py-8">
      <h1 className="page-title">My profile</h1>
      <p className="mt-1 text-sm text-ink-soft">
        View and update your account details.
      </p>

      <div className="card mt-6 max-w-2xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="profile-email">
              Email
            </label>
            <input
              id="profile-email"
              className="input"
              value={"email" in user && typeof user.email === "string" ? user.email : ""}
              disabled
              readOnly
            />
          </div>
          <div>
            <span className="label">Account type</span>
            <span className="badge mt-1 bg-primary-soft text-primary-dark">
              {roleLabel[user.role]}
            </span>
          </div>
        </div>

        <hr className="my-6 border-line" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-x-4 gap-y-4 sm:grid-cols-2"
        >
          <div>
            <label className="label" htmlFor="profile-name">
              Full name
            </label>
            <input
              id="profile-name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              className={cn("input", errors.name && "input-error")}
              {...register("name")}
            />
            {errors.name && (
              <p className="field-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="profile-phone">
              Phone (optional)
            </label>
            <input
              id="profile-phone"
              type="tel"
              autoComplete="tel"
              placeholder="0500000000"
              aria-invalid={Boolean(errors.phone)}
              className={cn("input", errors.phone && "input-error")}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="field-error">{errors.phone.message}</p>
            )}
          </div>

          {serverError && (
            <p
              role="alert"
              className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger sm:col-span-2"
            >
              {serverError}
            </p>
          )}

          {saved && !isDirty && (
            <p
              role="status"
              className="rounded-lg bg-success-soft px-3 py-2 text-sm text-success sm:col-span-2"
            >
              Your profile was updated.
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>

      {user.role === "customer" && (
        <div className="card mt-6 flex max-w-2xl flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <h2 className="section-title">Delivery addresses</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Add, edit, or remove the places you order to.
            </p>
          </div>
          <Link to="/addresses" className="btn btn-outline">
            Manage addresses
          </Link>
        </div>
      )}
    </div>
  );
}
