
import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";


const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();


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


  const handleSubmit = async (e) => {

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
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-[#07111F] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* CARD */}

        <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl shadow-2xl p-5 sm:p-7">

          {/* LOGO / HEADER */}

          <div className="text-center mb-7">

            <div className="inline-flex items-center justify-center">

              <h1 className="text-2xl sm:text-3xl font-bold text-[#8FC7E5] tracking-tight">
                ResolveHub
              </h1>

            </div>


            <h2 className="text-xl sm:text-2xl font-bold text-white mt-5">
              Welcome Back
            </h2>


            <p className="text-sm text-slate-400 mt-2">
              Sign in to your support account
            </p>

          </div>


          {/* ROLE */}

          <div className="mb-6">

            <p className="text-sm font-medium text-slate-300 mb-3">
              Login as
            </p>


            <div className="grid grid-cols-2 gap-3">

              {/* CUSTOMER */}

              <button
                type="button"
                onClick={() =>
                  setRole("customer")
                }
                className={`
                  py-2.5 sm:py-3
                  rounded-xl
                  border
                  text-sm
                  sm:text-base
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    role === "customer"
                      ? "bg-[#457B9D] text-white border-[#457B9D] shadow-lg shadow-[#457B9D]/20"
                      : "bg-[#07111F] text-slate-400 border-[#263D56] hover:border-[#457B9D] hover:text-white"
                  }
                `}
              >
                Customer
              </button>


              {/* ADMIN */}

              <button
                type="button"
                onClick={() =>
                  setRole("admin")
                }
                className={`
                  py-2.5 sm:py-3
                  rounded-xl
                  border
                  text-sm
                  sm:text-base
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    role === "admin"
                      ? "bg-[#457B9D] text-white border-[#457B9D] shadow-lg shadow-[#457B9D]/20"
                      : "bg-[#07111F] text-slate-400 border-[#263D56] hover:border-[#457B9D] hover:text-white"
                  }
                `}
              >
                Admin
              </button>

            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>


              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="
                  w-full
                  h-11
                  sm:h-12
                  px-3.5
                  sm:px-4
                  rounded-xl
                  border
                  border-[#263D56]
                  bg-[#07111F]
                  text-white
                  text-sm
                  placeholder:text-slate-600
                  outline-none
                  transition
                  focus:border-[#457B9D]
                  focus:ring-2
                  focus:ring-[#457B9D]/15
                "
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                Password
              </label>


              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                className="
                  w-full
                  h-11
                  sm:h-12
                  px-3.5
                  sm:px-4
                  rounded-xl
                  border
                  border-[#263D56]
                  bg-[#07111F]
                  text-white
                  text-sm
                  placeholder:text-slate-600
                  outline-none
                  transition
                  focus:border-[#457B9D]
                  focus:ring-2
                  focus:ring-[#457B9D]/15
                "
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-11
                sm:h-12
                mt-2
                rounded-xl
                bg-[#457B9D]
                hover:bg-[#3B6D8D]
                active:scale-[0.99]
                text-white
                text-sm
                sm:text-base
                font-semibold
                transition-all
                duration-200
                shadow-lg
                shadow-[#457B9D]/10
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {loading
                ? "Signing in..."
                : `Sign in as ${
                    role === "admin"
                      ? "Admin"
                      : "Customer"
                  }`
              }

            </button>

          </form>


          {/* REGISTER */}

          <div className="mt-6 pt-5 border-t border-[#1E3550] text-center">

            <p className="text-xs sm:text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-[#8FC7E5] hover:text-white transition"
              >
                Create account
              </Link>

            </p>

          </div>

        </div>


        {/* FOOTER */}

        <p className="text-center text-xs text-slate-600 mt-5">
          Secure Support Ticket System
        </p>

      </div>

    </div>

  );

};


export default Login;
