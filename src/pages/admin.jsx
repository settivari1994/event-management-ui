// import { useNavigate } from "react-router-dom";
// import EventList from "../pages/components/EventList";

// export default function Admin() {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center bg-white p-5 shadow-md rounded-xl">

//         <h1 className="text-2xl font-bold text-blue-600">
//           Admin Dashboard
//         </h1>

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//       </div>

//       {/* WELCOME CARD */}
//       <div className="mt-6 bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">

//         <h2 className="text-xl font-semibold text-gray-800">
//           Welcome Admin 🚀
//         </h2>

//         <p className="text-gray-600 mt-2">
//           Manage events, organizers, and system operations from here.
//         </p>

//       </div>

//       {/* EVENT LIST SECTION */}
//       <div className="mt-8">

//         <div className="bg-white p-6 rounded-xl shadow-md">


//           <EventList />

//         </div>

//       </div>

//     </div>
//   );
// }





import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EventList from "../pages/components/EventList";

import {
    FileText,
    LogOut,
    IndianRupee,
    User,
    Phone,
    CalendarDays,
    Ticket,
    Search,
    TrendingUp,
    Clock,
    CheckCircle
} from "lucide-react";

export default function Admin() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [showReports, setShowReports] = useState(false);
    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");

    // 🔥 LOAD REPORTS
    const loadReports = () => {
        axios.get("http://localhost:8080/api/bookings/reports", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setReports(res.data))
            .catch(err => console.log(err));
    };

    const handleReportsClick = () => {
        setShowReports(!showReports);
        loadReports();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // 🔥 FILTERED DATA
    const filteredReports = reports.filter(r =>
        r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        r.customerPhone?.includes(search) ||
        r.event?.name?.toLowerCase().includes(search.toLowerCase())
    );

    // 🔥 CALCULATIONS
    const totalRevenue = reports
        .filter(r => r.paymentStatus === "PAID")
        .reduce((sum, r) => sum + r.totalPrice, 0);

    const totalPaid = reports.filter(r => r.paymentStatus === "PAID").length;
    const totalPending = reports.filter(r => r.paymentStatus === "PENDING").length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center bg-white p-5 shadow-md rounded-xl">

                <h1 className="text-2xl font-bold text-blue-600">
                    Admin Dashboard
                </h1>

                <div className="flex gap-3">

                    <button
                        onClick={handleReportsClick}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
                    >
                        <FileText size={18} />
                        Reports
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </div>

            {/* WELCOME */}
            <div className="mt-6 bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                <h2 className="text-xl font-semibold">Welcome Admin </h2>
                <p className="text-gray-600 mt-2">
                    Manage events, organizers, and reports
                </p>
            </div>

            {/* EVENTS */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <EventList />
            </div>

            {/* REPORTS */}
            {showReports && (
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FileText /> Booking Reports
                    </h2>

                    {/* 🔥 SUMMARY CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">

                        <div className="bg-green-100 p-4 rounded-xl shadow">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-green-600" />
                                <p className="font-semibold">Total Revenue</p>
                            </div>
                            <h3 className="text-2xl font-bold text-green-700">
                                ₹{totalRevenue}
                            </h3>
                        </div>

                        <div className="bg-blue-100 p-4 rounded-xl shadow">
                            <div className="flex items-center gap-2">
                                <Ticket className="text-blue-600" />
                                <p className="font-semibold">Total Bookings</p>
                            </div>
                            <h3 className="text-2xl font-bold">
                                {reports.length}
                            </h3>
                        </div>

                        <div className="bg-green-100 p-4 rounded-xl shadow">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="text-green-600" />
                                <p className="font-semibold">Paid</p>
                            </div>
                            <h3 className="text-2xl font-bold text-green-700">
                                {totalPaid}
                            </h3>
                        </div>

                        <div className="bg-yellow-100 p-4 rounded-xl shadow">
                            <div className="flex items-center gap-2">
                                <Clock className="text-yellow-600" />
                                <p className="font-semibold">Pending</p>
                            </div>
                            <h3 className="text-2xl font-bold text-yellow-700">
                                {totalPending}
                            </h3>
                        </div>

                    </div>

                    {/* SEARCH */}
                    <div className="flex items-center gap-2 mb-4 border p-2 rounded-lg bg-gray-50">
                        <Search />
                        <input
                            type="text"
                            placeholder="Search by name, phone, event..."
                            className="w-full outline-none bg-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full border rounded-lg">

                            {/* HEADER */}
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="p-3">Event Name</th>
                                    <th className="p-3">Place</th>
                                    <th className="p-3">Customer Name</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3">Organizer</th>
                                    <th className="p-3">Tickets</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody>
                                {filteredReports.map((r) => (
                                    <tr key={r.id} className="text-center hover:bg-gray-50">

                                        {/* 1. EVENT NAME */}
                                        <td className="p-3 border font-semibold text-blue-700">
                                            {r.event?.name}
                                        </td>

                                        {/* 2. PLACE */}
                                        <td className="p-3 border text-gray-700">
                                            {r.event?.location}
                                        </td>

                                        {/* 3. CUSTOMER NAME */}
                                        <td className="p-3 border">
                                            {r.customerName}
                                        </td>

                                        {/* 4. PHONE */}
                                        <td className="p-3 border">
                                            {r.customerPhone}
                                        </td>

                                        {/* 5. ORGANIZER */}
                                        <td className="p-3 border">
                                            {r.agent?.username}
                                        </td>

                                        {/* 6. TICKETS */}
                                        <td className="p-3 border">
                                            {r.ticketCount}
                                        </td>

                                        {/* 7. AMOUNT */}
                                        <td className="p-3 border font-bold text-green-600">
                                            ₹{r.totalPrice}
                                        </td>

                                        {/* 8. STATUS */}
                                        <td className="p-3 border">
                                            <span className={
                                                r.paymentStatus === "PAID"
                                                    ? "text-green-600 font-bold"
                                                    : "text-red-500 font-bold"
                                            }>
                                                {r.paymentStatus}
                                            </span>
                                        </td>

                                        {/* 9. DATE */}
                                        <td className="p-3 border text-sm text-gray-600">
                                            {new Date(r.bookingTime).toLocaleString()}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    </div>

                </div>
            )}

        </div>
    );
}