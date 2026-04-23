import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BookingsSection = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Date filters ONLY for stats
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://event-management-api-production-94b1.up.railway.app/api/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= TABLE FILTER (ONLY SEARCH) =================
  const tableBookings = bookings.filter((b) =>
    `${b.bookingId} ${b.customerName} ${b.customerPhone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= STATS FILTER (DATE ONLY) =================
  const statsBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.bookingTime);

    const matchFrom = fromDate ? bookingDate >= new Date(fromDate) : true;
    const matchTo = toDate ? bookingDate <= new Date(toDate) : true;

    return matchFrom && matchTo;
  });

  // ================= STATS =================
  const totalBookings = statsBookings.length;

  const totalRevenue = statsBookings.reduce(
    (sum, b) => sum + (b.totalAmount || 0),
    0
  );

  const paidAmount = statsBookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const pendingAmount = statsBookings
    .filter((b) => b.paymentStatus !== "PAID")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // ================= EXCEL DOWNLOAD =================
  const downloadExcel = () => {
    const data = [];

    tableBookings.forEach((b) => {
      if (b.items && b.items.length > 0) {
        b.items.forEach((item) => {
          data.push({
            ...b,
            categoryName: item.categoryName,
            quantity: item.quantity,
            price: item.price,
          });
        });
      } else {
        data.push({ ...b });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "Bookings_Report.xlsx");
  };

  return (
    <div className="p-4">

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h3>Total Bookings</h3>
          <p className="text-xl font-bold">{totalBookings}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3>Total Revenue</h3>
          <p className="text-xl font-bold">₹{totalRevenue}</p>
        </div>

        <div className="bg-emerald-600 text-white p-4 rounded shadow">
          <h3>Paid</h3>
          <p className="text-xl font-bold">₹{paidAmount}</p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded shadow">
          <h3>Pending</h3>
          <p className="text-xl font-bold">₹{pendingAmount}</p>
        </div>

      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">

        {/* SEARCH → TABLE ONLY */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* DATE FILTER → STATS ONLY */}
        <div>
          <label className="text-sm">From</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">To</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>

      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded shadow">

        <table className="w-full border text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Payment</th>
              <th className="p-2 border">Method</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {tableBookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No bookings found
                </td>
              </tr>
            ) : (
              tableBookings.map((b) => (
                <tr key={b.bookingId} className="text-center">

                  <td className="p-2 border">{b.bookingId}</td>
                  <td className="p-2 border">{b.customerName}</td>
                  <td className="p-2 border">{b.customerPhone}</td>
                  <td className="p-2 border">₹{b.totalAmount}</td>

                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 text-white text-xs rounded ${
                        b.paymentStatus === "PAID"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>

                  <td className="p-2 border">{b.paymentMethod}</td>

                  <td className="p-2 border">
                    {new Date(b.bookingTime).toLocaleString()}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default BookingsSection;