import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function LoginView() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data) => {
    setLoading(true);
    // Simulate API delay — session persists via AuthContext localStorage
    setTimeout(() => {
      login(data.email);
      setLoading(false);
      navigate("/");
    }, 900);
  };

  if (isLoggedIn) {
    return (
      <div className="alert alert-success">
        You are already logged in. <Link to="/">Go home</Link>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4 fs-form-card">
          <div className="fs-eyebrow">Welcome back</div>
          <h2 className="mt-1 mb-1">Login</h2>
          <p className="text-muted small">Demo login — any valid email/password works. Session persists via localStorage.</p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            <Button type="submit" variant="dark" loading={loading} className="w-100">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
