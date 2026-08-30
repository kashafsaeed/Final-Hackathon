
import {
  LayoutDashboard,
  
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = ({
  role,
  logout,
  open,
  setOpen,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          bottom-0
          z-50
          w-[250px]
          bg-[#091221]
          border-r border-[#1A293C]
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Logo */}
        <div className="
          h-[76px]
          px-5
          flex
          items-center
          justify-between
          border-b border-[#1A293C]
        ">

          <div>
            <h1 className="
              text-xl
              font-bold
              text-[#73B7D8]
            ">
              ResolveHub
            </h1>

            <p className="
              text-[10px]
              text-slate-600
              mt-0.5
            ">
              {role === "admin"
                ? "Admin Panel"
                : "Customer Portal"}
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setOpen(false)}
            className="
              lg:hidden
              text-slate-500
              hover:text-white
            "
          >
            <X size={20} />
          </button>

        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4">

          <p className="
            px-3
            mb-3
            text-[10px]
            uppercase
            tracking-widest
            font-bold
            text-slate-600
          ">
            Menu
          </p>


          {/* Dashboard */}
          <NavLink
            to={
              role === "admin"
                ? "/admin"
                : "/dashboard"
            }
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) => `
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-xl
              text-sm
              font-semibold
              transition
              ${
                isActive
                  ? "bg-[#173249] text-[#73B7D8]"
                  : "text-slate-500 hover:bg-[#111E30] hover:text-white"
              }
            `}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>


       

        </nav>


        {/* Logout */}
        <div className="
          p-4
          border-t border-[#1A293C]
        ">

          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-xl
              text-sm
              font-semibold
              text-slate-500
              hover:bg-red-500/10
              hover:text-red-400
              transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;

