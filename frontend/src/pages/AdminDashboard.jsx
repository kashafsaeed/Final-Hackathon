import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Ticket,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  RefreshCw,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

import api from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    newTickets: 0,
    inProgress: 0,
    resolved: 0,
    cancelled: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  // ======================================
  // LOAD DASHBOARD
  // ======================================

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [ticketsResponse, statsResponse] = await Promise.all([
        api.get("/tickets/all"),
        api.get("/tickets/stats"),
      ]);

      setTickets(ticketsResponse.data?.tickets || []);

      setStats(
        statsResponse.data?.stats || {
          total: 0,
          newTickets: 0,
          inProgress: 0,
          resolved: 0,
          cancelled: 0,
          high: 0,
          medium: 0,
          low: 0,
        },
      );
    } catch (error) {
      console.error("Dashboard error:", error);

      toast.error(error.response?.data?.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // INITIAL LOAD
  // ======================================

  useEffect(() => {
    loadDashboard();
  }, []);

  // ======================================
  // REFRESH
  // ======================================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadDashboard();
      toast.success("Dashboard refreshed");
    } finally {
      setRefreshing(false);
    }
  };

  // ======================================
  // UPDATE TICKET
  // ======================================

  const updateTicket = async (ticketId, field, value) => {
    try {
      await api.patch(`/tickets/${ticketId}`, {
        [field]: value,
      });

      toast.success("Ticket updated successfully");

      await loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update ticket");
    }
  };

  // ======================================
  // DELETE TICKET
  // ======================================

  const deleteTicket = async (ticketId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/tickets/${ticketId}`);

      toast.success("Ticket deleted successfully");

      await loadDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete ticket");
    }
  };

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out");

    navigate("/login", {
      replace: true,
    });
  };

  // ======================================
  // STATUS STYLE
  // ======================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "Assigned":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "In Progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "Resolved":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  // ======================================
  // PRIORITY STYLE
  // ======================================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-400";

      case "Medium":
        return "text-yellow-400";

      case "Low":
        return "text-green-400";

      default:
        return "text-slate-400";
    }
  };

  // ======================================
  // SIDEBAR
  // ======================================

  const Sidebar = () => (
    <>
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <aside
        className={`
          fixed
          z-50
          top-0
          left-0
          h-screen
          w-64
          bg-[#0B1628]
          border-r
          border-[#1E3550]
          transform
          transition-transform
          duration-300
          lg:translate-x-0
          ${mobileSidebar ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          {/* LOGO */}

          <div className="h-20 flex items-center justify-between px-6 border-b border-[#1E3550]">
            <div>
              <h1 className="text-xl font-bold text-[#F1FAEE]">ResolveHub</h1>

              <p className="text-xs text-[#457B9D] mt-1">Admin Panel</p>
            </div>

            <button
              onClick={() => setMobileSidebar(false)}
              className="lg:hidden text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* NAVIGATION */}

          <div className="flex-1 p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#457B9D]/15 text-[#8FC7E5]">
              <LayoutDashboard size={19} />
              Dashboard
            </button>

           
          </div>

          {/* LOGOUT */}

          <div className="p-4 border-t border-[#1E3550]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111F] flex items-center justify-center text-white">
        <div className="text-center">
          <RefreshCw
            size={32}
            className="animate-spin mx-auto text-[#457B9D]"
          />

          <p className="mt-4 text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ======================================
  // DASHBOARD
  // ======================================

  return (
    <div className="min-h-screen bg-[#07111F] text-white">
      <Sidebar />

      {/* MAIN */}

      <main className="lg:ml-64 min-h-screen">
        {/* NAVBAR */}

        <header className="h-20 bg-[#0B1628]/95 backdrop-blur border-b border-[#1E3550] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebar(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-lg sm:text-xl font-bold">Admin Dashboard</h2>

              <p className="text-xs sm:text-sm text-slate-500">
                Manage and monitor support tickets
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#457B9D]/20 flex items-center justify-center">
              <ShieldCheck size={18} className="text-[#8FC7E5]" />
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold">Administrator</p>

              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <section className="p-4 sm:p-6 lg:p-8">
          {/* TITLE */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Overview</h1>

              <p className="text-sm text-slate-500 mt-1">
                Here's what's happening with your tickets.
              </p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#457B9D] hover:bg-[#3B6D8D] disabled:opacity-50 transition"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {/* STAT CARDS */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <Ticket size={20} className="text-blue-400" />
                </div>

                <span className="text-xs text-slate-500">Total</span>
              </div>

              <p className="text-2xl sm:text-3xl font-bold mt-4">
                {stats.total}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                All tickets
              </p>
            </div>

            <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-yellow-500/10">
                  <Clock3 size={20} className="text-yellow-400" />
                </div>

                <span className="text-xs text-slate-500">New</span>
              </div>

              <p className="text-2xl sm:text-3xl font-bold mt-4">
                {stats.newTickets}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Awaiting action
              </p>
            </div>

            <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-orange-500/10">
                  <AlertTriangle size={20} className="text-orange-400" />
                </div>

                <span className="text-xs text-slate-500">High</span>
              </div>

              <p className="text-2xl sm:text-3xl font-bold mt-4">
                {stats.high}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                High priority
              </p>
            </div>

            <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-green-500/10">
                  <CheckCircle2 size={20} className="text-green-400" />
                </div>

                <span className="text-xs text-slate-500">Resolved</span>
              </div>

              <p className="text-2xl sm:text-3xl font-bold mt-4">
                {stats.resolved}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Completed tickets
              </p>
            </div>
          </div>

          {/* PRIORITY SUMMARY */}

          <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl p-5 mb-8">
            <h3 className="font-semibold mb-4">Priority Overview</h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                <p className="text-xs text-slate-500">High</p>

                <p className="text-2xl font-bold text-red-400 mt-1">
                  {stats.high}
                </p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                <p className="text-xs text-slate-500">Medium</p>

                <p className="text-2xl font-bold text-yellow-400 mt-1">
                  {stats.medium}
                </p>
              </div>

              <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                <p className="text-xs text-slate-500">Low</p>

                <p className="text-2xl font-bold text-green-400 mt-1">
                  {stats.low}
                </p>
              </div>
            </div>
          </div>

          {/* TICKETS */}

          <div className="bg-[#0B1628] border border-[#1E3550] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#1E3550]">
              <h3 className="text-lg font-bold">All Support Tickets</h3>

              <p className="text-sm text-slate-500 mt-1">
                Review and manage customer requests.
              </p>
            </div>

            {tickets.length === 0 ? (
              <div className="py-16 text-center">
                <Ticket size={40} className="mx-auto text-slate-600" />

                <p className="mt-4 text-slate-400">No tickets found</p>
              </div>
            ) : (
              <div className="divide-y divide-[#1E3550]">
                {tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="p-4 sm:p-5 hover:bg-white/[0.02] transition"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-[#8FC7E5]">
                            {ticket.ticketNumber}
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusStyle(
                              ticket.status,
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </div>

                        <h4 className="font-semibold text-base sm:text-lg truncate">
                          {ticket.title}
                        </h4>

                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                          {ticket.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                          <span>
                            Category:{" "}
                            <b className="text-slate-300">
                              {ticket.category || "General"}
                            </b>
                          </span>

                          <span className={getPriorityStyle(ticket.priority)}>
                            Priority: <b>{ticket.priority || "Medium"}</b>
                          </span>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={ticket.status || "New"}
                          onChange={(e) =>
                            updateTicket(ticket._id, "status", e.target.value)
                          }
                          className="bg-[#07111F] border border-[#263D56] text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#457B9D]"
                          disabled={ticket.status === "Resolved"}
                        >
                          <option value="New">New</option>

                          <option value="Assigned">Assigned</option>

                          <option value="In Progress">In Progress</option>

                          <option value="Resolved">Resolved</option>
                        </select>

                        <select
                          value={ticket.priority || "Medium"}
                          onChange={(e) =>
                            updateTicket(ticket._id, "priority", e.target.value)
                          }
                          className="bg-[#07111F] border border-[#263D56] text-sm text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#457B9D]"
                        >
                          <option value="Low">Low</option>

                          <option value="Medium">Medium</option>

                          <option value="High">High</option>
                        </select>

                        <button
                          onClick={() => deleteTicket(ticket._id)}
                          className="p-2.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                          title="Delete ticket"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
