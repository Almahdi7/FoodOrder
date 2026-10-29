import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./UseAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { cn } from "@/utils/cn";

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9+\s-]{7,15}$/, "Enter a valid phone number")
      .optional()
      .or(z.literal("")),
    role: z.enum(["customer", "owner"]),
    password: z.string().min(6, "Use at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "customer" },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError("");
    try {
      const user = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || undefined, // leave the field out when empty
        role: values.role,
      });
      navigate(user.role === "owner" ? "/owner" : "/", { replace: true });
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <div className="container-page flex flex-1 items-center justify-center py-3">
      <div className="card mx-auto max-w-2xl p-4 sm:p-6">
        <h1 className="page-title">Create your account</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Order food from local restaurants, or list your own.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3"
        >
          <div>
            <label className="label" htmlFor="role">
              I want to
            </label>
            <select id="role" className="input" {...register("role")}>
              <option value="customer">Order food (customer)</option>
              <option value="owner">Sell food (restaurant owner)</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              autoComplete="name"
              placeholder="Sara Ali"
              aria-invalid={Boolean(errors.name)}
              className={cn("input", errors.name && "input-error")}
              {...register("name")}
            />
            {errors.name && (
              <p className="field-error">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className={cn("input", errors.email && "input-error")}
              {...register("email")}
            />
            {errors.email && (
              <p className="field-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="phone">
              Phone (optional)
            </label>
            <input
              id="phone"
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

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              className={cn("input", errors.password && "input-error")}
              {...register("password")}
            />
            {errors.password && (
              <p className="field-error">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              className={cn("input", errors.confirmPassword && "input-error")}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {serverError && (
            <p
              role="alert"
              className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger"
            >
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full sm:col-span-2"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary-dark underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
