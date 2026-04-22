import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const BookingsSection = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  // Date filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/bookings", {
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

  // ================= FILTER LOGIC =================
  const filteredBookings = bookings.filter((b) => {
    const matchSearch = `${b.bookingId} ${b.customerName} ${b.customerPhone}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const bookingDate = new Date(b.bookingTime);

    const matchFrom = fromDate ? bookingDate >= new Date(fromDate) : true;
    const matchTo = toDate ? bookingDate <= new Date(toDate) : true;

    return matchSearch && matchFrom && matchTo;
  });

  // ================= PDF DOWNLOAD =================
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("Booking Report", 14, 10);

    const tableData = filteredBookings.map((b) => [
      b.bookingId,
      b.customerName,
      b.customerPhone,
      `₹${b.totalAmount}`,
      b.paymentStatus,
      b.paymentMethod,
      new Date(b.bookingTime).toLocaleString(),
    ]);

    // ✅ FIXED WAY (NO doc.autoTable)
    autoTable(doc, {
      head: [[
        "ID",
        "Customer",
        "Phone",
        "Amount",
        "Status",
        "Method",
        "Date",
      ]],
      body: tableData,
      startY: 20,
    });

    doc.save("bookings.pdf");
  };

  return (
    <div className="p-4">

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-wrap gap-3 mb-4 items-end">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search name, phone, booking id..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FROM DATE */}
        <div>
          <label className="text-sm">From</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* TO DATE */}
        <div>
          <label className="text-sm">To</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* PDF BUTTON */}
        <button
          onClick={downloadPDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Download PDF
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
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
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