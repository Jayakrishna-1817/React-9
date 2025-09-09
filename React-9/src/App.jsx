import React, { useState } from "react";
import AppointmentForm from "./Components/AppointmentForm";
import AppointmentTable from "./Components/AppointmentTable";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Add or Update Appointment
  const handleSave = (appointment) => {
    if (editIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editIndex] = appointment;
      setAppointments(updatedAppointments);
      setEditIndex(null);
      showToast("Appointment updated successfully.");
    } else {
      setAppointments([...appointments, appointment]);
      showToast("Appointment booked successfully.");
    }
  };

  // Delete Appointment
  const handleDelete = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    showToast("Appointment deleted successfully.");
  };

  // Edit Appointment
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  // Toast message handler
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <div className="app">
      <h1 style={{ color: "black"}}>Doctor Appointment Booking</h1>
      <AppointmentForm
        onSave={handleSave}
        editData={editIndex !== null ? appointments[editIndex] : null}
      />

      {appointments.length > 0 && (
        <AppointmentTable
          appointments={appointments}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default App;
