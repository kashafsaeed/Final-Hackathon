

// import { useEffect, useState } from "react";
// import {
//   Plus,
//   Ticket,
//   Clock3,
//   CheckCircle2,
//   X,
//   Send,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import Sidebar from "../components/dashboard/DashboardSidebar";
// const Dashboard = () => {
//   const { user, logout } = useAuth();

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const [tickets, setTickets] = useState([]);

//   const [form, setForm] = useState({
//     subject: "",
//     description: "",
//     category: "",
//     priority: "Medium",
//   });

//   // ===============================
//   // GET CUSTOMER TICKETS
//   // ===============================

//   const getTickets = async () => {
//     try {
//       setFetching(true);

//       const res = await api.get("/tickets/my");

//       setTickets(res.data.tickets || res.data || []);
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error.response?.data?.message ||
//           "Unable to load tickets"
//       );
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     getTickets();
//   }, []);

//   // ===============================
//   // FORM CHANGE
//   // ===============================

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ===============================
//   // CREATE TICKET
//   // ===============================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.subject.trim()) {
//       toast.error("Subject is required");
//       return;
//     }

//     if (!form.description.trim()) {
//       toast.error("Description is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await api.post(
//         "/tickets",
//         {
//           subject: form.subject,
//           description: form.description,
//           category: form.category || "General",
//           priority: form.priority,
//         }
//       );

//       toast.success(
//         res.data?.message ||
//           "Ticket created successfully!"
//       );

//       setForm({
//         subject: "",
//         description: "",
//         category: "",
//         priority: "Medium",
//       });

//       setShowForm(false);

//       await getTickets();

//     } catch (error) {
//       console.error(error);

//       toast.error(
//         error.response?.data?.message ||
//           "Failed to create ticket"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // STATS
//   // ===============================

//   const totalTickets = tickets.length;

//   const activeTickets = tickets.filter(
//     (ticket) =>
//       ticket.status !== "Resolved" &&
//       ticket.status !== "Cancelled"
//   ).length;

//   const resolvedTickets = tickets.filter(
//     (ticket) =>
//       ticket.status === "Resolved"
//   ).length;

//   return (
//     <div className="min-h-screen bg-[#070D18] text-white">

//       {/* SIDEBAR */}

//       <Sidebar
//         role="customer"
//         logout={logout}
//         open={sidebarOpen}
//         setOpen={setSidebarOpen}
//       />


//       {/* MAIN */}

//       <main className="lg:ml-[250px] min-h-screen">

//         {/* TOP BAR */}

//         <header className="
//           h-[76px]
//           bg-[#091221]
//           border-b border-[#1A293C]
//           flex
//           items-center
//           justify-between
//           px-4 sm:px-6 lg:px-8
//         ">

//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="
//               lg:hidden
//               px-3
//               py-2
//               rounded-lg
//               bg-[#101B2D]
//               text-slate-400
//             "
//           >
//             ☰
//           </button>

//           <div className="ml-auto flex items-center gap-3">

//             <div className="
//               w-9 h-9
//               rounded-full
//               bg-[#457B9D]
//               flex
//               items-center
//               justify-center
//               font-bold
//             ">
//               {user?.name
//                 ?.charAt(0)
//                 ?.toUpperCase() || "U"}
//             </div>

//             <div className="hidden sm:block">

//               <p className="
//                 text-sm
//                 font-semibold
//               ">
//                 {user?.name || "Customer"}
//               </p>

//               <p className="
//                 text-[10px]
//                 text-slate-600
//               ">
//                 Customer
//               </p>

//             </div>

//           </div>

//         </header>


//         {/* CONTENT */}

//         <div className="
//           max-w-[1400px]
//           mx-auto
//           px-4
//           sm:px-6
//           lg:px-8
//           py-7
//         ">

//           {/* HEADER */}

//           <div className="
//             flex
//             flex-col
//             sm:flex-row
//             sm:items-center
//             sm:justify-between
//             gap-4
//             mb-7
//           ">

//             <div>

//               <p className="
//                 text-xs
//                 text-[#73B7D8]
//                 font-semibold
//                 mb-2
//               ">
//                 CUSTOMER PORTAL
//               </p>

//               <h1 className="
//                 text-2xl
//                 sm:text-3xl
//                 font-bold
//               ">
//                 Welcome back,{" "}
//                 {user?.name?.split(" ")[0] ||
//                   "Customer"} 👋
//               </h1>

//               <p className="
//                 text-sm
//                 text-slate-500
//                 mt-2
//               ">
//                 Create and track your support tickets.
//               </p>

//             </div>


//             <button
//               onClick={() => setShowForm(true)}
//               className="
//                 w-full
//                 sm:w-auto
//                 h-11
//                 px-5
//                 rounded-xl
//                 bg-[#457B9D]
//                 hover:bg-[#3B6D8D]
//                 flex
//                 items-center
//                 justify-center
//                 gap-2
//                 text-sm
//                 font-semibold
//                 transition
//               "
//             >
//               <Plus size={17} />
//               Create Ticket
//             </button>

//           </div>


//           {/* STATS */}

//           <div className="
//             grid
//             grid-cols-1
//             sm:grid-cols-3
//             gap-4
//             mb-7
//           ">

//             <div className="
//               bg-[#0C1626]
//               border border-[#1C2D42]
//               rounded-2xl
//               p-5
//             ">

//               <div className="
//                 w-10 h-10
//                 rounded-xl
//                 bg-[#142A3C]
//                 text-[#73B7D8]
//                 flex
//                 items-center
//                 justify-center
//               ">
//                 <Ticket size={18} />
//               </div>

//               <p className="
//                 text-3xl
//                 font-bold
//                 mt-5
//               ">
//                 {totalTickets}
//               </p>

//               <p className="
//                 text-xs
//                 text-slate-500
//                 mt-1
//               ">
//                 Total Tickets
//               </p>

//             </div>


//             <div className="
//               bg-[#0C1626]
//               border border-[#1C2D42]
//               rounded-2xl
//               p-5
//             ">

//               <div className="
//                 w-10 h-10
//                 rounded-xl
//                 bg-[#142A3C]
//                 text-[#73B7D8]
//                 flex
//                 items-center
//                 justify-center
//               ">
//                 <Clock3 size={18} />
//               </div>

//               <p className="
//                 text-3xl
//                 font-bold
//                 mt-5
//               ">
//                 {activeTickets}
//               </p>

//               <p className="
//                 text-xs
//                 text-slate-500
//                 mt-1
//               ">
//                 Active Tickets
//               </p>

//             </div>


//             <div className="
//               bg-[#0C1626]
//               border border-[#1C2D42]
//               rounded-2xl
//               p-5
//             ">

//               <div className="
//                 w-10 h-10
//                 rounded-xl
//                 bg-[#142A3C]
//                 text-[#73B7D8]
//                 flex
//                 items-center
//                 justify-center
//               ">
//                 <CheckCircle2 size={18} />
//               </div>

//               <p className="
//                 text-3xl
//                 font-bold
//                 mt-5
//               ">
//                 {resolvedTickets}
//               </p>

//               <p className="
//                 text-xs
//                 text-slate-500
//                 mt-1
//               ">
//                 Resolved Tickets
//               </p>

//             </div>

//           </div>


//           {/* TICKETS */}

//           <div className="
//             bg-[#0C1626]
//             border border-[#1C2D42]
//             rounded-2xl
//             overflow-hidden
//           ">

//             <div className="
//               px-5
//               sm:px-6
//               py-5
//               border-b border-[#1A293C]
//             ">

//               <h2 className="font-bold">
//                 My Tickets
//               </h2>

//               <p className="
//                 text-xs
//                 text-slate-600
//                 mt-1
//               ">
//                 Your recent support requests
//               </p>

//             </div>


//             {fetching ? (

//               <div className="
//                 p-10
//                 text-center
//                 text-sm
//                 text-slate-600
//               ">
//                 Loading tickets...
//               </div>

//             ) : tickets.length === 0 ? (

//               <div className="
//                 p-10
//                 text-center
//               ">

//                 <Ticket
//                   size={30}
//                   className="
//                     mx-auto
//                     text-slate-700
//                   "
//                 />

//                 <p className="
//                   text-sm
//                   text-slate-500
//                   mt-3
//                 ">
//                   No tickets yet.
//                 </p>

//                 <button
//                   onClick={() =>
//                     setShowForm(true)
//                   }
//                   className="
//                     mt-4
//                     text-xs
//                     font-semibold
//                     text-[#73B7D8]
//                   "
//                 >
//                   Create your first ticket
//                 </button>

//               </div>

//             ) : (

//               <div className="divide-y divide-[#17273A]">

//                 {tickets.map((ticket) => (

//                   <div
//                     key={ticket._id}
//                     className="
//                       px-5
//                       sm:px-6
//                       py-4
//                       flex
//                       flex-col
//                       sm:flex-row
//                       sm:items-center
//                       sm:justify-between
//                       gap-3
//                       hover:bg-[#101B2D]
//                     "
//                   >

//                     <div className="min-w-0">

//                       <p className="
//                         text-sm
//                         font-semibold
//                         truncate
//                       ">
//                         {ticket.subject}
//                       </p>

//                       <p className="
//                         text-[11px]
//                         text-slate-600
//                         mt-1
//                       ">
//                         #
//                         {ticket.ticketNumber ||
//                           ticket._id}
//                       </p>

//                     </div>


//                     <div className="
//                       flex
//                       items-center
//                       gap-2
//                     ">

//                       <span className="
//                         px-2.5
//                         py-1
//                         rounded-lg
//                         bg-[#142A3C]
//                         text-[#73B7D8]
//                         text-[10px]
//                         font-bold
//                       ">
//                         {ticket.priority ||
//                           "Medium"}
//                       </span>

//                       <span className="
//                         px-2.5
//                         py-1
//                         rounded-lg
//                         bg-[#111E30]
//                         text-slate-400
//                         text-[10px]
//                         font-bold
//                       ">
//                         {ticket.status ||
//                           "New"}
//                       </span>

//                     </div>

//                   </div>

//                 ))}

//               </div>

//             )}

//           </div>

//         </div>

//       </main>


//       {/* CREATE TICKET MODAL */}

//       {showForm && (

//         <div className="
//           fixed
//           inset-0
//           z-[100]
//           bg-black/70
//           flex
//           items-center
//           justify-center
//           p-4
//         ">

//           <div className="
//             w-full
//             max-w-lg
//             max-h-[90vh]
//             overflow-y-auto
//             bg-[#0C1626]
//             border border-[#263A52]
//             rounded-2xl
//             shadow-2xl
//           ">

//             {/* Modal Header */}

//             <div className="
//               px-5
//               sm:px-6
//               py-5
//               border-b border-[#1A293C]
//               flex
//               items-center
//               justify-between
//             ">

//               <div>

//                 <h2 className="
//                   text-lg
//                   font-bold
//                 ">
//                   Create New Ticket
//                 </h2>

//                 <p className="
//                   text-xs
//                   text-slate-600
//                   mt-1
//                 ">
//                   Tell us how we can help you.
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowForm(false)
//                 }
//                 className="
//                   w-9 h-9
//                   rounded-lg
//                   bg-[#101B2D]
//                   text-slate-500
//                   hover:text-white
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 <X size={17} />
//               </button>

//             </div>


//             {/* Form */}

//             <form
//               onSubmit={handleSubmit}
//               className="
//                 p-5
//                 sm:p-6
//                 space-y-4
//               "
//             >

//               {/* Subject */}

//               <div>

//                 <label className="
//                   block
//                   text-xs
//                   font-semibold
//                   text-slate-300
//                   mb-2
//                 ">
//                   Subject
//                 </label>

//                 <input
//                   type="text"
//                   name="subject"
//                   value={form.subject}
//                   onChange={handleChange}
//                   placeholder="e.g. Payment issue"
//                   className="
//                     w-full
//                     h-11
//                     px-3
//                     rounded-xl
//                     bg-[#101B2D]
//                     border border-[#263A52]
//                     text-sm
//                     text-white
//                     placeholder:text-slate-600
//                     outline-none
//                     focus:border-[#457B9D]
//                   "
//                 />

//               </div>


//               {/* Description */}

//               <div>

//                 <label className="
//                   block
//                   text-xs
//                   font-semibold
//                   text-slate-300
//                   mb-2
//                 ">
//                   Description
//                 </label>

//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleChange}
//                   rows="5"
//                   placeholder="Describe your problem..."
//                   className="
//                     w-full
//                     px-3
//                     py-3
//                     rounded-xl
//                     bg-[#101B2D]
//                     border border-[#263A52]
//                     text-sm
//                     text-white
//                     placeholder:text-slate-600
//                     outline-none
//                     resize-none
//                     focus:border-[#457B9D]
//                   "
//                 />

//               </div>


//               {/* Category */}

//               <div>

//                 <label className="
//                   block
//                   text-xs
//                   font-semibold
//                   text-slate-300
//                   mb-2
//                 ">
//                   Category
//                 </label>

//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="
//                     w-full
//                     h-11
//                     px-3
//                     rounded-xl
//                     bg-[#101B2D]
//                     border border-[#263A52]
//                     text-sm
//                     text-white
//                     outline-none
//                     focus:border-[#457B9D]
//                   "
//                 >

//                   <option value="">
//                     Select category
//                   </option>

//                   <option value="Billing">
//                     Billing
//                   </option>

//                   <option value="Technical">
//                     Technical
//                   </option>

//                   <option value="Account">
//                     Account
//                   </option>

//                   <option value="Order">
//                     Order
//                   </option>

//                   <option value="Other">
//                     Other
//                   </option>

//                 </select>

//               </div>


//               {/* Priority */}

//               <div>

//                 <label className="
//                   block
//                   text-xs
//                   font-semibold
//                   text-slate-300
//                   mb-2
//                 ">
//                   Priority
//                 </label>

//                 <select
//                   name="priority"
//                   value={form.priority}
//                   onChange={handleChange}
//                   className="
//                     w-full
//                     h-11
//                     px-3
//                     rounded-xl
//                     bg-[#101B2D]
//                     border border-[#263A52]
//                     text-sm
//                     text-white
//                     outline-none
//                     focus:border-[#457B9D]
//                   "
//                 >

//                   <option value="Low">
//                     Low
//                   </option>

//                   <option value="Medium">
//                     Medium
//                   </option>

//                   <option value="High">
//                     High
//                   </option>

//                 </select>

//               </div>


//               {/* Submit */}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="
//                   w-full
//                   h-11
//                   rounded-xl
//                   bg-[#457B9D]
//                   hover:bg-[#3B6D8D]
//                   disabled:opacity-50
//                   flex
//                   items-center
//                   justify-center
//                   gap-2
//                   text-sm
//                   font-semibold
//                   transition
//                 "
//               >

//                 {loading ? (
//                   "Creating..."
//                 ) : (
//                   <>
//                     <Send size={16} />
//                     Create Ticket
//                   </>
//                 )}

//               </button>

//             </form>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default Dashboard;






import { useEffect, useState } from "react";

import {
  Plus,
  Ticket,
  Clock3,
  CheckCircle2,
  XCircle,
  X,
  Send,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  RefreshCw,
} from "lucide-react";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import api from "../services/api";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";


const Dashboard = () => {

  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [cancelling, setCancelling] =
    useState(null);

  const [tickets, setTickets] =
    useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    orderId: "",
    contactNumber: "",
    contactMethod: "Email",
    urgency: "Medium",
  });


  // =====================================
  // GET CUSTOMER TICKETS
  // =====================================

  const getTickets = async () => {

    try {

      setFetching(true);

      const response =
        await api.get("/tickets/my");

      setTickets(
        response.data?.tickets || []
      );

    } catch (error) {

      console.error(
        "Get tickets error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to load tickets"
      );

    } finally {

      setFetching(false);

    }

  };


  // =====================================
  // LOAD TICKETS
  // =====================================

  useEffect(() => {

    getTickets();

  }, []);


  // =====================================
  // FORM CHANGE
  // =====================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================
  // CREATE TICKET
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!form.title.trim()) {

      toast.error(
        "Please enter ticket title"
      );

      return;
    }


    if (!form.description.trim()) {

      toast.error(
        "Please describe your problem"
      );

      return;
    }


    setLoading(true);


    try {

      const response =
        await api.post(
          "/tickets",
          {
            title:
              form.title.trim(),

            description:
              form.description.trim(),

            category:
              form.category || undefined,

            orderId:
              form.orderId.trim(),

            contactNumber:
              form.contactNumber.trim(),

            contactMethod:
              form.contactMethod,

            urgency:
              form.urgency,
          }
        );


      toast.success(
        response.data?.message ||
          "Ticket created successfully"
      );


      // Reset form

      setForm({
        title: "",
        description: "",
        category: "",
        orderId: "",
        contactNumber: "",
        contactMethod: "Email",
        urgency: "Medium",
      });


      setShowForm(false);


      // Refresh tickets

      await getTickets();


    } catch (error) {

      console.error(
        "Create ticket error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create ticket"
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================
  // CANCEL TICKET
  // =====================================

  const handleCancelTicket = async (
    ticketId
  ) => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this ticket?"
      );

    if (!confirmCancel) {
      return;
    }


    setCancelling(ticketId);


    try {

      const response =
        await api.patch(
          `/tickets/${ticketId}/cancel`
        );


      toast.success(
        response.data?.message ||
          "Ticket cancelled"
      );


      await getTickets();


    } catch (error) {

      console.error(
        "Cancel ticket error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to cancel ticket"
      );

    } finally {

      setCancelling(null);

    }

  };


  // =====================================
  // STATISTICS
  // =====================================

  const totalTickets =
    tickets.length;


  const activeTickets =
    tickets.filter(
      (ticket) =>
        ticket.status !== "Resolved" &&
        ticket.status !== "Cancelled"
    ).length;


  const resolvedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Resolved"
    ).length;


  const cancelledTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Cancelled"
    ).length;


  // =====================================
  // STATUS STYLE
  // =====================================

  const getStatusStyle = (
    status
  ) => {

    switch (status) {

      case "Resolved":

        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";


      case "Cancelled":

        return "bg-red-500/10 text-red-400 border-red-500/20";


      case "In Progress":

        return "bg-blue-500/10 text-blue-400 border-blue-500/20";


      case "Assigned":

        return "bg-purple-500/10 text-purple-400 border-purple-500/20";


      default:

        return "bg-amber-500/10 text-amber-400 border-amber-500/20";

    }

  };


  // =====================================
  // PRIORITY STYLE
  // =====================================

  const getPriorityStyle = (
    priority
  ) => {

    switch (priority) {

      case "High":

        return "bg-red-500/10 text-red-400 border-red-500/20";


      case "Medium":

        return "bg-amber-500/10 text-amber-400 border-amber-500/20";


      default:

        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

    }

  };


  return (

    <div className="
      min-h-screen
      bg-[#070D18]
      text-white
    ">


      {/* =================================
          SIDEBAR
      ================================= */}

      <DashboardSidebar
        role="customer"
        logout={logout}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />


      {/* =================================
          MAIN
      ================================= */}

      <main className="
        lg:ml-[250px]
        min-h-screen
      ">


        {/* =================================
            NAVBAR
        ================================= */}

        <header className="
          h-[76px]
          bg-[#091221]
          border-b border-[#1A293C]
          flex
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
          sticky
          top-0
          z-30
        ">


          {/* Mobile menu */}

          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              lg:hidden
              w-9
              h-9
              rounded-lg
              bg-[#101B2D]
              text-slate-400
              hover:text-white
              flex
              items-center
              justify-center
            "
          >
            ☰
          </button>


          {/* User */}

          <div className="
            ml-auto
            flex
            items-center
            gap-3
          ">


            <div className="
              hidden
              sm:block
              text-right
            ">

              <p className="
                text-sm
                font-semibold
              ">
                {user?.name ||
                  "Customer"}
              </p>

              <p className="
                text-[10px]
                text-slate-500
              ">
                Customer
              </p>

            </div>


            <div className="
              w-10
              h-10
              rounded-xl
              bg-[#457B9D]
              flex
              items-center
              justify-center
              font-bold
            ">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "U"}
            </div>

          </div>

        </header>


        {/* =================================
            CONTENT
        ================================= */}

        <div className="
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-7
        ">


          {/* =================================
              PAGE HEADER
          ================================= */}

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
            mb-8
          ">


            <div>

              <div className="
                flex
                items-center
                gap-2
                mb-2
              ">

                <Sparkles
                  size={14}
                  className="text-[#73B7D8]"
                />

                <span className="
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  font-bold
                  text-[#73B7D8]
                ">
                  Customer Portal
                </span>

              </div>


              <h1 className="
                text-2xl
                sm:text-3xl
                font-bold
                tracking-tight
              ">
                Welcome back,{" "}
                {user?.name
                  ?.split(" ")[0] ||
                  "Customer"} 👋
              </h1>


              <p className="
                text-sm
                text-slate-500
                mt-2
              ">
                Create and manage your support
                requests.
              </p>

            </div>


            {/* Create */}

            <button
              onClick={() =>
                setShowForm(true)
              }
              className="
                w-full
                sm:w-auto
                h-11
                px-5
                rounded-xl
                bg-[#457B9D]
                hover:bg-[#3B6D8D]
                flex
                items-center
                justify-center
                gap-2
                text-sm
                font-semibold
                shadow-lg
                shadow-[#457B9D]/10
                transition
              "
            >

              <Plus size={17} />

              Create Ticket

            </button>

          </div>


          {/* =================================
              STATS
          ================================= */}

          <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            sm:gap-4
            mb-8
          ">


            {/* Total */}

            <div className="
              bg-[#0C1626]
              border border-[#1C2D42]
              rounded-2xl
              p-4
              sm:p-5
            ">

              <div className="
                flex
                items-center
                justify-between
              ">

                <div className="
                  w-9
                  h-9
                  rounded-xl
                  bg-[#142A3C]
                  text-[#73B7D8]
                  flex
                  items-center
                  justify-center
                ">
                  <Ticket size={17} />
                </div>

              </div>


              <p className="
                text-2xl
                sm:text-3xl
                font-bold
                mt-4
              ">
                {totalTickets}
              </p>


              <p className="
                text-[11px]
                sm:text-xs
                text-slate-500
                mt-1
              ">
                Total Tickets
              </p>

            </div>


            {/* Active */}

            <div className="
              bg-[#0C1626]
              border border-[#1C2D42]
              rounded-2xl
              p-4
              sm:p-5
            ">

              <div className="
                w-9
                h-9
                rounded-xl
                bg-blue-500/10
                text-blue-400
                flex
                items-center
                justify-center
              ">
                <Clock3 size={17} />
              </div>


              <p className="
                text-2xl
                sm:text-3xl
                font-bold
                mt-4
              ">
                {activeTickets}
              </p>


              <p className="
                text-[11px]
                sm:text-xs
                text-slate-500
                mt-1
              ">
                Active
              </p>

            </div>


            {/* Resolved */}

            <div className="
              bg-[#0C1626]
              border border-[#1C2D42]
              rounded-2xl
              p-4
              sm:p-5
            ">

              <div className="
                w-9
                h-9
                rounded-xl
                bg-emerald-500/10
                text-emerald-400
                flex
                items-center
                justify-center
              ">
                <CheckCircle2 size={17} />
              </div>


              <p className="
                text-2xl
                sm:text-3xl
                font-bold
                mt-4
              ">
                {resolvedTickets}
              </p>


              <p className="
                text-[11px]
                sm:text-xs
                text-slate-500
                mt-1
              ">
                Resolved
              </p>

            </div>


            {/* Cancelled */}

            <div className="
              bg-[#0C1626]
              border border-[#1C2D42]
              rounded-2xl
              p-4
              sm:p-5
            ">

              <div className="
                w-9
                h-9
                rounded-xl
                bg-red-500/10
                text-red-400
                flex
                items-center
                justify-center
              ">
                <XCircle size={17} />
              </div>


              <p className="
                text-2xl
                sm:text-3xl
                font-bold
                mt-4
              ">
                {cancelledTickets}
              </p>


              <p className="
                text-[11px]
                sm:text-xs
                text-slate-500
                mt-1
              ">
                Cancelled
              </p>

            </div>

          </div>


          {/* =================================
              TICKETS
          ================================= */}

          <div className="
            bg-[#0C1626]
            border border-[#1C2D42]
            rounded-2xl
            overflow-hidden
          ">


            {/* Header */}

            <div className="
              px-4
              sm:px-6
              py-5
              border-b border-[#1A293C]
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="
                  text-base
                  sm:text-lg
                  font-bold
                ">
                  My Tickets
                </h2>

                <p className="
                  text-[11px]
                  text-slate-600
                  mt-1
                ">
                  Track your support requests
                </p>

              </div>


              <button
                onClick={getTickets}
                disabled={fetching}
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-[#101B2D]
                  text-slate-500
                  hover:text-white
                  flex
                  items-center
                  justify-center
                "
              >
                <RefreshCw
                  size={15}
                  className={
                    fetching
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>

            </div>


            {/* Loading */}

            {fetching ? (

              <div className="
                py-16
                text-center
              ">

                <RefreshCw
                  size={25}
                  className="
                    mx-auto
                    text-[#457B9D]
                    animate-spin
                  "
                />

                <p className="
                  text-xs
                  text-slate-600
                  mt-3
                ">
                  Loading tickets...
                </p>

              </div>

            ) : tickets.length === 0 ? (

              /* Empty */

              <div className="
                py-16
                px-5
                text-center
              ">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#101B2D]
                  mx-auto
                  flex
                  items-center
                  justify-center
                ">

                  <Ticket
                    size={22}
                    className="
                      text-slate-600
                    "
                  />

                </div>


                <h3 className="
                  text-sm
                  font-semibold
                  mt-4
                ">
                  No tickets yet
                </h3>


                <p className="
                  text-xs
                  text-slate-600
                  mt-1
                ">
                  Create your first support ticket.
                </p>


                <button
                  onClick={() =>
                    setShowForm(true)
                  }
                  className="
                    mt-4
                    text-xs
                    font-semibold
                    text-[#73B7D8]
                    hover:underline
                  "
                >
                  Create Ticket
                </button>

              </div>

            ) : (

              /* Tickets */

              <div className="
                divide-y
                divide-[#17273A]
              ">

                {tickets.map(
                  (ticket) => (

                    <div
                      key={ticket._id}
                      className="
                        p-4
                        sm:p-5
                        hover:bg-[#101B2D]
                        transition
                      "
                    >


                      {/* Top */}

                      <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                        gap-3
                      ">


                        <div className="
                          min-w-0
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                            flex-wrap
                          ">

                            <h3 className="
                              text-sm
                              font-semibold
                              truncate
                            ">
                              {ticket.title}
                            </h3>


                            <span className="
                              text-[9px]
                              text-slate-600
                            ">
                              #
                              {ticket.ticketNumber}
                            </span>

                          </div>


                          <p className="
                            text-xs
                            text-slate-500
                            mt-2
                            line-clamp-2
                          ">
                            {ticket.description}
                          </p>

                        </div>


                        {/* Badges */}

                        <div className="
                          flex
                          items-center
                          gap-2
                          flex-wrap
                        ">

                          <span className={`
                            px-2.5
                            py-1
                            rounded-lg
                            border
                            text-[9px]
                            font-bold
                            ${getPriorityStyle(
                              ticket.priority
                            )}
                          `}>
                            {ticket.priority ||
                              "Medium"}
                          </span>


                          <span className={`
                            px-2.5
                            py-1
                            rounded-lg
                            border
                            text-[9px]
                            font-bold
                            ${getStatusStyle(
                              ticket.status
                            )}
                          `}>
                            {ticket.status ||
                              "New"}
                          </span>

                        </div>

                      </div>


                      {/* Details */}

                      <div className="
                        flex
                        flex-wrap
                        gap-x-5
                        gap-y-2
                        mt-4
                        text-[10px]
                        text-slate-600
                      ">

                        {ticket.category && (

                          <span>
                            Category:{" "}
                            <b className="
                              text-slate-400
                            ">
                              {ticket.category}
                            </b>
                          </span>

                        )}


                        {ticket.urgency && (

                          <span>
                            Urgency:{" "}
                            <b className="
                              text-slate-400
                            ">
                              {ticket.urgency}
                            </b>
                          </span>

                        )}


                        {ticket.orderId && (

                          <span>
                            Order:{" "}
                            <b className="
                              text-slate-400
                            ">
                              {ticket.orderId}
                            </b>
                          </span>

                        )}

                      </div>


                      {/* AI */}

                      {ticket.aiSuggestion && (

                        <div className="
                          mt-4
                          p-3
                          rounded-xl
                          bg-[#101B2D]
                          border border-[#1C2D42]
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                            mb-2
                          ">

                            <Sparkles
                              size={13}
                              className="
                                text-[#73B7D8]
                              "
                            />

                            <span className="
                              text-[10px]
                              font-bold
                              text-[#73B7D8]
                            ">
                              AI ANALYSIS
                            </span>

                          </div>


                          <p className="
                            text-[11px]
                            text-slate-500
                            leading-relaxed
                          ">
                            {ticket.aiSuggestion.summary}
                          </p>

                        </div>

                      )}


                      {/* Cancel */}

                      {ticket.status !==
                        "Resolved" &&
                        ticket.status !==
                        "Cancelled" && (

                        <div className="
                          mt-4
                          flex
                          justify-end
                        ">

                          <button
                            onClick={() =>
                              handleCancelTicket(
                                ticket._id
                              )
                            }
                            disabled={
                              cancelling ===
                              ticket._id
                            }
                            className="
                              px-3
                              py-2
                              rounded-lg
                              text-[10px]
                              font-semibold
                              text-red-400
                              bg-red-500/5
                              hover:bg-red-500/10
                              disabled:opacity-50
                              transition
                            "
                          >

                            {cancelling ===
                            ticket._id
                              ? "Cancelling..."
                              : "Cancel Ticket"}

                          </button>

                        </div>

                      )}

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </main>


      {/* =================================
          CREATE TICKET MODAL
      ================================= */}

      {showForm && (

        <div className="
          fixed
          inset-0
          z-[100]
          bg-black/75
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-3
          sm:p-5
        ">


          <div className="
            w-full
            max-w-xl
            max-h-[92vh]
            overflow-y-auto
            bg-[#0C1626]
            border border-[#263A52]
            rounded-2xl
            shadow-2xl
          ">


            {/* Modal header */}

            <div className="
              sticky
              top-0
              z-10
              bg-[#0C1626]
              px-5
              sm:px-6
              py-4
              border-b border-[#1A293C]
              flex
              items-center
              justify-between
            ">

              <div>

                <div className="
                  flex
                  items-center
                  gap-2
                ">

                  <div className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#142A3C]
                    text-[#73B7D8]
                    flex
                    items-center
                    justify-center
                  ">
                    <Ticket size={15} />
                  </div>

                  <h2 className="
                    text-base
                    font-bold
                  ">
                    Create Ticket
                  </h2>

                </div>


                <p className="
                  text-[10px]
                  text-slate-600
                  mt-1
                  ml-10
                ">
                  Submit your issue for support.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                className="
                  w-8
                  h-8
                  rounded-lg
                  bg-[#101B2D]
                  text-slate-500
                  hover:text-white
                  flex
                  items-center
                  justify-center
                "
              >
                <X size={16} />
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="
                p-5
                sm:p-6
                space-y-4
              "
            >


              {/* Title */}

              <div>

                <label className="
                  block
                  text-[11px]
                  font-semibold
                  text-slate-300
                  mb-1.5
                ">
                  Ticket Title
                </label>


                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Charged twice for my order"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    bg-[#101B2D]
                    border border-[#263A52]
                    text-xs
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    focus:border-[#457B9D]
                    transition
                  "
                />

              </div>


              {/* Description */}

              <div>

                <label className="
                  block
                  text-[11px]
                  font-semibold
                  text-slate-300
                  mb-1.5
                ">
                  Description
                </label>


                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Explain your issue in detail..."
                  className="
                    w-full
                    px-3
                    py-2.5
                    rounded-lg
                    bg-[#101B2D]
                    border border-[#263A52]
                    text-xs
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    resize-none
                    focus:border-[#457B9D]
                    transition
                  "
                />

              </div>


              {/* Category + Urgency */}

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              ">


                {/* Category */}

                <div>

                  <label className="
                    block
                    text-[11px]
                    font-semibold
                    text-slate-300
                    mb-1.5
                  ">
                    Category
                  </label>


                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="
                      w-full
                      h-10
                      px-3
                      rounded-lg
                      bg-[#101B2D]
                      border border-[#263A52]
                      text-xs
                      text-white
                      outline-none
                      focus:border-[#457B9D]
                    "
                  >

                    <option value="">
                      Let AI suggest
                    </option>

                    <option value="Billing">
                      Billing
                    </option>

                    <option value="Technical">
                      Technical
                    </option>

                    <option value="Account">
                      Account
                    </option>

                    <option value="Order">
                      Order
                    </option>

                    <option value="General">
                      General
                    </option>

                  </select>

                </div>


                {/* Urgency */}

                <div>

                  <label className="
                    block
                    text-[11px]
                    font-semibold
                    text-slate-300
                    mb-1.5
                  ">
                    Urgency
                  </label>


                  <select
                    name="urgency"
                    value={form.urgency}
                    onChange={handleChange}
                    className="
                      w-full
                      h-10
                      px-3
                      rounded-lg
                      bg-[#101B2D]
                      border border-[#263A52]
                      text-xs
                      text-white
                      outline-none
                      focus:border-[#457B9D]
                    "
                  >

                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                  </select>

                </div>

              </div>


              {/* Order ID */}

              <div>

                <label className="
                  block
                  text-[11px]
                  font-semibold
                  text-slate-300
                  mb-1.5
                ">
                  Order ID
                  <span className="
                    text-slate-600
                    ml-1
                  ">
                    (Optional)
                  </span>
                </label>


                <input
                  type="text"
                  name="orderId"
                  value={form.orderId}
                  onChange={handleChange}
                  placeholder="e.g. ORD-10293"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    bg-[#101B2D]
                    border border-[#263A52]
                    text-xs
                    text-white
                    placeholder:text-slate-600
                    outline-none
                    focus:border-[#457B9D]
                  "
                />

              </div>


              {/* Contact */}

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              ">


                {/* Number */}

                <div>

                  <label className="
                    block
                    text-[11px]
                    font-semibold
                    text-slate-300
                    mb-1.5
                  ">
                    Contact Number
                  </label>


                  <div className="
                    relative
                  ">

                    <Phone
                      size={14}
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
                      name="contactNumber"
                      value={
                        form.contactNumber
                      }
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="
                        w-full
                        h-10
                        pl-9
                        pr-3
                        rounded-lg
                        bg-[#101B2D]
                        border border-[#263A52]
                        text-xs
                        text-white
                        placeholder:text-slate-600
                        outline-none
                        focus:border-[#457B9D]
                      "
                    />

                  </div>

                </div>


                {/* Method */}

                <div>

                  <label className="
                    block
                    text-[11px]
                    font-semibold
                    text-slate-300
                    mb-1.5
                  ">
                    Contact Method
                  </label>


                  <div className="
                    relative
                  ">

                    <Mail
                      size={14}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-600
                        pointer-events-none
                      "
                    />


                    <select
                      name="contactMethod"
                      value={
                        form.contactMethod
                      }
                      onChange={handleChange}
                      className="
                        w-full
                        h-10
                        pl-9
                        pr-3
                        rounded-lg
                        bg-[#101B2D]
                        border border-[#263A52]
                        text-xs
                        text-white
                        outline-none
                        focus:border-[#457B9D]
                      "
                    >

                      <option value="Email">
                        Email
                      </option>

                      <option value="Phone">
                        Phone
                      </option>

                      <option value="SMS">
                        SMS
                      </option>

                    </select>

                  </div>

                </div>

              </div>


              {/* AI info */}

              <div className="
                flex
                gap-3
                p-3
                rounded-xl
                bg-[#142A3C]/50
                border border-[#263A52]
              ">

                <AlertCircle
                  size={16}
                  className="
                    text-[#73B7D8]
                    shrink-0
                    mt-0.5
                  "
                />


                <p className="
                  text-[10px]
                  leading-relaxed
                  text-slate-500
                ">
                  AI will analyze your ticket and
                  suggest the category, priority,
                  and a short summary. An agent will
                  review the suggestion.
                </p>

              </div>


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-11
                  rounded-xl
                  bg-[#457B9D]
                  hover:bg-[#3B6D8D]
                  disabled:opacity-50
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  font-semibold
                  transition
                "
              >

                {loading ? (

                  <>
                    <RefreshCw
                      size={15}
                      className="animate-spin"
                    />

                    Creating Ticket...

                  </>

                ) : (

                  <>
                    <Send size={15} />

                    Create Ticket

                  </>

                )}

              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};


export default Dashboard;

