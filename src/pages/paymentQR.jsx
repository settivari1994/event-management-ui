import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const PaymentQR = ({ event, bookingId }) => {
  const [upiUrl, setUpiUrl] = useState("");
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {
    const url = `upi://pay?pa=yourupi@upi&pn=EventApp&am=${event.price}&cu=INR&tn=BOOKING_${bookingId}`;
    
    setUpiUrl(url);
    setShowQR(true);
  };

  const confirmPayment = async () => {
    try {
      await fetch(`http://localhost:8080/api/bookings/${bookingId}/confirm`, {
        method: "POST",
      });

      alert("✅ Payment Confirmed!");
    } catch (err) {
      console.error(err);
      alert("❌ Error confirming payment");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-3">Payment</h2>

      <button
        onClick={generateQR}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Show QR
      </button>

      {showQR && (
        <div className="mt-4">
          <QRCodeCanvas value={upiUrl} size={220} />

          <p className="mt-2 text-gray-600">
            Amount: ₹{event.price}
          </p>

          <button
            onClick={confirmPayment}
            className="bg-green-600 text-white px-4 py-2 rounded mt-3"
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentQR;