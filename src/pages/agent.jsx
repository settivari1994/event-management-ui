// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { QRCodeCanvas } from "qrcode.react"; // ✅ UPDATED
// // import {
// //   CalendarDays,
// //   MapPin,
// //   FileText,
// //   LogOut,
// //   X,
// // } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // const Organizer = () => {
// //   const [events, setEvents] = useState([]);
// //   const navigate = useNavigate();

// //   // ===== SELL MODAL =====
// //   const [showSellModal, setShowSellModal] = useState(false);
// //   const [sellEventId, setSellEventId] = useState(null);
// //   const [categories, setCategories] = useState([]);
// //   const [selectedTickets, setSelectedTickets] = useState([]);

// //   // ===== CUSTOMER FORM =====
// //   const [customerName, setCustomerName] = useState("");
// //   const [customerPhone, setCustomerPhone] = useState("");
// //   const [couponCode, setCouponCode] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("CASH");
// //   const [transactionId, setTransactionId] = useState("");

// //   // ===== UPI ID =====
// //   const [upiId, setUpiId] = useState("");

// //   // ================= FETCH EVENTS =================
// //   const fetchAssignedEvents = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:8080/api/events/assigned",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );
// //       setEvents(res.data);
// //     } catch {
// //       toast.error("Failed to load events");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAssignedEvents();
// //   }, []);

// //   // ================= LOGOUT =================
// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   };

// //   // ================= OPEN MODAL =================
// //   const openSellModal = async (eventId) => {
// //     setSellEventId(eventId);
// //     setShowSellModal(true);
// //     setSelectedTickets([]);
// //     setUpiId("");

// //     setCustomerName("");
// //     setCustomerPhone("");
// //     setCouponCode("");
// //     setPaymentMethod("CASH");
// //     setTransactionId("");

// //     try {
// //       // categories
// //       const catRes = await axios.get(
// //         `http://localhost:8080/api/admin/events/${eventId}/categories`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );
// //       setCategories(catRes.data);

// //       // UPI API
// //       const upiRes = await axios.get(
// //         `http://localhost:8080/api/event-config/${eventId}/upi`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );

// //       setUpiId(upiRes.data);
// //     } catch {
// //       toast.error("Failed to load event data");
// //     }
// //   };

// //   // ================= UPDATE QTY =================
// //   const updateQuantity = (categoryId, quantity) => {
// //     const qty = parseInt(quantity || 0);

// //     setSelectedTickets((prev) => {
// //       const existing = prev.find((t) => t.categoryId === categoryId);

// //       if (existing) {
// //         return prev.map((t) =>
// //           t.categoryId === categoryId ? { ...t, quantity: qty } : t
// //         );
// //       }

// //       return [...prev, { categoryId, quantity: qty }];
// //     });
// //   };

// //   // ================= TOTAL =================
// //   const getTotalPrice = () => {
// //     return selectedTickets.reduce((total, t) => {
// //       const cat = categories.find((c) => c.id === t.categoryId);
// //       return total + (cat ? cat.price * t.quantity : 0);
// //     }, 0);
// //   };

// //   // ================= SELL API =================
// //   const handleSellTickets = async () => {
// //     if (!customerName || !customerPhone) {
// //       toast.error("Customer details required");
// //       return;
// //     }

// //     const payload = {
// //       customerName,
// //       customerPhone,
// //       couponCode,
// //       paymentMethod,
// //       transactionId,
// //       selections: selectedTickets.filter((t) => t.quantity > 0),
// //     };

// //     try {
// //       await axios.post(
// //         `http://localhost:8080/api/bookings`,
// //         payload,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );

// //       toast.success("Booking successful");
// //       setShowSellModal(false);
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Booking failed");
// //     }
// //   };

// //   // ================= UPI QR VALUE =================
// //   const getUpiValue = () => {
// //     if (!upiId) return "";
// //     return `upi://pay?pa=${upiId}&pn=Event&am=${getTotalPrice()}&cu=INR`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">

// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
// //         <h1 className="text-2xl font-bold">Organizer Dashboard</h1>

// //         <button
// //           onClick={handleLogout}
// //           className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
// //         >
// //           <LogOut size={16} />
// //           Logout
// //         </button>
// //       </div>

// //       {/* EVENTS */}
// //       <div className="grid md:grid-cols-3 gap-6">
// //         {events.map((event) => (
// //           <div key={event.id} className="bg-white p-5 rounded shadow">

// //             <h2 className="text-xl font-bold">{event.eventName}</h2>

// //             <div className="flex gap-2 items-center mt-2">
// //               <CalendarDays size={16} />
// //               {new Date(event.eventDate).toLocaleString()}
// //             </div>

// //             <div className="flex gap-2 items-center mt-2">
// //               <MapPin size={16} />
// //               {event.venueName}
// //             </div>

// //             <p className="mt-2 text-sm flex gap-2">
// //               <FileText size={16} />
// //               {event.eventDescription}
// //             </p>

// //             <button
// //               onClick={() => openSellModal(event.id)}
// //               className="mt-4 bg-green-600 text-white px-3 py-2 rounded"
// //             >
// //               Sell Tickets
// //             </button>
// //           </div>
// //         ))}
// //       </div>

// //       {/* MODAL */}
// //       {showSellModal && (
// //         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
// //           <div className="bg-white p-5 rounded w-[520px] relative">

// //             {/* CLOSE */}
// //             <button onClick={() => setShowSellModal(false)} className="absolute right-2 top-2">
// //               <X />
// //             </button>

// //             <h2 className="text-lg font-bold mb-3">Sell Tickets</h2>

// //             {/* CUSTOMER */}
// //             <input
// //               placeholder="Customer Name"
// //               className="border w-full p-2 mb-2"
// //               value={customerName}
// //               onChange={(e) => setCustomerName(e.target.value)}
// //             />

// //             <input
// //               placeholder="Customer Phone"
// //               className="border w-full p-2 mb-2"
// //               value={customerPhone}
// //               onChange={(e) => setCustomerPhone(e.target.value)}
// //             />

// //             <input
// //               placeholder="Coupon Code"
// //               className="border w-full p-2 mb-2"
// //               value={couponCode}
// //               onChange={(e) => setCouponCode(e.target.value)}
// //             />

// //             {/* PAYMENT */}
// //             <select
// //               className="border w-full p-2 mb-3"
// //               value={paymentMethod}
// //               onChange={(e) => setPaymentMethod(e.target.value)}
// //             >
// //               <option value="CASH">Cash</option>
// //               <option value="UPI">UPI</option>
// //               <option value="POS">POS</option>
// //             </select>

// //             {paymentMethod !== "CASH" && (
// //               <input
// //                 placeholder="Transaction ID"
// //                 className="border w-full p-2 mb-3"
// //                 value={transactionId}
// //                 onChange={(e) => setTransactionId(e.target.value)}
// //               />
// //             )}

// //             {/* QR CODE */}
// //             {paymentMethod === "UPI" && upiId && (
// //               <div className="flex flex-col items-center my-3">
// //                 <p className="text-sm font-semibold mb-2">
// //                   Scan & Pay ₹{getTotalPrice()}
// //                 </p>

// //                 <QRCodeCanvas value={getUpiValue()} size={180} />

// //                 <p className="text-xs mt-2 text-gray-500">{upiId}</p>
// //               </div>
// //             )}

// //             {/* CATEGORIES */}
// //             <div className="max-h-48 overflow-auto space-y-2">
// //               {categories.map((cat) => (
// //                 <div key={cat.id} className="flex justify-between border p-2 rounded">

// //                   <div>
// //                     <p className="font-semibold">{cat.name}</p>
// //                     <p className="text-sm text-gray-500">
// //                       ₹{cat.price} | Avl: {cat.remainingQuantity}
// //                     </p>
// //                   </div>

// //                   <input
// //                     type="number"
// //                     min="0"
// //                     max={cat.remainingQuantity}
// //                     className="border w-16"
// //                     onChange={(e) =>
// //                       updateQuantity(cat.id, e.target.value)
// //                     }
// //                   />
// //                 </div>
// //               ))}
// //             </div>

// //             {/* TOTAL */}
// //             <div className="mt-3 font-bold">
// //               Total: ₹{getTotalPrice()}
// //             </div>

// //             {/* BUTTON */}
// //             <button
// //               onClick={handleSellTickets}
// //               className="w-full bg-blue-600 text-white py-2 mt-3 rounded"
// //             >
// //               Sell
// //             </button>

// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Organizer;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { QRCodeCanvas } from "qrcode.react";
// import {
//   CalendarDays,
//   MapPin,
//   FileText,
//   LogOut,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Organizer = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   // ===== SELL MODAL =====
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [sellEventId, setSellEventId] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedTickets, setSelectedTickets] = useState([]);

//   // ===== COUPONS =====
//   const [coupons, setCoupons] = useState([]);
//   const [selectedCoupon, setSelectedCoupon] = useState(null);

//   // ===== CUSTOMER FORM =====
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("CASH");
//   const [transactionId, setTransactionId] = useState("");

//   // ===== UPI ID =====
//   const [upiId, setUpiId] = useState("");

//   // ================= FETCH EVENTS =================
//   const fetchAssignedEvents = async () => {
//     try {
//       const res = await axios.get(
//         "https://event-management-api-production-94b1.up.railway.app/api/events/assigned",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setEvents(res.data);
//     } catch {
//       toast.error("Failed to load events");
//     }
//   };

//   useEffect(() => {
//     fetchAssignedEvents();
//   }, []);

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   // ================= OPEN MODAL =================
//   const openSellModal = async (eventId) => {
//     setSellEventId(eventId);
//     setShowSellModal(true);
//     setSelectedTickets([]);
//     setUpiId("");
//     setCoupons([]);
//     setSelectedCoupon(null);

//     setCustomerName("");
//     setCustomerPhone("");
//     setCouponCode("");
//     setPaymentMethod("CASH");
//     setTransactionId("");

//     try {
//       // categories
//       const catRes = await axios.get(
//         `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${eventId}/categories`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setCategories(catRes.data);

//       // UPI
//       const upiRes = await axios.get(
//         `https://event-management-api-production-94b1.up.railway.app/api/event-config/${eventId}/upi`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setUpiId(upiRes.data);

//       // ✅ FETCH COUPONS (OPTION 2 FIX APPLIED)
//       const couponRes = await axios.get(
//         `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${eventId}/coupons`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       // 🔥 ONLY VALID DATE FILTER (NO ACTIVE CHECK)
//       const validCoupons = couponRes.data.filter(
//         (c) => new Date(c.validTill) > new Date()
//       );

//       setCoupons(validCoupons);

//     } catch {
//       toast.error("Failed to load event data");
//     }
//   };

//   // ================= UPDATE QTY =================
//   const updateQuantity = (categoryId, quantity) => {
//     const qty = parseInt(quantity || 0);

//     setSelectedTickets((prev) => {
//       const existing = prev.find((t) => t.categoryId === categoryId);

//       if (existing) {
//         return prev.map((t) =>
//           t.categoryId === categoryId ? { ...t, quantity: qty } : t
//         );
//       }

//       return [...prev, { categoryId, quantity: qty }];
//     });
//   };

//   // ================= TOTAL =================
//   const getTotalPrice = () => {
//     return selectedTickets.reduce((total, t) => {
//       const cat = categories.find((c) => c.id === t.categoryId);
//       return total + (cat ? cat.price * t.quantity : 0);
//     }, 0);
//   };

//   // ================= DISCOUNT =================
//   const getDiscountedTotal = () => {
//     const total = getTotalPrice();

//     if (!selectedCoupon) return total;

//     const discount = (total * selectedCoupon.discountPercentage) / 100;
//     return total - discount;
//   };

//   // ================= SELL API =================
//   const handleSellTickets = async () => {
//     if (!customerName || !customerPhone) {
//       toast.error("Customer details required");
//       return;
//     }

//     const payload = {
//       customerName,
//       customerPhone,
//       couponCode,
//       paymentMethod,
//       transactionId,
//       selections: selectedTickets.filter((t) => t.quantity > 0),
//     };

//     try {
//       await axios.post(
//         `https://event-management-api-production-94b1.up.railway.app/api/bookings`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       toast.success("Booking successful");
//       setShowSellModal(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Booking failed");
//     }
//   };

//   // ================= UPI VALUE =================
//   const getUpiValue = () => {
//     if (!upiId) return "";
//     return `upi://pay?pa=${upiId}&pn=Event&am=${getDiscountedTotal()}&cu=INR`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
//         <h1 className="text-2xl font-bold">Organizer Dashboard</h1>

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>

//       {/* EVENTS */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <div key={event.id} className="bg-white p-5 rounded shadow">

//             <h2 className="text-xl font-bold">{event.eventName}</h2>

//             <div className="flex gap-2 items-center mt-2">
//               <CalendarDays size={16} />
//               {new Date(event.eventDate).toLocaleString()}
//             </div>

//             <div className="flex gap-2 items-center mt-2">
//               <MapPin size={16} />
//               {event.venueName}
//             </div>

//             <p className="mt-2 text-sm flex gap-2">
//               <FileText size={16} />
//               {event.eventDescription}
//             </p>

//             <button
//               onClick={() => openSellModal(event.id)}
//               className="mt-4 bg-green-600 text-white px-3 py-2 rounded"
//             >
//               Sell Tickets
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {showSellModal && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded w-[520px] relative">

//             <button onClick={() => setShowSellModal(false)} className="absolute right-2 top-2">
//               <X />
//             </button>

//             <h2 className="text-lg font-bold mb-3">Sell Tickets</h2>

//             {/* CUSTOMER */}
//             <input
//               placeholder="Customer Name"
//               className="border w-full p-2 mb-2"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//             />

//             <input
//               placeholder="Customer Phone"
//               className="border w-full p-2 mb-2"
//               value={customerPhone}
//               onChange={(e) => setCustomerPhone(e.target.value)}
//             />

//             {/* COUPON DROPDOWN */}
//             <select
//               className="border w-full p-2 mb-2"
//               value={couponCode}
//               onChange={(e) => {
//                 const code = e.target.value;
//                 setCouponCode(code);

//                 const selected = coupons.find(c => c.code === code);
//                 setSelectedCoupon(selected || null);
//               }}
//             >
//               <option value="">Select Coupon</option>
//               {coupons.map((c) => (
//                 <option key={c.id} value={c.code}>
//                   {c.code} ({c.discountPercentage}% OFF)
//                 </option>
//               ))}
//             </select>

//             {/* PAYMENT */}
//             <select
//               className="border w-full p-2 mb-3"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             >
//               <option value="CASH">Cash</option>
//               <option value="UPI">UPI</option>
//               <option value="POS">POS</option>
//             </select>

//             {paymentMethod !== "CASH" && (
//               <input
//                 placeholder="Transaction ID"
//                 className="border w-full p-2 mb-3"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//               />
//             )}

//             {/* QR */}
//             {paymentMethod === "UPI" && upiId && (
//               <div className="flex flex-col items-center my-3">
//                 <p className="text-sm font-semibold mb-2">
//                   Scan & Pay ₹{getDiscountedTotal()}
//                 </p>

//                 <QRCodeCanvas value={getUpiValue()} size={180} />

//                 <p className="text-xs mt-2 text-gray-500">{upiId}</p>
//               </div>
//             )}

//             {/* CATEGORIES */}
//             <div className="max-h-48 overflow-auto space-y-2">
//               {categories.map((cat) => (
//                 <div key={cat.id} className="flex justify-between border p-2 rounded">

//                   <div>
//                     <p className="font-semibold">{cat.name}</p>
//                     <p className="text-sm text-gray-500">
//                       ₹{cat.price} | Avl: {cat.remainingQuantity}
//                     </p>
//                   </div>

//                   <input
//                     type="number"
//                     min="0"
//                     max={cat.remainingQuantity}
//                     className="border w-16"
//                     onChange={(e) =>
//                       updateQuantity(cat.id, e.target.value)
//                     }
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* TOTAL */}
//             <div className="mt-3 font-bold">
//               Total: ₹{getTotalPrice()}
//             </div>

//             {/* DISCOUNTED */}
//             {selectedCoupon && (
//               <div className="text-green-600 font-bold">
//                 Discounted: ₹{getDiscountedTotal()}
//               </div>
//             )}

//             {/* BUTTON */}
//             <button
//               onClick={handleSellTickets}
//               className="w-full bg-blue-600 text-white py-2 mt-3 rounded"
//             >
//               Sell
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Organizer;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import {
  CalendarDays,
  MapPin,
  FileText,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Organizer = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // ===== SELL MODAL =====
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellEventId, setSellEventId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);

  // ===== COUPONS =====
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // ===== CUSTOMER FORM =====
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");

  // ===== UPI ID =====
  const [upiId, setUpiId] = useState("");

  // ===== SUCCESS MODAL =====
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // ================= FETCH EVENTS =================
  const fetchAssignedEvents = async () => {
    try {
      const res = await axios.get(
        "https://event-management-api-production-94b1.up.railway.app/api/events/assigned",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEvents(res.data);
    } catch {
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchAssignedEvents();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ================= WHATSAPP =================
  const sendWhatsApp = (booking) => {
    if (!booking?.customerPhone) {
      toast.error("Phone missing");
      return;
    }

    const phone = booking.customerPhone.replace(/\D/g, "");

    const message = `🎉 Booking Confirmed!

Booking ID: ${booking.bookingId}
Customer: ${booking.customerName}
Amount: ₹${booking.totalAmount}
Payment: ${booking.paymentStatus}

Thank you!`;

    const url = `https://web.whatsapp.com/send?phone=91${phone}&text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  // ================= OPEN MODAL =================
  const openSellModal = async (eventId) => {
    setSellEventId(eventId);
    setShowSellModal(true);
    setSelectedTickets([]);
    setUpiId("");
    setCoupons([]);
    setSelectedCoupon(null);

    setCustomerName("");
    setCustomerPhone("");
    setCouponCode("");
    setPaymentMethod("CASH");

    try {
      const catRes = await axios.get(
        `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${eventId}/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(catRes.data);

      const upiRes = await axios.get(
        `https://event-management-api-production-94b1.up.railway.app/api/event-config/${eventId}/upi`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUpiId(upiRes.data);

      const couponRes = await axios.get(
        `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${eventId}/coupons`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const validCoupons = couponRes.data.filter(
        (c) => new Date(c.validTill) > new Date()
      );

      setCoupons(validCoupons);

    } catch {
      toast.error("Failed to load event data");
    }
  };

  // ================= UPDATE QTY =================
  const updateQuantity = (categoryId, quantity) => {
    const qty = parseInt(quantity || 0);

    setSelectedTickets((prev) => {
      const existing = prev.find((t) => t.categoryId === categoryId);

      if (existing) {
        return prev.map((t) =>
          t.categoryId === categoryId ? { ...t, quantity: qty } : t
        );
      }

      return [...prev, { categoryId, quantity: qty }];
    });
  };

  // ================= TOTAL =================
  const getTotalPrice = () => {
    return selectedTickets.reduce((total, t) => {
      const cat = categories.find((c) => c.id === t.categoryId);
      return total + (cat ? cat.price * t.quantity : 0);
    }, 0);
  };

  // ================= DISCOUNT =================
  const getDiscountedTotal = () => {
    const total = getTotalPrice();

    if (!selectedCoupon) return total;

    const discount = (total * selectedCoupon.discountPercentage) / 100;
    return total - discount;
  };

  // ================= SELL API =================
  const handleSellTickets = async () => {
    if (!customerName || !customerPhone) {
      toast.error("Customer details required");
      return;
    }

    const payload = {
      customerName,
      customerPhone,
      couponCode,
      paymentMethod,
      selections: selectedTickets.filter((t) => t.quantity > 0),
    };

    try {
      const res = await axios.post(
        `https://event-management-api-production-94b1.up.railway.app/api/bookings`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookingData(res.data);
      setShowSellModal(false);
      setShowSuccessModal(true);

    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    }
  };

  // ================= UPI VALUE =================
  const getUpiValue = () => {
    if (!upiId) return "";
    return `upi://pay?pa=${upiId}&pn=Event&am=${getDiscountedTotal()}&cu=INR`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* EVENTS */}
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-5 rounded shadow">

            <h2 className="text-xl font-bold">{event.eventName}</h2>

            <div className="flex gap-2 items-center mt-2">
              <CalendarDays size={16} />
              {new Date(event.eventDate).toLocaleString()}
            </div>

            <div className="flex gap-2 items-center mt-2">
              <MapPin size={16} />
              {event.venueName}
            </div>

            <p className="mt-2 text-sm flex gap-2">
              <FileText size={16} />
              {event.eventDescription}
            </p>

            <button
              onClick={() => openSellModal(event.id)}
              className="mt-4 bg-green-600 text-white px-3 py-2 rounded"
            >
              Sell Tickets
            </button>
          </div>
        ))}
      </div>

      {/* SELL MODAL */}
      {showSellModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-[520px] relative">

            <button onClick={() => setShowSellModal(false)} className="absolute right-2 top-2">
              <X />
            </button>

            <h2 className="text-lg font-bold mb-3">Sell Tickets</h2>

            <input
              placeholder="Customer Name"
              className="border w-full p-2 mb-2"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              placeholder="Customer Phone"
              className="border w-full p-2 mb-2"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />

            <select
              className="border w-full p-2 mb-2"
              value={couponCode}
              onChange={(e) => {
                const code = e.target.value;
                setCouponCode(code);

                const selected = coupons.find(c => c.code === code);
                setSelectedCoupon(selected || null);
              }}
            >
              <option value="">Select Coupon</option>
              {coupons.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} ({c.discountPercentage}% OFF)
                </option>
              ))}
            </select>

            <select
              className="border w-full p-2 mb-3"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="CASH">Cash</option>
              <option value="UPI">UPI</option>
              <option value="POS">POS</option>
            </select>

            {paymentMethod === "UPI" && upiId && (
              <div className="flex flex-col items-center my-3">
                <p className="text-sm font-semibold mb-2">
                  Scan & Pay ₹{getDiscountedTotal()}
                </p>

                <QRCodeCanvas value={getUpiValue()} size={180} />

                <p className="text-xs mt-2 text-gray-500">{upiId}</p>
              </div>
            )}

            <div className="max-h-48 overflow-auto space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex justify-between border p-2 rounded">

                  <div>
                    <p className="font-semibold">{cat.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{cat.price} | Avl: {cat.remainingQuantity}
                    </p>
                  </div>

                  <input
                    type="number"
                    min="0"
                    max={cat.remainingQuantity}
                    className="border w-16"
                    onChange={(e) =>
                      updateQuantity(cat.id, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 font-bold">
              Total: ₹{getTotalPrice()}
            </div>

            {selectedCoupon && (
              <div className="text-green-600 font-bold">
                Discounted: ₹{getDiscountedTotal()}
              </div>
            )}

            <button
              onClick={handleSellTickets}
              className="w-full bg-blue-600 text-white py-2 mt-3 rounded"
            >
              Sell
            </button>

          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && bookingData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[400px] text-center">

            <h2 className="text-green-600 text-xl font-bold mb-2">
              Booking Successful ✅
            </h2>

            <p className="mb-4">
              Booking ID: <b>{bookingData.bookingId}</b>
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => sendWhatsApp(bookingData)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Send WhatsApp
              </button>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                OK
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Organizer;