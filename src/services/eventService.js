import axios from "axios";

const BASE_URL = "http://localhost:8080/api/events";

// 🔥 THIS is the API call function
export const getAllEvents = () => {
  const token = localStorage.getItem("token");

  return axios.get(BASE_URL, {
  headers: {
    Authorization: `Bearer ${token}`
  }
  });
};


export const deleteEvent = (id) => {
  const token = localStorage.getItem("token");

  axios.delete(`http://localhost:8080/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    // refresh list after delete
    loadEvents();
  })
  .catch((err) => {
    console.log("Delete error:", err);
  });
};