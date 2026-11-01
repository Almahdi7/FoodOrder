
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { useCart } from "./useCart";
import "./Checkout.css";

const Checkout = () => {
    const { items } = useCart();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [orderNotes, setOrderNotes] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [isValidated, setIsValidated] = useState(false);
    const total = items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nameInvalid = fullName.trim().length < 3;

        const phoneDigits = phoneNumber.replace(/\D/g, "");

        const isValidFormat = /^\+?[0-9\s()-]+$/.test(
            phoneNumber.trim()
        );

        const phoneInvalid =
            !isValidFormat ||
            phoneDigits.length < 7 ||
            phoneDigits.length > 15;

        setFullNameError(
            nameInvalid
                ? "Full name must be at least 3 characters"
                : ""
        );

        setPhoneNumberError(
            phoneInvalid ? "Invalid phone number" : ""
        );

        if (nameInvalid || phoneInvalid) {
            setIsValidated(false);
            return;
        }

        setIsValidated(true);
    };

    if (items.length === 0) {
        return (
            <main className="checkout-page">
                <h1>Checkout</h1>

                <div className="checkout-empty">
                    <h2>Your cart is empty</h2>
                    <p>Add some food before proceeding to checkout.</p>
                    <Link to="/restaurants">Browse Restaurants</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <h1>Checkout</h1>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Customer Information</h2>

                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                        setFullName(e.target.value);
                        setIsValidated(false);
                    }}
                />
                {fullNameError && (
                    <p className="checkout-error">{fullNameError}</p>
                )}

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setIsValidated(false);
                    }}
                />
                {phoneNumberError && (
                    <p className="checkout-error">{phoneNumberError}</p>
                )}

                <label htmlFor="orderNotes">
                    Order Notes (Optional)
                </label>
                <textarea
                    id="orderNotes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Any special instructions?"
                    rows={4}
                />

                <section className="checkout-summary">
                    <h2>Order Summary</h2>

                    {items.map((item) => (
                        <div
                            className="checkout-summary-row"
                            key={item.productId}
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>

                            <strong>
                                ${(item.price * item.quantity).toFixed(2)}
                            </strong>
                        </div>
                    ))}

                    <div className="checkout-summary-total">
                        <strong>Subtotal</strong>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                </section>

                <button type="submit" className="checkout-submit">
                    Validate Checkout
                </button>

                {isValidated && (
                    <p className="checkout-success">
                        Your checkout information is valid!
                        Delivery address and order placement will be
                        added in the next tasks.
                    </p>
                )}
            </form>
        </main>
    );
};

export default Checkout;
