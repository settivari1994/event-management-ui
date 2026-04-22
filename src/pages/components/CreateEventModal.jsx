import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateEventModal = ({ onClose }) => {
  const [form, setForm] = useState({
    eventName: "",
    eventDate: "",
    venueName: "",
    venueAddress: "",
    eventDescription: ""
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  useEffect(() => {
    let newErrors = {};

    if (!form.eventName) newErrors.eventName = "Event name is required";
    if (!form.eventDate) newErrors.eventDate = "Event date is required";
    if (!form.venueName) newErrors.venueName = "Venue name is required";
    if (!form.venueAddress) newErrors.venueAddress = "Venue address is required";
    if (!form.eventDescription) newErrors.eventDescription = "Description is required";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

const handleSubmit = async () => {
  if (!isValid) return;

  try {
    const response = await axios.post(
      "http://localhost:8080/api/events",
      form,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    console.log("Created Event:", response.data);
    toast.success("Event Created Successfully 🎉");



    onClose(true); // close modal
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data || "Failed to create event  "
    );

 

  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">
        
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>

        {/* Event Name */}
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          className="w-full border p-2 mb-1 rounded"
          onChange={handleChange}
        />
        {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}

        {/* Date */}
        <input
          type="datetime-local"
          name="eventDate"
          className="w-full border p-2 mt-3 mb-1 rounded"
          onChange={handleChange}
        />
        {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}

        {/* Venue Name */}
        <input
          type="text"
          name="venueName"
          placeholder="Venue Name"
          className="w-full border p-2 mt-3 mb-1 rounded"
          onChange={handleChange}
        />
        {errors.venueName && <p className="text-red-500 text-sm">{errors.venueName}</p>}

        {/* Address */}
        <input
          type="text"
          name="venueAddress"
          placeholder="Venue Address"
          className="w-full border p-2 mt-3 mb-1 rounded"
          onChange={handleChange}
        />
        {errors.venueAddress && <p className="text-red-500 text-sm">{errors.venueAddress}</p>}

        {/* Description */}
        <textarea
          name="eventDescription"
          placeholder="Event Description"
          className="w-full border p-2 mt-3 mb-1 rounded"
          onChange={handleChange}
        />
        {errors.eventDescription && (
          <p className="text-red-500 text-sm">{errors.eventDescription}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`px-4 py-2 rounded text-white ${
              isValid ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;