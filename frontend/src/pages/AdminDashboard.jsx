
import { useEffect, useState } from "react";

import {
  Ticket,
  Users,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

import toast from "react-hot-toast";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AdminDashboard = () => {

  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    highPriority: 0,
    customers: 0,
  });

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchDashboard = async () => {

    try {

      const res = await api.get(
        "/admin/dashboard"
      );

      setStats(
        res.data.stats || stats
      );

      setTickets(
        res.data.tickets || []
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Unable to load dashboard"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {
    fetchDashboard();
  }, []);


  const cards = [
    {
      title: "Total Tickets",
      value: stats.total,
      icon: Ticket,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: CheckCircle2,
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: AlertTriangle,
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: Users,
    },
  ];


  return (
    <div className="min-h-screen bg-[#070D18] text-white">

      <DashboardSidebar
        role="admin"
        user={user}
        logout={logout}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <DashboardNavbar
        role="admin"
        user={user}
        setOpen={setSidebarOpen}
      />


      <main className="
        lg:ml-[255px]
        pt-[76px]
      ">

        <div className="
          max-w-[1500px]
          mx-auto
          px-4 sm:px-6 lg:px-8
          py-7 sm:py-9
        ">

          {/* Header */}

          <div className="mb-7">

            <p className="text-xs text-[#73B7D8] font-semibold mb-2">
              ADMIN OVERVIEW
            </p>

            <h1 className="
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
            ">
              Good morning,{" "}
              {user?.name?.split(" ")[0] ||
                "Admin"} 👋
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Here's what's happening with your support system today.
            </p>

          </div>


          {/* Stats */}

          <div className="
            grid
            grid-cols-2
            lg:grid-cols-5
            gap-3 sm:gap-4
            mb-6
          ">

            {cards.map((card) => {

              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="
                    bg-[#0C1626]
                    border border-[#1C2D42]
                    rounded-2xl
                    p-4 sm:p-5
                    hover:border-[#31516C]
                    transition
                  "
                >

                  <div className="
                    flex
                    items-start
                    justify-between
                  ">

                    <div className="
                      w-9 h-9
                      rounded-xl
                      bg-[#142A3C]
                      text-[#73B7D8]
                      flex
                      items-center
                      justify-center
                    ">
                      <Icon size={17} />
                    </div>

                    <ArrowUpRight
                      size={14}
                      className="text-slate-700"
                    />

                  </div>

                  <p className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    mt-5
                  ">
                    {card.value}
                  </p>

                  <p className="
                    text-xs
                    text-slate-500
                    mt-1
                  ">
                    {card.title}
                  </p>

                </div>
              );

            })}

          </div>


          {/* Tickets */}

          <div className="
            bg-[#0C1626]
            border border-[#1C2D42]
            rounded-2xl
            overflow-hidden
          ">

            <div className="
              px-5 sm:px-6
              py-5
              border-b border-[#1A2A3F]
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="font-bold">
                  Recent Tickets
                </h2>

                <p className="
                  text-xs
                  text-slate-600
                  mt-1
                ">
                  Latest customer requests
                </p>

              </div>

              <a
                href="/admin/tickets"
                className="
                  text-xs
                  font-semibold
                  text-[#73B7D8]
                  hover:underline
                "
              >
                View all
              </a>

            </div>


            {loading ? (

              <div className="
                p-10
                text-center
                text-sm
                text-slate-600
              ">
                Loading tickets...
              </div>

            ) : tickets.length === 0 ? (

              <div className="
                p-10
                text-center
                text-sm
                text-slate-600
              ">
                No tickets found.
              </div>

            ) : (

              <div className="divide-y divide-[#17273A]">

                {tickets.slice(0, 6).map(
                  (ticket) => (

                    <div
                      key={ticket._id}
                      className="
                        px-5 sm:px-6
                        py-4
                        flex
                        items-center
                        justify-between
                        gap-4
                        hover:bg-[#101B2D]
                        transition
                      "
                    >

                      <div className="min-w-0">

                        <p className="
                          text-sm
                          font-semibold
                          truncate
                        ">
                          {ticket.subject}
                        </p>

                        <p className="
                          text-[11px]
                          text-slate-600
                          mt-1
                        ">
                          #{ticket.ticketNumber}
                        </p>

                      </div>


                      <div className="
                        flex
                        items-center
                        gap-2
                        shrink-0
                      ">

                        <span className="
                          px-2.5 py-1
                          rounded-lg
                          bg-[#142A3C]
                          text-[#73B7D8]
                          text-[10px]
                          font-bold
                          capitalize
                        ">
                          {ticket.priority ||
                            "Medium"}
                        </span>

                        <span className="
                          hidden
                          sm:inline-flex
                          px-2.5 py-1
                          rounded-lg
                          bg-[#111E30]
                          text-slate-500
                          text-[10px]
                          font-bold
                        ">
                          {ticket.status}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;

