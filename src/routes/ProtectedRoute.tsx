import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/features/auth/UseAuth";

type Role = NonNullable<ReturnType<typeof useAuth>["user"]>["role"];

interface Props {
  allowedRoles?: Role[];
}

export default function ProtectedRoute({ allowedRoles }: Props) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <p className="p-6">Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
