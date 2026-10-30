
import { Link } from "react-router";
import { useCart } from "./useCart";
import "./Cart.css";

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some delicious food to get started!</p>
          <Link to="/restaurants">Browse Menu</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article
                className="cart-item"
                key={item.productId}
              >
                {item.image && (
                  <img src={item.image} alt={item.name} />
                )}

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>

                  <div className="cart-quantity">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    className="cart-remove"
                    onClick={() =>
                      removeFromCart(item.productId)
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <button
              className="cart-clear"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-total">
              <span>Subtotal</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <Link
              to="/checkout"
              className="cart-checkout"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
