import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; 

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(" User Logged In:", userCredential.user);
      toast.success("Login successful!");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Login Error:", error.message);
      if (error.code === "auth/user-not-found") {
        toast.error(
          "❌ No account found with this email. Please sign up first."
        );
      } else if (error.code === "auth/wrong-password") {
        toast.error("❌ Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("❌ Invalid email format.");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border-4 border-blue-400 dark:border-blue-800 w-full max-w-md"
      >
        <div className="px-8 py-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Welcome Back!
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            Sign in to continue.
          </p>

          {/* Email */}
          <div className="mt-10">
            <label className="block mb-3 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-2 border-2 rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="block mb-3 text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-3 mt-2 border-2 rounded-lg"
            />
          </div>

          {/* Submit */}
          <div className="mt-10">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg cursor-pointer"
            >
              Let&apos;s Go
            </button>
          </div>
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Signup Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
