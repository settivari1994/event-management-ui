import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CreateEventModal from "./CreateEventModal";
import {
  FileText,
  CalendarDays,
  MapPin,
  X,
  MoreVertical
} from "lucide-react";

const EventSection = () => {

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  // UPI
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [upi, setUpi] = useState("");

  // Organisers
  const [organisers, setOrganisers] = useState([]);
  const [selectedOrganisers, setSelectedOrganisers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignEventId, setAssignEventId] = useState(null);

  // Categories
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryEventId, setCategoryEventId] = useState(null);
  const [categories, setCategories] = useState([]);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    price: "",
    totalQuantity: "",
    validTill: ""
  });

  // Coupons
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponEventId, setCouponEventId] = useState(null);
  const [coupons, setCoupons] = useState([]);

  const [couponForm, setCouponForm] = useState({
    code: "",
    discountPercentage: "",
    validTill: ""
  });

  const [editingCouponId, setEditingCouponId] = useState(null);

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://event-management-api-production-94b1.up.railway.app/api/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setEvents(res.data);
    } catch {
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= ORGANISERS =================
  const fetchOrganisers = async () => {
    try {
      const res = await axios.get(
        "https://event-management-api-production-94b1.up.railway.app/auth/users/organizers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setOrganisers(res.data);
    } catch {
      toast.error("Failed to load organisers");
    }
  };

  const openAssignModal = (id) => {
    setAssignEventId(id);
    setSelectedOrganisers([]);
    setShowAssignModal(true);
    fetchOrganisers();
  };

  const assignOrganisers = async () => {
    if (selectedOrganisers.length === 0) {
      toast.error("Select at least one organiser");
      return;
    }

    try {
      await axios.put(
        `https://event-management-api-production-94b1.up.railway.app/api/events/${assignEventId}/assign-organisers`,
        selectedOrganisers,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      toast.success("Organisers assigned");
      setShowAssignModal(false);
    } catch {
      toast.error("Failed to assign");
    }
  };

  // ================= UPI =================
  const saveUpi = async () => {
    if (!upi.trim()) {
      toast.error("Enter valid UPI ID");
      return;
    }

    try {
      await axios.post(
        `https://event-management-api-production-94b1.up.railway.app/api/event-config/${selectedEventId}/upi`,
        { upiId: upi },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      toast.success("UPI saved");
      setShowUpiModal(false);
      setUpi("");
    } catch {
      toast.error("Failed UPI");
    }
  };

  // ================= CATEGORY =================
  const openCategoryModal = async (eventId) => {
    setCategoryEventId(eventId);
    setShowCategoryModal(true);

    try {
      const res = await axios.get(
        `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${eventId}/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
  };

  const createCategory = async () => {
    const { name, price, totalQuantity, validTill } = categoryForm;

    if (!name || !price || !totalQuantity || !validTill) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(
        `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${categoryEventId}/categories`,
        categoryForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      toast.success("Category created");
      openCategoryModal(categoryEventId);

      setCategoryForm({
        name: "",
        price: "",
        totalQuantity: "",
        validTill: ""
      });

    } catch {
      toast.error("Failed category");
    }
  };

  // ================= COUPON =================
  const openCouponModal = async (eventId) => {
    setCouponEventId(eventId);
    setShowCouponModal(true);

    try {
      const res = await axios.get(
        `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${eventId}/coupons`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setCoupons(res.data);
    } catch {
      toast.error("Failed to load coupons");
    }
  };

  const handleCouponChange = (e) => {
    setCouponForm({ ...couponForm, [e.target.name]: e.target.value });
  };

  const saveCoupon = async () => {
    const { code, discountPercentage, validTill } = couponForm;

    if (!code || !discountPercentage || !validTill) {
      toast.error("All fields required");
      return;
    }

    try {
      if (editingCouponId) {
        await axios.put(
          `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${couponEventId}/coupons/${editingCouponId}`,
          couponForm,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        toast.success("Coupon updated");
      } else {
        await axios.post(
          `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${couponEventId}/coupons`,
          couponForm,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        toast.success("Coupon created");
      }

      setCouponForm({ code: "", discountPercentage: "", validTill: "" });
      setEditingCouponId(null);
      openCouponModal(couponEventId);

    } catch {
      toast.error("Failed coupon");
    }
  };

  const editCoupon = (c) => {
    setCouponForm({
      code: c.code,
      discountPercentage: c.discountPercentage,
      validTill: c.validTill?.slice(0, 16)
    });
    setEditingCouponId(c.id);
  };

  const deleteCoupon = async (id) => {
    try {
      await axios.delete(
        `https://event-management-api-production-94b1.up.railway.app/api/admin/events/${couponEventId}/coupons/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      toast.success("Deleted");
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Events</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Event
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">

        {events.map((event) => (
          <div key={event.id} className="shadow-lg p-4 rounded-xl bg-white relative">

            <div className="absolute top-2 right-2">
              <MoreVertical
                className="cursor-pointer"
                onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
              />

              {activeMenu === event.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">


                  <button
                    onClick={() => {
                      openCouponModal(event.id);
                      setActiveMenu(null);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Coupons
                  </button>

                  <button onClick={() => { setSelectedEventId(event.id); setShowUpiModal(true); setActiveMenu(null); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    UPI
                  </button>

                  <button onClick={() => { openAssignModal(event.id), setActiveMenu(null); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Assign Organisers
                  </button>

                  <button onClick={() => { openCategoryModal(event.id), setActiveMenu(null); }} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Add Ticket Categories
                  </button>

                </div>
              )}
            </div>

            <h3 className="font-bold text-lg">{event.eventName}</h3>

            <div className="flex gap-2 items-center text-gray-600 mt-2">
              <CalendarDays size={16} />
              {new Date(event.eventDate).toLocaleString()}
            </div>

            <div className="flex gap-2 items-center mt-2">
              <MapPin size={16} /> {event.venueName}
            </div>

            <p className="text-sm mt-2 flex gap-2">
              <FileText size={16} /> {event.eventDescription}
            </p>

          </div>
        ))}

      </div>

      {showModal && (
        <CreateEventModal
          onClose={(isCreated) => {
            setShowModal(false);
            if (isCreated) fetchEvents();
          }}
        />
      )}

      {/* CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-[500px] relative">
            <button onClick={() => setShowCategoryModal(false)} className="absolute top-2 right-2"><X /></button>
            <h2 className="font-bold mb-3">Ticket Categories</h2>

            <input name="name" placeholder="Name" className="border p-2 w-full mb-2" onChange={handleCategoryChange} />
            <input name="price" placeholder="Price" className="border p-2 w-full mb-2" onChange={handleCategoryChange} />
            <input name="totalQuantity" placeholder="Total Quantity" className="border p-2 w-full mb-2" onChange={handleCategoryChange} />

            <button onClick={createCategory} className="bg-green-600 text-white px-3 py-2 w-full rounded">
              Create Category
            </button>

            <div className="mt-4 max-h-40 overflow-auto">
              {categories.map((c) => (
                <div key={c.id} className="border p-2 mt-2 rounded">
                  {c.name} - ₹{c.price}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* UPI MODAL */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96 relative">
            <button onClick={() => setShowUpiModal(false)} className="absolute top-3 right-3"><X size={20} /></button>
            <h3 className="font-bold mb-3">Add UPI</h3>

            <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="Enter UPI" className="border w-full p-2" />

            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setShowUpiModal(false)}>Close</button>
              <button onClick={saveUpi} className="bg-green-600 text-white px-3 py-1">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ORGANISER MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-96 relative">
            <button onClick={() => setShowAssignModal(false)} className="absolute top-2 right-2"><X /></button>

            <h2 className="font-bold mb-3">Organisers List</h2>

            {organisers.map((o) => (
              <label key={o.id} className="flex justify-between items-center mb-2">
                <div>
                  <input
                    type="checkbox"
                    checked={selectedOrganisers.includes(o.id)}
                    onChange={() =>
                      setSelectedOrganisers((prev) =>
                        prev.includes(o.id)
                          ? prev.filter((x) => x !== o.id)
                          : [...prev, o.id]
                      )
                    }
                  />
                  <span className="ml-2">{o.username}</span>
                </div>

                {selectedOrganisers.includes(o.id) && (
                  <span className="text-green-600 text-sm font-semibold">
                    Assigned
                  </span>
                )}
              </label>
            ))}

            <button onClick={assignOrganisers} className="bg-indigo-600 text-white px-3 py-2 mt-3 w-full">
              Assign
            </button>
          </div>
        </div>
      )}

      {/* COUPON MODAL */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-[500px] relative">
            <button onClick={() => setShowCouponModal(false)} className="absolute top-2 right-2"><X /></button>

            <h2 className="font-bold mb-3">Coupons</h2>

            <input name="code" placeholder="Code" className="border p-2 w-full mb-2" onChange={handleCouponChange} value={couponForm.code} />
            <input name="discountPercentage" placeholder="Discount %" className="border p-2 w-full mb-2" onChange={handleCouponChange} value={couponForm.discountPercentage} />
            <input name="validTill" type="datetime-local" className="border p-2 w-full mb-2" onChange={handleCouponChange} value={couponForm.validTill} />

            <button onClick={saveCoupon} className="bg-yellow-600 text-white px-3 py-2 w-full rounded">
              {editingCouponId ? "Update Coupon" : "Create Coupon"}
            </button>

            <div className="mt-4 max-h-40 overflow-auto">
              {coupons.map((c) => (
                <div key={c.id} className="border p-2 mt-2 rounded flex justify-between">
                  <span>{c.code} - {c.discountPercentage}%</span>
                  <div className="flex gap-2">
                    <button onClick={() => editCoupon(c)}>Edit</button>
                    <button onClick={() => deleteCoupon(c.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EventSection;

