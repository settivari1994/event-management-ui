// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   LogOut,
// //   MapPin,
// //   IndianRupee,
// //   Ticket,
// //   CalendarDays
// // } from "lucide-react";
// // import { QRCodeCanvas } from "qrcode.react";

// // export default function OrganizerDashboard() {

// //   const [events, setEvents] = useState([]);
// //   const [username, setUsername] = useState("");

// //   const [showSellModal, setShowSellModal] = useState(false);
// //   const [selectedEvent, setSelectedEvent] = useState(null);

// //   const [booking, setBooking] = useState(null); // ✅ NEW

// //   const [bookingData, setBookingData] = useState({
// //     customerName: "",
// //     customerPhone: "",
// //     ticketCount: 1
// //   });

// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   // ✅ LOAD EVENTS
// //   const loadMyEvents = () => {
// //     axios.get("http://localhost:8080/api/events/my-events", {
// //       headers: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     })
// //     .then(res => setEvents(res.data))
// //     .catch(err => console.log(err));
// //   };

// //   // ✅ GET USERNAME FROM TOKEN
// //   const getUsernameFromToken = () => {
// //     try {
// //       const payload = JSON.parse(atob(token.split(".")[1]));
// //       setUsername(payload.sub);
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   useEffect(() => {
// //     loadMyEvents();
// //     getUsernameFromToken();
// //   }, []);

// //   // ✅ LOGOUT
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   };

// //   // ✅ HANDLE BOOKING
// //   const handleBooking = () => {

// //     if (!bookingData.customerName || !bookingData.customerPhone) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     const payload = {
// //       eventId: selectedEvent.id,
// //       customerName: bookingData.customerName,
// //       customerPhone: bookingData.customerPhone,
// //       ticketCount: Number(bookingData.ticketCount)
// //     };

// //     axios.post("http://localhost:8080/api/bookings", payload, {
// //       headers: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     })
// //     .then((res) => {
// //       setBooking(res.data); // ✅ SHOW QR
// //       alert("✅ Booking created. Ask customer to scan QR");
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       alert("❌ Booking failed");
// //     });
// //   };

// //   // ✅ CONFIRM PAYMENT
// //   const confirmPayment = (bookingId) => {
// //     axios.put(
// //       `http://localhost:8080/api/bookings/${bookingId}/confirm`,
// //       {},
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`
// //         }
// //       }
// //     )
// //     .then(res => {
// //       setBooking(res.data);

// //       alert("✅ Payment Successful");

// //       setShowSellModal(false);
// //       setBooking(null);

// //       setBookingData({
// //         customerName: "",
// //         customerPhone: "",
// //         ticketCount: 1
// //       });

// //       loadMyEvents();
// //     })
// //     .catch(err => {
// //       console.log(err);
// //       alert("❌ Payment failed");
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">

// //       {/* HEADER */}
// //       <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
// //         <h1 className="text-xl font-bold text-blue-600">
// //           Welcome Organizer 👉 {username}
// //         </h1>

// //         <button
// //           onClick={handleLogout}
// //           className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
// //         >
// //           <LogOut size={18} />
// //           Logout
// //         </button>
// //       </div>

// //       <p className="text-gray-500 mt-4">
// //         Events assigned by admin will appear here.
// //       </p>

// //       {/* EVENTS */}
// //       {events.length === 0 ? (
// //         <p className="text-gray-400 mt-4">No events assigned yet.</p>
// //       ) : (
// //         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

// //           {events.map((e) => (
// //             <div key={e.id} className="bg-white p-5 rounded-xl shadow">

// //               <h2 className="text-lg font-bold text-blue-600">{e.name}</h2>

// //               <div className="flex items-center gap-2 text-gray-600 mt-2">
// //                 <MapPin size={16} /> {e.location}
// //               </div>

// //               <div className="flex items-center gap-2 text-gray-600 mt-1">
// //                 <IndianRupee size={16} /> ₹ {e.price}
// //               </div>

// //               <div className="flex items-center gap-2 text-gray-600 mt-1">
// //                 <Ticket size={16} /> Total: {e.totalTickets}
// //               </div>

// //               <div className="text-gray-500 text-sm mt-1">
// //                 Available: {e.availableTickets}
// //               </div>

// //               <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
// //                 <CalendarDays size={16} /> {e.eventDate}
// //               </div>

// //               <button
// //                 onClick={() => {
// //                   setSelectedEvent(e);
// //                   setShowSellModal(true);
// //                   setBooking(null); // reset
// //                 }}
// //                 className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
// //               >
// //                 Sell Ticket
// //               </button>

// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* MODAL */}
// //       {showSellModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

// //           <div className="bg-white p-6 rounded-xl w-[350px] shadow-lg">

// //             <h2 className="text-lg font-bold mb-4 text-blue-600">
// //               Sell Ticket - {selectedEvent?.name}
// //             </h2>

// //             {/* FORM */}
// //             {!booking && (
// //               <>
// //                 <input
// //                   type="text"
// //                   placeholder="Customer Name"
// //                   className="w-full border p-2 mb-3 rounded"
// //                   value={bookingData.customerName}
// //                   onChange={(e) =>
// //                     setBookingData({ ...bookingData, customerName: e.target.value })
// //                   }
// //                 />

// //                 <input
// //                   type="text"
// //                   placeholder="Phone Number"
// //                   className="w-full border p-2 mb-3 rounded"
// //                   value={bookingData.customerPhone}
// //                   onChange={(e) =>
// //                     setBookingData({ ...bookingData, customerPhone: e.target.value })
// //                   }
// //                 />

// //                 <input
// //                   type="number"
// //                   className="w-full border p-2 mb-3 rounded"
// //                   value={bookingData.ticketCount}
// //                   onChange={(e) =>
// //                     setBookingData({ ...bookingData, ticketCount: e.target.value })
// //                   }
// //                 />

// //                 <div className="flex justify-between">
// //                   <button
// //                     onClick={() => setShowSellModal(false)}
// //                     className="bg-gray-400 text-white px-4 py-2 rounded"
// //                   >
// //                     Cancel
// //                   </button>

// //                   <button
// //                     onClick={handleBooking}
// //                     className="bg-green-600 text-white px-4 py-2 rounded"
// //                   >
// //                     Confirm
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {/* QR SECTION */}
// //             {booking && (
// //               <div className="text-center">

// //                 <h3 className="font-bold text-green-600 mb-2">
// //                   Scan to Pay
// //                 </h3>

// //                 <QRCodeCanvas
// //                   value={`upi://pay?pa=9494901647@ybl&pn=EventApp&am=${booking.totalPrice}&cu=INR&tn=BOOKING_${booking.id}`}
// //                   size={200}
// //                 />

// //                 <p className="mt-2">₹ {booking.totalPrice}</p>

// //                 <button
// //                   onClick={() => confirmPayment(booking.id)}
// //                   className="mt-4 w-full bg-green-600 text-white py-2 rounded"
// //                 >
// //                   Confirm Payment
// //                 </button>

// //               </div>
// //             )}

// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   LogOut,
//   MapPin,
//   IndianRupee,
//   Ticket,
//   CalendarDays
// } from "lucide-react";
// import { QRCodeCanvas } from "qrcode.react";

// export default function OrganizerDashboard() {

//   const [events, setEvents] = useState([]);
//   const [username, setUsername] = useState("");

//   const [showSellModal, setShowSellModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const [booking, setBooking] = useState(null);

//   const [showConfirmBox, setShowConfirmBox] = useState(false);

//   const [bookingData, setBookingData] = useState({
//     customerName: "",
//     customerPhone: "",
//     ticketCount: 1
//   });

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // ---------------- LOAD EVENTS ----------------
//   const loadMyEvents = () => {
//     axios.get("http://localhost:8080/api/events/my-events", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(res => setEvents(res.data))
//     .catch(err => console.log(err));
//   };

//   // ---------------- TOKEN USER ----------------
//   const getUsernameFromToken = () => {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       setUsername(payload.sub);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   useEffect(() => {
//     loadMyEvents();
//     getUsernameFromToken();
//   }, []);

//   // ---------------- LOGOUT ----------------
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // ---------------- BOOKING ----------------
//   const handleBooking = () => {

//     if (!bookingData.customerName || !bookingData.customerPhone) {
//       return;
//     }

//     const payload = {
//       eventId: selectedEvent.id,
//       customerName: bookingData.customerName,
//       customerPhone: bookingData.customerPhone,
//       ticketCount: Number(bookingData.ticketCount)
//     };

//     axios.post("http://localhost:8080/api/bookings", payload, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(res => {
//       setBooking(res.data);
//       setShowConfirmBox(false);
//       loadMyEvents();
//     })
//     .catch(err => console.log(err));
//   };

//   // ---------------- CONFIRM PAYMENT ----------------
//   const confirmPayment = (bookingId) => {

//     axios.put(`http://localhost:8080/api/bookings/${bookingId}/confirm`, {}, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     .then(res => {
//       setBooking(res.data);
//       setShowConfirmBox(false);
//       setShowSellModal(false);
//       setBooking(null);

//       setBookingData({
//         customerName: "",
//         customerPhone: "",
//         ticketCount: 1
//       });

//       loadMyEvents();
//     })
//     .catch(err => console.log(err));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">

//         <h1 className="text-xl font-bold text-blue-600">
//           Welcome Organizer 👉 {username}
//         </h1>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>

//       </div>

//       <p className="text-gray-500 mt-4">
//         Events assigned by admin will appear here.
//       </p>

//       {/* EVENTS */}
//       {events.length === 0 ? (
//         <p className="text-gray-400 mt-4">No events assigned yet.</p>
//       ) : (
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

//           {events.map((e) => (
//             <div key={e.id} className="bg-white p-5 rounded-xl shadow">

//               <h2 className="text-lg font-bold text-blue-600">
//                 {e.name}
//               </h2>

//               <div className="flex items-center gap-2 text-gray-600 mt-2">
//                 <MapPin size={16} /> {e.location}
//               </div>

//               <div className="flex items-center gap-2 text-gray-600 mt-1">
//                 <IndianRupee size={16} /> ₹ {e.price}
//               </div>

//               <div className="flex items-center gap-2 text-gray-600 mt-1">
//                 <Ticket size={16} /> Total: {e.totalTickets}
//               </div>

//               <div className="text-gray-500 text-sm mt-1">
//                 Available: {e.availableTickets}
//               </div>

//               <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
//                 <CalendarDays size={16} /> {e.eventDate}
//               </div>

//               {/* SELL BUTTON */}
//               <button
//                 disabled={e.availableTickets === 0}
//                 onClick={() => {
//                   setSelectedEvent(e);
//                   setShowSellModal(true);
//                   setBooking(null);
//                   setShowConfirmBox(false);
//                 }}
//                 className={`mt-4 w-full py-2 rounded text-white ${
//                   e.availableTickets === 0
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {e.availableTickets === 0 ? "Sold Out" : "Sell Ticket"}
//               </button>

//             </div>
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
//       {showSellModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

//           <div className="bg-white p-6 rounded-xl w-[360px] shadow-lg">

//             <h2 className="text-lg font-bold mb-4 text-blue-600">
//               Sell Ticket - {selectedEvent?.name}
//             </h2>

//             {/* FORM */}
//             {!booking && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Customer Name"
//                   className="w-full border p-2 mb-3 rounded"
//                   value={bookingData.customerName}
//                   onChange={(e) =>
//                     setBookingData({
//                       ...bookingData,
//                       customerName: e.target.value
//                     })
//                   }
//                 />

//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   className="w-full border p-2 mb-3 rounded"
//                   value={bookingData.customerPhone}
//                   onChange={(e) =>
//                     setBookingData({
//                       ...bookingData,
//                       customerPhone: e.target.value
//                     })
//                   }
//                 />

//                 <input
//                   type="number"
//                   className="w-full border p-2 mb-3 rounded"
//                   value={bookingData.ticketCount}
//                   onChange={(e) =>
//                     setBookingData({
//                       ...bookingData,
//                       ticketCount: e.target.value
//                     })
//                   }
//                 />

//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => setShowSellModal(false)}
//                     className="bg-gray-400 text-white px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={handleBooking}
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Generate QR
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* QR SECTION */}
//             {booking && (
//               <div className="flex flex-col items-center justify-center text-center mt-3">

//                 <h3 className="font-bold text-green-600 mb-2">
//                   Scan & Pay
//                 </h3>

//                 <QRCodeCanvas
//                   value={`upi://pay?pa=9494901647@ybl&pn=EventApp&am=${booking.totalPrice}&cu=INR&tn=BOOKING_${booking.id}`}
//                   size={200}
//                 />

//                 <p className="mt-2 font-semibold">
//                   ₹ {booking.totalPrice}
//                 </p>

//                 <button
//                   onClick={() => setShowConfirmBox(true)}
//                   className="mt-4 w-full bg-green-600 text-white py-2 rounded"
//                 >
//                   Confirm Payment
//                 </button>

//                 {/* YES / NO BOX */}
//                 {showConfirmBox && (
//                   <div className="mt-4 p-4 border rounded bg-gray-50 w-full">

//                     <p className="font-semibold mb-3 text-center">
//                       Payment completed?
//                     </p>

//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => setShowConfirmBox(false)}
//                         className="w-full bg-gray-400 text-white py-2 rounded"
//                       >
//                         No
//                       </button>

//                       <button
//                         onClick={() => confirmPayment(booking.id)}
//                         className="w-full bg-green-600 text-white py-2 rounded"
//                       >
//                         Yes
//                       </button>
//                     </div>

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  MapPin,
  IndianRupee,
  Ticket,
  CalendarDays,
  X
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function OrganizerDashboard() {

  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState("");

  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [booking, setBooking] = useState(null);
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerPhone: "",
    ticketCount: 1
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ---------------- LOAD EVENTS ----------------
  const loadMyEvents = () => {
    axios.get("http://localhost:8080/api/events/my-events", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEvents(res.data))
    .catch(console.log);
  };

  // ---------------- USER ----------------
  const getUsernameFromToken = () => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.sub);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadMyEvents();
    getUsernameFromToken();
  }, []);

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ---------------- BOOKING ----------------
  const handleBooking = () => {

    if (!bookingData.customerName || !bookingData.customerPhone) return;

    const payload = {
      eventId: selectedEvent.id,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      ticketCount: Number(bookingData.ticketCount)
    };

    axios.post("http://localhost:8080/api/bookings", payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setBooking(res.data);
      setShowConfirmBox(false);
      loadMyEvents();
    })
    .catch(console.log);
  };

  // ---------------- CONFIRM PAYMENT ----------------
  const confirmPayment = (bookingId) => {
    axios.put(
      `http://localhost:8080/api/bookings/${bookingId}/confirm`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => {
      setBooking(res.data);

      setShowConfirmBox(false);
      setShowSellModal(false);

      setBooking(null);
      setSelectedEvent(null);

      setBookingData({
        customerName: "",
        customerPhone: "",
        ticketCount: 1
      });

      loadMyEvents();
    })
    .catch(console.log);
  };

  // ---------------- RESET MODAL ----------------
  const closeModal = () => {
    setShowSellModal(false);
    setBooking(null);
    setShowConfirmBox(false);
    setSelectedEvent(null);

    setBookingData({
      customerName: "",
      customerPhone: "",
      ticketCount: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h1 className="text-xl font-bold text-blue-600">
          Welcome Organizer {username}
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* EVENTS */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {events.map((e) => (
          <div key={e.id} className="bg-white p-5 rounded-xl shadow">

            <h2 className="text-lg font-bold text-blue-600">{e.name}</h2>

            <div className="flex items-center gap-2 mt-2">
              <MapPin size={16} /> {e.location}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <IndianRupee size={16} /> ₹ {e.price}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <Ticket size={16} /> Available: {e.availableTickets}
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <CalendarDays size={16} /> {e.eventDate}
            </div>

            <button
              disabled={e.availableTickets === 0}
              onClick={() => {
                setSelectedEvent(e);
                setShowSellModal(true);
                setBooking(null);
              }}
              className={`mt-4 w-full py-2 rounded text-white ${
                e.availableTickets === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600"
              }`}
            >
              {e.availableTickets === 0 ? "Sold Out" : "Sell Ticket"}
            </button>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[380px] relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <X />
            </button>

            <h2 className="text-lg font-bold text-blue-600 text-center mb-4">
              Sell Ticket - {selectedEvent?.name}
            </h2>

            {/* FORM */}
            {!booking && (
              <>
                <input
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="Customer Name"
                  value={bookingData.customerName}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, customerName: e.target.value })
                  }
                />

                <input
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="Phone"
                  value={bookingData.customerPhone}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, customerPhone: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="w-full border p-2 mb-3 rounded"
                  value={bookingData.ticketCount}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, ticketCount: e.target.value })
                  }
                />

                <button
                  onClick={handleBooking}
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  Generate QR
                </button>
              </>
            )}

            {/* QR */}
            {booking && (
              <div className="flex flex-col items-center text-center">

                <h3 className="font-bold text-green-600 mb-2">
                  Scan & Pay
                </h3>

                <QRCodeCanvas
                  value={`upi://pay?pa=9494901647@ybl&pn=EventApp&am=${booking.totalPrice}&cu=INR&tn=BOOKING_${booking.id}`}
                  size={200}
                />

                <p className="mt-2 font-semibold">₹ {booking.totalPrice}</p>

                <button
                  onClick={() => setShowConfirmBox(true)}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded"
                >
                  Confirm Payment
                </button>

                {/* YES / NO */}
                {showConfirmBox && (
                  <div className="mt-4 w-full">
                    <p className="mb-2 font-semibold">Payment completed?</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowConfirmBox(false)}
                        className="w-full bg-gray-400 text-white py-2 rounded"
                      >
                        No
                      </button>

                      <button
                        onClick={() => confirmPayment(booking.id)}
                        className="w-full bg-green-600 text-white py-2 rounded"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}