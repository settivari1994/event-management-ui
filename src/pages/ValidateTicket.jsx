import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://event-management-api-production-94b1.up.railway.app";

const ValidateTicket = () => {
  const { eventId } = useParams();

  const scannerRef = useRef(null);

  const [result, setResult] = useState(null);

  useEffect(() => {

    if (scannerRef.current) {
      return;
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scanner.render(
      async (decodedText) => {

        scanner.clear();

        try {

          const url = new URL(decodedText);

          const bookingId = url.searchParams.get("bookingId");

          const res = await axios.get(
            `${API_BASE}/api/public/tickets/validate/${bookingId}`
          );

          setResult(res.data);

        } catch (err) {

          console.error(err);

          setResult({
            valid: false,
            message: "Invalid QR Code",
          });

        }

      },
      (error) => {
        // Ignore scan errors
      }
    );

    scannerRef.current = scanner;

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">

        <h2 className="text-2xl font-bold text-center">
          Validate Ticket
        </h2>

        <p className="text-center text-gray-500 mb-5">
          Event Id : {eventId}
        </p>

        <div id="reader"></div>

        {result && (

          <div className="mt-6">

            {result.valid ? (

              <div className="bg-green-100 border border-green-500 p-4 rounded">

                <h2 className="text-green-700 font-bold text-xl">
                  ✅ Valid Ticket
                </h2>

                <p>
                  Booking Id :
                  {result.bookingId}
                </p>

                <p>
                  Customer :
                  {result.customerName}
                </p>

              </div>

            ) : (

              <div className="bg-red-100 border border-red-500 p-4 rounded">

                <h2 className="text-red-700 font-bold text-xl">
                  ❌ Invalid Ticket
                </h2>

                <p>{result.message}</p>

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
};

export default ValidateTicket;