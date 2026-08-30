
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

const DashboardNavbar = ({
  user,
  role,
  setOpen,
}) => {
  const [showProfile, setShowProfile] =
    useState(false);

  return (
    <header className="
      fixed
      top-0
      right-0
      left-0
      lg:left-[255px]
      h-[76px]
      z-30
      bg-[#091221]/95
      backdrop-blur-xl
      border-b border-[#1A293C]
    ">

      <div className="
        h-full
        px-4 sm:px-6
        flex
        items-center
        justify-between
        gap-4
      ">

        {/* Left */}

        <div className="flex items-center gap-3">

          {/* Mobile Menu */}

          <button
            onClick={() => setOpen(true)}
            className="
              lg:hidden
              w-10 h-10
              rounded-xl
              bg-[#101B2D]
              border border-[#263A52]
              flex items-center justify-center
              text-slate-400
              hover:text-white
            "
          >
            <Menu size={19} />
          </button>


          {/* Search */}

          <div className="hidden sm:flex relative w-[220px] md:w-[280px]">

            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-600
              "
            />

            <input
              type="text"
              placeholder="Search tickets..."
              className="
                w-full
                h-10
                pl-9 pr-3
                rounded-xl
                bg-[#101B2D]
                border border-[#263A52]
                text-sm
                text-white
                placeholder:text-slate-600
                outline-none
                focus:border-[#457B9D]
              "
            />

          </div>

        </div>


        {/* Right */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification */}

          <button
            className="
              relative
              w-10 h-10
              rounded-xl
              bg-[#101B2D]
              border border-[#263A52]
              flex items-center justify-center
              text-slate-400
              hover:text-white
              transition
            "
          >

            <Bell size={17} />

            <span className="
              absolute
              top-2
              right-2
              w-1.5
              h-1.5
              rounded-full
              bg-[#73B7D8]
            " />

          </button>


          {/* Profile */}

          <div className="relative">

            <button
              onClick={() =>
                setShowProfile(
                  !showProfile
                )
              }
              className="
                flex
                items-center
                gap-2
                p-1.5
                sm:pr-3
                rounded-xl
                hover:bg-[#101B2D]
                transition
              "
            >

              <div className="
                w-9 h-9
                rounded-full
                bg-[#457B9D]
                flex items-center justify-center
                text-white
                text-sm
                font-bold
              ">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              <div className="hidden sm:block text-left">

                <p className="text-xs font-semibold text-white max-w-[100px] truncate">
                  {user?.name || "User"}
                </p>

                <p className="text-[10px] text-slate-600 capitalize">
                  {role}
                </p>

              </div>

              <ChevronDown
                size={14}
                className="hidden sm:block text-slate-600"
              />

            </button>


            {/* Dropdown */}

            {showProfile && (

              <div className="
                absolute
                right-0
                top-14
                w-52
                rounded-xl
                bg-[#0C1626]
                border border-[#263A52]
                shadow-2xl
                p-2
              ">

                <div className="px-3 py-2.5 border-b border-[#1A293C] mb-1">

                  <p className="text-xs font-semibold text-white truncate">
                    {user?.name}
                  </p>

                  <p className="text-[10px] text-slate-600 truncate">
                    {user?.email}
                  </p>

                </div>

                <a
                  href={
                    role === "admin"
                      ? "/admin/profile"
                      : "/dashboard/profile"
                  }
                  className="
                    block
                    px-3 py-2.5
                    rounded-lg
                    text-xs
                    text-slate-400
                    hover:bg-[#142136]
                    hover:text-white
                  "
                >
                  My Profile
                </a>

                <a
                  href={
                    role === "admin"
                      ? "/admin/settings"
                      : "/dashboard/settings"
                  }
                  className="
                    block
                    px-3 py-2.5
                    rounded-lg
                    text-xs
                    text-slate-400
                    hover:bg-[#142136]
                    hover:text-white
                  "
                >
                  Settings
                </a>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default DashboardNavbar;

