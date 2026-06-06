import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const BookingsSection = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "https://event-management-api-production-94b1.up.railway.app/api/bookings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= SEARCH FILTER =================
  const tableBookings = bookings.filter((b) =>
    `${b.bookingId}
     ${b.customerName}
     ${b.customerPhone}
     ${b.paymentMethod}
     ${b.paymentStatus}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= DATE FILTER FOR STATS =================
  const statsBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.bookingTime);

    const matchFrom = fromDate
      ? bookingDate >= new Date(fromDate)
      : true;

    const matchTo = toDate
      ? bookingDate <= new Date(toDate + "T23:59:59")
      : true;

    return matchFrom && matchTo;
  });

  // ================= DASHBOARD STATS =================
  const totalBookings = statsBookings.length;

  const totalRevenue = statsBookings.reduce(
    (sum, booking) => sum + (booking.totalAmount || 0),
    0
  );

  const totalDiscount = statsBookings.reduce(
    (sum, booking) => sum + (booking.discount || 0),
    0
  );

  const finalRevenue = statsBookings.reduce(
    (sum, booking) =>
      sum +
      (booking.finalAmount > 0
        ? booking.finalAmount
        : booking.totalAmount),
    0
  );

  // ================= EXCEL EXPORT =================
  const downloadExcel = () => {
    const excelData = [];

    tableBookings.forEach((booking) => {
      if (booking.items?.length > 0) {
        booking.items.forEach((item) => {
          excelData.push({
            BookingID: booking.bookingId,
            BookingEvent:booking.event.eventName,
            CustomerName: booking.customerName,
            CustomerPhone: booking.customerPhone,
            TicketCategory: item.categoryName,
            TicketQuantity: item.quantity,
            TotalAmount: booking.totalAmount,
            Discount: booking.discount,
            FinalAmount:
              booking.finalAmount > 0
                ? booking.finalAmount
                : booking.totalAmount,
            PaymentStatus: booking.paymentStatus,
            PaymentMethod: booking.paymentMethod,
          });
        });
      }
    });

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Bookings"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "Bookings_Report.xlsx");
  };

  return (
    <div className="p-4">

      {/* ================= DASHBOARD ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">

        <div className="bg-blue-500 text-white rounded p-4 shadow">
          <h3 className="text-sm">Total Bookings</h3>
          <p className="text-2xl font-bold">
            {totalBookings}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded p-4 shadow">
          <h3 className="text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="bg-yellow-500 text-white rounded p-4 shadow">
          <h3 className="text-sm">Discount Given</h3>
          <p className="text-2xl font-bold">
            ₹{totalDiscount}
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded p-4 shadow">
          <h3 className="text-sm">Final Revenue</h3>
          <p className="text-2xl font-bold">
            ₹{finalRevenue}
          </p>
        </div>

      </div>

      {/* ================= FILTERS ================= */}

      <div className="flex flex-wrap gap-3 mb-5">

        <input
          type="text"
          placeholder="Search Booking..."
          className="border rounded p-2 w-64"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <input
          type="date"
          className="border rounded p-2"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
        />

        <input
          type="date"
          className="border rounded p-2"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
        />

        <button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Download Excel
        </button>

      </div>

      {/* ================= TABLE ================= */}

     {/* ================= TABLE ================= */}

<div className="bg-white rounded-xl shadow border">

  <div className="max-h-[70vh] overflow-auto">

    <table className="w-full min-w-[1200px] border-collapse text-sm">

      <thead className="bg-gray-100 sticky top-0 z-10">

        <tr>

          <th className="border p-3 whitespace-nowrap">
            Booking ID
          </th>

          <th className="border p-3 whitespace-nowrap">
            Event Name
          </th>

          <th className="border p-3 whitespace-nowrap">
            Customer Name
          </th>

          <th className="border p-3 whitespace-nowrap">
            Customer Phone
          </th>

          <th className="border p-3 whitespace-nowrap">
            Ticket Category
          </th>

          <th className="border p-3 whitespace-nowrap text-center">
            Qty
          </th>

          <th className="border p-3 whitespace-nowrap text-right">
            Total Amount
          </th>

          <th className="border p-3 whitespace-nowrap text-right">
            Discount
          </th>

          <th className="border p-3 whitespace-nowrap text-right">
            Final Amount
          </th>

          <th className="border p-3 whitespace-nowrap text-center">
            Payment Status
          </th>

          <th className="border p-3 whitespace-nowrap hidden lg:table-cell">
            Payment Method
          </th>
        </tr>

      </thead>

      <tbody>

        {tableBookings.length === 0 ? (
          <tr>
            <td
              colSpan="11"
              className="text-center p-6"
            >
              No Bookings Found
            </td>
          </tr>
        ) : (
          tableBookings.map((booking) => (
            <tr
              key={booking.bookingId}
              className="hover:bg-blue-50 transition-colors"
            >
              <td className="border p-3 text-center">
                {booking.bookingId}
              </td>

               <td className="border p-3 text-center">
                  {booking.event?.eventName}
              </td>

              <td className="border p-3 font-medium">
                {booking.customerName}
              </td>

              <td className="border p-3">
                {booking.customerPhone}
              </td>

              <td className="border p-3">
                {booking.items
                  ?.map((item) => item.categoryName)
                  .join(", ")}
              </td>

              <td className="border p-3 text-center">
                {booking.items?.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </td>

              <td className="border p-3 text-right">
                ₹{booking.totalAmount}
              </td>

              <td className="border p-3 text-right text-red-600">
                ₹{booking.discount || 0}
              </td>

              <td className="border p-3 text-right text-green-600 font-bold">
                ₹
                {booking.finalAmount > 0
                  ? booking.finalAmount
                  : booking.totalAmount}
              </td>

              <td className="border p-3 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.paymentStatus}
                </span>

              </td>

              <td className="border p-3 text-center hidden lg:table-cell">
                {booking.paymentMethod}
              </td>

            </tr>
          ))
        )}

      </tbody>

    </table>

  </div>

</div>

    </div>
  );
};

export default BookingsSection;