
import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Save,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
const Settings = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [notifications, setNotifications] =
    useState(true);

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] =
    useState(false);

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setLoading(true);

      await api.put("/admin/profile", {
        name,
        email,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "New password must be at least 6 characters"
      );
      return;
    }

    try {
      setPasswordLoading(true);

      await api.put("/admin/password", {
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");

      toast.success(
        "Password changed successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-white lg:ml-64">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-7 sm:mb-9">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-[#173249] text-[#73B7D8] flex items-center justify-center">
              <SettingsIcon size={21} />
            </div>

            <div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Settings
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage your account and preferences
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            PROFILE CARD
        ========================= */}

        <section className="bg-[#0C1626] border border-[#1C2D42] rounded-2xl overflow-hidden">

          <div className="px-5 sm:px-6 py-5 border-b border-[#1A2A3F]">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#142A3C] text-[#73B7D8] flex items-center justify-center">
                <User size={18} />
              </div>

              <div>

                <h2 className="font-bold text-base">
                  Profile Information
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Update your administrator details
                </p>

              </div>

            </div>

          </div>


          <form
            onSubmit={handleProfileUpdate}
            className="p-5 sm:p-6"
          >

            <div className="grid sm:grid-cols-2 gap-4">

              {/* NAME */}

              <div>

                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#101B2D] border border-[#263A52] text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/10 transition"
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="admin@example.com"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#101B2D] border border-[#263A52] text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/10 transition"
                />

              </div>

            </div>


            {/* ROLE */}

            <div className="mt-4 p-3.5 rounded-xl bg-[#101B2D] border border-[#1C2D42] flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-lg bg-[#173249] text-[#73B7D8] flex items-center justify-center">
                  <ShieldCheck size={15} />
                </div>

                <div>

                  <p className="text-xs font-semibold">
                    Account Role
                  </p>

                  <p className="text-[10px] text-slate-600 mt-0.5">
                    Your current access level
                  </p>

                </div>

              </div>

              <span className="px-2.5 py-1 rounded-lg bg-[#173249] text-[#73B7D8] text-[10px] font-bold">
                ADMIN
              </span>

            </div>


            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex items-center justify-center gap-2 px-5 h-10 rounded-xl bg-[#457B9D] hover:bg-[#3B6D8D] text-sm font-semibold transition disabled:opacity-50"
            >

              <Save size={15} />

              {loading
                ? "Saving..."
                : "Save Changes"}

            </button>

          </form>

        </section>


        {/* =========================
            SECURITY CARD
        ========================= */}

        <section className="mt-5 bg-[#0C1626] border border-[#1C2D42] rounded-2xl overflow-hidden">

          <div className="px-5 sm:px-6 py-5 border-b border-[#1A2A3F]">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#142A3C] text-[#73B7D8] flex items-center justify-center">
                <Lock size={18} />
              </div>

              <div>

                <h2 className="font-bold text-base">
                  Security
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Keep your administrator account secure
                </p>

              </div>

            </div>

          </div>


          <form
            onSubmit={handlePasswordChange}
            className="p-5 sm:p-6"
          >

            <div className="grid sm:grid-cols-2 gap-4">

              {/* CURRENT PASSWORD */}

              <div>

                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#101B2D] border border-[#263A52] text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#457B9D] transition"
                />

              </div>


              {/* NEW PASSWORD */}

              <div>

                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="Minimum 6 characters"
                  className="w-full h-11 px-3.5 rounded-xl bg-[#101B2D] border border-[#263A52] text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#457B9D] transition"
                />

              </div>

            </div>


            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-5 h-10 px-5 rounded-xl bg-[#457B9D] hover:bg-[#3B6D8D] text-sm font-semibold transition disabled:opacity-50"
            >
              {passwordLoading
                ? "Updating..."
                : "Update Password"}
            </button>

          </form>

        </section>


        {/* =========================
            NOTIFICATION CARD
        ========================= */}

        <section className="mt-5 bg-[#0C1626] border border-[#1C2D42] rounded-2xl overflow-hidden">

          <div className="p-5 sm:p-6 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#142A3C] text-[#73B7D8] flex items-center justify-center shrink-0">
                <Bell size={18} />
              </div>

              <div>

                <h2 className="font-bold text-base">
                  Notifications
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Get notified about new customer tickets
                </p>

              </div>

            </div>


            {/* TOGGLE */}

            <button
              type="button"
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className={`relative w-11 h-6 rounded-full transition shrink-0 ${
                notifications
                  ? "bg-[#457B9D]"
                  : "bg-[#263A52]"
              }`}
            >

              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  notifications
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />

            </button>

          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <p className="text-center text-[10px] text-slate-700 mt-7">
          ResolveHub Admin Settings
        </p>

      </div>

    </div>
  );
};

export default Settings;

