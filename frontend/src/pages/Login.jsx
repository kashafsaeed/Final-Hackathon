import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";


const Login = () => {

  const { login } =
    useAuth();

  const navigate =
    useNavigate();


  const [role, setRole] =
    useState("customer");


  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });


  const [loading, setLoading] =
    useState(false);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();


    if (
      !form.email ||
      !form.password
    ) {
      toast.error(
        "Please enter email and password"
      );

      return;
    }


    setLoading(true);


    try {

      const user =
        await login(
          form.email,
          form.password,
          role
        );


      toast.success(
        "Login successful!"
      );


      // Backend verified role
      if (
        user.role === "admin"
      ) {

        navigate("/admin");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="min-h-screen bg-[#F1FAEE] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl border border-[#D8E8E3] shadow-xl p-6 sm:p-8">

          {/* Logo */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-[#457B9D]">
              ResolveHub
            </h1>

            <h2 className="text-2xl font-bold text-[#1D3557] mt-5">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Sign in to your support account
            </p>

          </div>


          {/* ROLE */}

          <div className="mb-6">

            <p className="text-sm font-semibold text-[#1D3557] mb-3">
              Login as
            </p>


            <div className="grid grid-cols-2 gap-3">

              {/* Customer */}

              <button
                type="button"
                onClick={() =>
                  setRole(
                    "customer"
                  )
                }
                className={`py-3 rounded-xl border font-semibold transition ${
                  role === "customer"
                    ? "bg-[#457B9D] text-white border-[#457B9D]"
                    : "bg-white text-[#457B9D] border-[#A8DADC] hover:bg-[#E8F4F1]"
                }`}
              >
                Customer
              </button>


              {/* Admin */}

              <button
                type="button"
                onClick={() =>
                  setRole("admin")
                }
                className={`py-3 rounded-xl border font-semibold transition ${
                  role === "admin"
                    ? "bg-[#457B9D] text-white border-[#457B9D]"
                    : "bg-white text-[#457B9D] border-[#A8DADC] hover:bg-[#E8F4F1]"
                }`}
              >
                Admin
              </button>

            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-[#1D3557] mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#C9DDD9] bg-[#F8FCFA] text-[#1D3557] outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition"
              />

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-[#1D3557] mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#C9DDD9] bg-[#F8FCFA] text-[#1D3557] outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition"
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#457B9D] hover:bg-[#3B6D8D] text-white font-semibold transition disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : `Sign in as ${
                    role === "admin"
                      ? "Admin"
                      : "Customer"
                  }`}
            </button>

          </form>


          {/* Register */}

          <div className="mt-7 text-center">

            <p className="text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-[#457B9D] hover:underline"
              >
                Create account
              </Link>

            </p>

          </div>

        </div>


        <p className="text-center text-xs text-slate-400 mt-5">
          Secure Support Ticket System
        </p>

      </div>

    </div>
  );
};


export default Login;