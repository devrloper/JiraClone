import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate, Link } from "react-router-dom"; 
import { toast } from "react-toastify";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("✅ User Signed Up:", userCredential.user);
      toast.success("🎉 Signup successful! Please login now.");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.warning("⚠️ Email already registered. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        toast.warning("⚠️ Password must be at least 6 characters.");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-8 text-white dark:bg-zinc-900 shadow-xl rounded-xl border-2 border-blue-400 dark:border-blue-800 w-full max-w-sm"
      >
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold text-center text-white-800 dark:text-white">
            Create an Account ✨
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
            Join us and start your journey today.
          </p>

          {/* Full Name */}
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-3">
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
