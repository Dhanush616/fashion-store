import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { calcTotals, formatPrice } from "../utils/calculations";

export default function CheckoutView() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const { subtotal, tax, shipping, total } = calcTotals(items);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", phone: "", address: "", city: "", zip: "", card: "", expiry: "", cvv: "" },
  });

  const onSubmit = (data) => {
    const order = {
      id: `ORD-${Date.now()}`,
      customer: data,
      items,
      total,
      date: new Date().toISOString(),
    };
    try {
      localStorage.setItem("fs_last_order", JSON.stringify(order));
    } catch { /* ignore */ }
    clearCart();
    navigate("/success", { state: { orderId: order.id, total } });
  };

  if (items.length === 0) {
    return <div className="alert alert-info">Your cart is empty. Add products before checkout.</div>;
  }

  const field = (name, label, placeholder, rules, type = "text") => (
    <Input label={label} type={type} placeholder={placeholder} error={errors[name]?.message} {...register(name, rules)} />
  );

  return (
    <div className="row g-4">
      <div className="col-md-7">
        <div className="card p-4 fs-form-card">
          <div className="fs-eyebrow">Almost done</div>
          <h2 className="mb-3 mt-1">Checkout</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h6 className="font-display" style={{ fontSize: "1.05rem" }}>Customer & Shipping</h6>
            {field("name", "Full Name", "John Carter", { required: "Name is required" })}
            {field("email", "Email", "you@example.com", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            }, "email")}
            {field("phone", "Phone", "9876543210", {
              required: "Phone is required",
              pattern: { value: /^[0-9+\-\s]{7,15}$/, message: "Enter a valid phone number" },
            }, "tel")}
            {field("address", "Shipping Address", "123 Main St, Apt 4", { required: "Address is required" })}
            <div className="row">
              <div className="col-md-6">{field("city", "City", "New York", { required: "City is required" })}</div>
              <div className="col-md-6">{field("zip", "ZIP / Pincode", "10001", { required: "ZIP is required", minLength: { value: 4, message: "Too short" } })}</div>
            </div>
            <h6 className="mt-3 font-display" style={{ fontSize: "1.05rem" }}>Payment</h6>
            {field("card", "Card Number", "4111 1111 1111 1111", {
              required: "Card number is required",
              validate: (v) => (v.replace(/\s/g, "").length >= 12 ? true : "Enter a valid card number"),
            })}
            <div className="row">
              <div className="col-md-6">{field("expiry", "Expiry (MM/YY)", "12/28", { required: "Expiry is required", pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Use MM/YY" } })}</div>
              <div className="col-md-6">{field("cvv", "CVV", "123", { required: "CVV is required", pattern: { value: /^[0-9]{3,4}$/, message: "Invalid CVV" } }, "password")}</div>
            </div>
            <Button type="submit" variant="dark" loading={isSubmitting} className="w-100 mt-2">
              Place Order — {formatPrice(total)}
            </Button>
          </form>
        </div>
      </div>
      <div className="col-md-5">
        <div className="fs-summary p-4">
          <div className="fs-eyebrow mb-1">Summary</div>
          <h5 className="font-display">Order summary</h5>
          {items.map((it) => (
            <div key={it.key} className="d-flex justify-content-between small border-bottom py-2">
              <span>{it.product?.name} × {it.qty}</span>
              <span>{formatPrice((it.product?.price || 0) * it.qty)}</span>
            </div>
          ))}
          <div className="d-flex justify-content-between small mt-2"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="d-flex justify-content-between small"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
          <div className="d-flex justify-content-between small"><span>Shipping</span><span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
          <hr />
          <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
    </div>
  );
}
