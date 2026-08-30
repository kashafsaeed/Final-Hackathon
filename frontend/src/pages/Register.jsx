// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";

// import { useAuth } from "../context/AuthContext";

// const Register = () => {
//   const { register } = useAuth();

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password || !form.confirmPassword) {
//       toast.error("Please fill all fields");

//       return;
//     }

//     if (form.password.length < 6) {
//       toast.error("Password must be at least 6 characters");

//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       toast.error("Passwords do not match");

//       return;
//     }

//     setLoading(true);

//     try {
//       await register(form.name, form.email, form.password);

//       toast.success("Account created! Please login.");

//       // Register → Login
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F1FAEE] flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md">
//         <div className="bg-white border border-[#D8E8E3] rounded-2xl shadow-xl p-6 sm:p-8">
//           {/* Logo */}

//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-[#457B9D]">ResolveHub</h1>

//             <p className="mt-2 text-sm text-slate-500">
//               Create your support account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Name */}

//             <div>
//               <label className="block text-sm font-semibold text-[#1D3557] mb-2">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//                 className="w-full px-4 py-3 rounded-xl border border-[#C9DDD9] bg-[#F8FCFA] outline-none text-[#1D3557] focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20"
//               />
//             </div>

//             {/* Email */}

//             <div>
//               <label className="block text-sm font-semibold text-[#1D3557] mb-2">
//                 Email Address
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-3 rounded-xl border border-[#C9DDD9] bg-[#F8FCFA] outline-none text-[#1D3557] focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20"
//               />
//             </div>

//             {/* Password */}

//             <div>
//               <label className="block text-sm font-semibold text-[#1D3557] mb-2">
//                 Password
//               </label>

//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 rounded-xl border border-[#C9DDD9] bg-[#F8FCFA] outline-none text-[#1D3557] focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20"
//               />
//             </div>

//             {/* Confirm */}

//             <div>
//               <label className="block text-sm font-semibold text-[#1D3557] mb-2">
//                 Confirm Password
//               </label>

//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 rounded-xl border border-[#C9DDD9] bg-[#F8FCFA] outline-none text-[#1D3557] focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20"
//               />
//             </div>

//             {/* Button */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3.5 rounded-xl bg-[#457B9D] hover:bg-[#3B6D8D] text-white font-semibold transition disabled:opacity-60"
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           <p className="text-center text-sm text-slate-500 mt-7">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-semibold text-[#457B9D] hover:underline"
//             >
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";


const Register = () => {

  const { register } = useAuth();

  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;
    }


    if (form.password.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }


    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }


    setLoading(true);


    try {

      await register(
        form.name,
        form.email,
        form.password
      );


      toast.success(
        "Account created! Please login."
      );


      // Register → Login
      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
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

          {/* HEADER */}

          <div className="text-center mb-7">

            <h1 className="text-2xl sm:text-3xl font-bold text-[#8FC7E5] tracking-tight">
              ResolveHub
            </h1>


            <h2 className="text-xl sm:text-2xl font-bold text-white mt-5">
              Create Account
            </h2>


            <p className="text-sm text-slate-400 mt-2">
              Create your support account
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NAME */}

            <div>

              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>


              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
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
                autoComplete="new-password"
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

              <p className="text-[11px] text-slate-600 mt-1.5">
                Minimum 6 characters
              </p>

            </div>


            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>


              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
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


            {/* BUTTON */}

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
                ? "Creating Account..."
                : "Create Account"
              }

            </button>

          </form>


          {/* LOGIN */}

          <div className="mt-6 pt-5 border-t border-[#1E3550] text-center">

            <p className="text-xs sm:text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#8FC7E5] hover:text-white transition"
              >
                Sign In
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


export default Register;

