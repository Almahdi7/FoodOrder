import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { useAuth } from "@/features/auth/UseAuth";
import { cn } from "@/utils/cn";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-ink",
    isActive ? "bg-primary-soft text-primary-dark" : "text-ink-soft",
  );

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();

  return (
    <>
      <NavLink to="/restaurants" className={navLinkClass} onClick={onNavigate}>
        Restaurants
      </NavLink>
      <NavLink to="/cart" className={navLinkClass} onClick={onNavigate}>
        Cart
      </NavLink>
      {user?.role === "customer" && (
        <NavLink to="/orders" className={navLinkClass} onClick={onNavigate}>
          My orders
        </NavLink>
      )}
      {user?.role === "owner" && (
        <NavLink to="/owner" className={navLinkClass} onClick={onNavigate}>
          Owner panel
        </NavLink>
      )}

      {user ? (
        <>
          <NavLink to="/profile" className={navLinkClass} onClick={onNavigate}>
            <span className="block max-w-40 truncate">{user.name}</span>
          </NavLink>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              logout();
              onNavigate?.();
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-outline btn-sm" onClick={onNavigate}>
            Log in
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm" onClick={onNavigate}>
            Register
          </Link>
        </>
      )}
    </>
  );
}

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-line bg-surface">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-xl font-bold text-primary">
            FoodDelivery
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            <NavItems />
          </nav>

          {/* Mobile menu button */}
          <button
            className="btn btn-outline btn-sm md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <nav id="mobile-menu" className="border-t border-line md:hidden" aria-label="Main">
            <div className="container-page flex flex-col items-stretch gap-1 py-3">
              <NavItems onNavigate={() => setMenuOpen(false)} />
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="container-page py-6 text-sm text-ink-soft">Food Delivery Project</div>
      </footer>
    </div>
  );
} 