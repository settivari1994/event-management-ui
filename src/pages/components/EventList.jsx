import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  IndianRupee,
  Ticket,
  CalendarDays,
  UserPlus
} from "lucide-react";

export default function EventList() {

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // ➕ ASSIGN STATES (ADDED)
  const [organizers, setOrganizers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState("");

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    totalTickets: "",
    availableTickets: "",
    eventDate: ""
  });

  const token = localStorage.getItem("token");

  // 🔥 GET EVENTS
  const loadEvents = () => {
    axios.get("https://event-management-api-production-94b1.up.railway.app/api/events", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEvents(res.data))
    .catch(err => console.log(err));
  };

  // 🔥 GET ORGANIZERS (ADDED)
  const loadOrganizers = () => {
    axios.get("https://event-management-api-production-94b1.up.railway.app/auth/users/organizers", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrganizers(res.data))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    loadEvents();
    loadOrganizers();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 ADD EVENT
  const addEvent = () => {
    axios.post("https://event-management-api-production-94b1.up.railway.app/api/events", {
      ...form,
      price: Number(form.price),
      totalTickets: Number(form.totalTickets),
      availableTickets: Number(form.availableTickets)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      resetForm();
      loadEvents();
    })
    .catch(err => console.log(err));
  };

  // ✏️ OPEN EDIT
  const openEditModal = (event) => {
    setIsEdit(true);
    setEditId(event.id);

    setForm({
      name: event.name,
      location: event.location,
      price: event.price,
      totalTickets: event.totalTickets,
      availableTickets: event.availableTickets,
      eventDate: event.eventDate
    });

    setShowModal(true);
  };

  // ✏️ UPDATE EVENT
  const updateEvent = () => {
    axios.put(`https://event-management-api-production-94b1.up.railway.app/api/events/${editId}`, {
      ...form,
      price: form.price ? Number(form.price) : null,
      totalTickets: form.totalTickets ? Number(form.totalTickets) : null,
      availableTickets: form.availableTickets ? Number(form.availableTickets) : null,
      eventDate: form.eventDate || null
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      resetForm();
      loadEvents();
    })
    .catch(err => console.log(err));
  };

  // 🗑️ DELETE EVENT
  const deleteEvent = (id) => {
    if (!window.confirm("Delete this event?")) return;

    axios.delete(`https://event-management-api-production-94b1.up.railway.app/api/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => loadEvents())
    .catch(err => console.log(err));
  };

  // ➕ ASSIGN ORGANIZER (ADDED)
  const assignOrganizer = () => {
    axios.put(
      `https://event-management-api-production-94b1.up.railway.app/api/events/${selectedEventId}/assign/${selectedOrgId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(() => {
      setShowAssignModal(false);
      setSelectedOrgId("");
      setSelectedEventId(null);
      loadEvents();
    })
    .catch(err => console.log(err));
  };

  // 🔄 RESET FORM
  const resetForm = () => {
    setShowModal(false);
    setIsEdit(false);
    setEditId(null);

    setForm({
      name: "",
      location: "",
      price: "",
      totalTickets: "",
      availableTickets: "",
      eventDate: ""
    });
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold text-gray-700">
          🎉 Events Management
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Event
        </button>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {events.map((e) => (
          <div key={e.id} className="bg-white border rounded-xl p-5 shadow-md">

            <h3 className="text-lg font-bold text-blue-600">{e.name}</h3>

            <div className="flex items-center gap-2 mt-2">
              <MapPin size={16} /> {e.location}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <IndianRupee size={16} /> {e.price}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <Ticket size={16} /> {e.totalTickets}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <CalendarDays size={16} /> {e.eventDate}
            </div>

            {/* ASSIGNED INFO */}
            <p className="text-sm mt-2 text-green-600">
              {e.assignedAgent
                ? `Assigned: ${e.assignedAgent.username}`
                : "Not Assigned"}
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-4">

              {/* ASSIGN */}
              <button
                onClick={() => {
                  setSelectedEventId(e.id);
                  setShowAssignModal(true);
                }}
                className="text-green-600"
              >
                <UserPlus size={18} />
              </button>

              {/* EDIT */}
              <button onClick={() => openEditModal(e)} className="text-blue-600">
                <Pencil size={18} />
              </button>

              {/* DELETE */}
              <button onClick={() => deleteEvent(e.id)} className="text-red-600">
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[420px]">

            <h2 className="text-lg font-bold mb-4">
              {isEdit ? "Edit Event" : "Add Event"}
            </h2>

            {["name","location","price","totalTickets","availableTickets"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f}
                className="w-full border p-2 mb-2 rounded"
                value={form[f]}
                onChange={handleChange}
              />
            ))}

            <input
              name="eventDate"
              type="datetime-local"
              className="w-full border p-2 mb-2 rounded"
              value={form.eventDate}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-2">

              <button onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>

              <button
                onClick={isEdit ? updateEvent : addEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ASSIGN MODAL */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[350px]">

            <h2 className="text-lg font-bold mb-4">Assign Organizer</h2>

            <select
              className="w-full border p-2 mb-4 rounded"
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
            >
              <option value="">Select Organizer</option>
              {organizers.map(o => (
                <option key={o.id} value={o.id}>
                  {o.username}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={assignOrganizer}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Assign
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}