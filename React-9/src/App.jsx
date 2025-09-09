import React, { useState, useRef, useEffect } from "react";
import AppointmentForm from "./Components/AppointmentForm";
import AppointmentTable from "./Components/AppointmentTable";
import ToastMessage from "./Components/ToastMessage";
import "./App.css";

export default function App() {
  const emptyForm = {
    id: null,
    name: "",
    age: "",
    "phone-number": "",
    "dr-name": "",
    gender: "",
    "visit-date": "",
    "visit-time": "",
    "visit-type": "",
  };

  const initialAppointments = [
    {
      id: 1,
      name: "Alice Johnson",
      age: "29",
      "phone-number": "9876543210",
      "dr-name": "Dr. Smith",
      gender: "Female",
      "visit-date": "2025-09-20",
      "visit-time": "09:30 AM",
      "visit-type": "Consultation",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      age: "35",
      "phone-number": "9123456780",
      "dr-name": "Dr. Patel",
      gender: "Male",
      "visit-date": "2025-09-22",
      "visit-time": "05:45 PM",
      "visit-type": "Follow-up",
    },
  ];

  const [form, setForm] = useState(emptyForm);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [toasts, setToasts] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const nextIdRef = useRef(3);

  const [openActionFor, setOpenActionFor] = useState(null);

  // Toast helper
  function pushToast(message, type = "info", ttl = 3000) {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ttl);
  }

  // Validation
  function isPhoneValid(phone) {
    return /^[0-9]{10}$/.test(phone.trim());
  }

  function anyFieldEmpty(f) {
    return [
      "name",
      "age",
      "phone-number",
      "dr-name",
      "gender",
      "visit-date",
      "visit-time",
      "visit-type",
    ].some((k) => !f[k] || f[k].toString().trim() === "");
  }

  // Handlers
  function handleSubmit(e) {
    e.preventDefault();

    if (anyFieldEmpty(form)) {
      pushToast("All fields are required.", "error");
      return;
    }
    if (!isPhoneValid(form["phone-number"])) {
      pushToast("Invalid phone number", "error");
      return;
    }

    // Removed time validation

    if (isUpdating && form.id != null) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === form.id ? { ...form } : app))
      );
      pushToast("Appointment updated successfully.", "success");
      resetForm();
      return;
    }

    const newAppointment = { ...form, id: nextIdRef.current++ };
    setAppointments((prev) => [...prev, newAppointment]);
    pushToast("Appointment booked successfully.", "success");
    resetForm();
  }

  function handleEdit(app) {
    setForm({ ...app });
    setIsUpdating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    setAppointments((prev) => prev.filter((p) => p.id !== id));
    pushToast("Appointment deleted successfully.", "success");
    setOpenActionFor(null);
    if (isUpdating && form.id === id) resetForm();
  }

  function resetForm() {
    setForm(emptyForm);
    setIsUpdating(false);
  }

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!e.target.closest(".action-menu") && !e.target.closest("#action-btn")) {
        setOpenActionFor(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="app">
      <h1>Doctor Appointment Booking</h1>

      <AppointmentForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        isUpdating={isUpdating}
        resetForm={resetForm}
      />

      <ToastMessage toasts={toasts} />

      <AppointmentTable
        appointments={appointments}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        openActionFor={openActionFor}
        setOpenActionFor={setOpenActionFor}
      />
    </div>
  );
}
