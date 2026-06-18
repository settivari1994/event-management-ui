import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function Ticket() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);

  const bookingId = searchParams.get("bookingId");

  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:8080"
      : "https://event-management-api-production-94b1.up.railway.app";

  useEffect(() => {
    if (bookingId) {
      fetch(`${API_BASE}/api/public/bookings/${bookingId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("BOOKING DATA:", data);
          setBooking(data);
        })
        .catch((err) => console.error(err));
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <h3 className="text-center mt-10 text-gray-600">
        Loading ticket...
      </h3>
    );
  }

  const qrValue = `${window.location.origin}/ticket?bookingId=${booking.bookingId}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 py-6">

      {/* CARD */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-5">

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            {booking.event?.eventName}
          </h2>

          <p className="text-xs sm:text-sm opacity-90">
            {booking.event?.venueName}
          </p>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-5 space-y-3">

          {/* CUSTOMER */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Name
            </span>

            <span className="font-semibold">
              {booking.customerName}
            </span>
          </div>

          {/* BOOKING ID */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Booking ID
            </span>

            <span className="font-semibold">
              {booking.bookingId}
            </span>
          </div>

          {/* PHONE */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Phone
            </span>

            <span className="font-semibold">
              {booking.customerPhone}
            </span>
          </div>

          {/* EVENT DATE */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Event Date
            </span>

            <span className="font-semibold">
              {new Date(
                booking.event?.eventDate
              ).toLocaleDateString()}
            </span>
          </div>

          {/* EVENT TIME */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Event Time
            </span>

            <span className="font-semibold">
              {new Date(
                booking.event?.eventDate
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* PAYMENT METHOD */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Payment Method
            </span>

            <span className="font-semibold">
              {booking.paymentMethod}
            </span>
          </div>

          {/* PAYMENT STATUS */}
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-500">
              Payment Status
            </span>

            <span
              className={`font-semibold ${booking.paymentStatus === "PAID"
                  ? "text-green-600"
                  : "text-red-500"
                }`}
            >
              {booking.paymentStatus}
            </span>
          </div>

          {/* ITEMS */}
          <div className="space-y-3 pt-2">

            {booking.items?.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 bg-gray-50"
              >

                {/* CATEGORY */}
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-gray-500">
                    Category
                  </span>

                  <span className="font-semibold">
                    {item.categoryName}
                  </span>
                </div>

                {/* QUANTITY */}
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-gray-500">
                    Quantity
                  </span>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-gray-500">
                    Price Per Ticket
                  </span>

                  <span className="font-semibold">
                    ₹{item.price}
                  </span>
                </div>

              </div>
            ))}

            {/* BOOKING SUMMARY */}
            <div className="border-t pt-3 space-y-2">

              {/* TOTAL AMOUNT */}
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">
                  Total Amount
                </span>

                <span className="font-semibold">
                  ₹{booking.totalAmount ?? 0}
                </span>
              </div>

              {/* DISCOUNT */}
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-500">
                  Discount
                </span>

                <span className="font-semibold text-green-600">
                  ₹{booking.discount ?? 0}
                </span>
              </div>

              {/* APP SERVICE */}
              {(booking.appServiceCharge ?? 0) > 0 && (
                <div className="flex justify-between text-xs sm:text-sm">

                  <span className="text-gray-500">
                    App Service
                  </span>

                  <span className="font-semibold">
                    ₹{booking.appServiceCharge}
                  </span>

                </div>
              )}

              {/* GST */}
              {(booking.gstAmount ?? 0) > 0 && (
                <div className="flex justify-between text-xs sm:text-sm">

                  <span className="text-gray-500">
                    GST
                  </span>

                  <span className="font-semibold">
                    ₹{booking.gstAmount}
                  </span>

                </div>
              )}

              {/* FINAL AMOUNT */}
              <div className="flex justify-between text-sm sm:text-base font-bold">
                <span>
                  Final Amount
                </span>

                <span className="text-blue-600">
                  ₹{booking.finalAmount ?? 0}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* CUT LINE */}
        <div className="relative my-2 sm:my-3">
          <div className="border-t border-dashed"></div>

          <div className="absolute -left-2 top-[-6px] w-3 h-3 bg-gray-100 rounded-full"></div>

          <div className="absolute -right-2 top-[-6px] w-3 h-3 bg-gray-100 rounded-full"></div>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center p-4 sm:p-5">

          <QRCodeCanvas
            value={qrValue}
            size={140}
            className="sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]"
          />

          <p className="text-[10px] sm:text-xs text-gray-500 mt-2 text-center">
            Scan to verify ticket
          </p>

        </div>

      </div>

    </div>
  );
}

export default Ticket;


