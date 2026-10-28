import { Link, Outlet } from "react-router";
import { useAuth } from "@/features/auth/UseAuth";

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          FoodDelivery
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/cart">Cart</Link>
          {user?.role === "customer" && <Link to="/orders">My Orders</Link>}
          {user?.role === "owner" && <Link to="/owner">Owner Panel</Link>}
          {user ? (
            <>
              <Link to="/profile">{user.name}</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t px-6 py-4 text-sm text-gray-500">
        Food Delivery Project
      </footer>
    </div>
  );
}
