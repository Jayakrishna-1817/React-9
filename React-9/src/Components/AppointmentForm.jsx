import React, { useState, useEffect } from "react";

function AppointmentForm({ onSave, editData }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    doctorName: "",
    gender: "",
    visitDate: "",
    visitTime: "",
    visitType: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, age, phoneNumber, doctorName, gender, visitDate, visitTime, visitType } = formData;

    if (!name || !age || !phoneNumber || !doctorName || !gender || !visitDate || !visitTime || !visitType) {
      showToast("All fields are required.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      showToast("Invalid phone number");
      return false;
    }

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    if (!timeRegex.test(visitTime)) {
      showToast("Invalid time format (e.g. 9:30 AM)");
      return false;
    }

    return true;
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData({
        name: "",
        age: "",
        phoneNumber: "",
        doctorName: "",
        gender: "",
        visitDate: "",
        visitTime: "",
        visitType: "",
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-grid">
        <input id="name" name="name" placeholder="Patient Name" value={formData.name} onChange={handleChange} />
        <input id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <input id="phone-number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
        <input id="dr-name" name="doctorName" placeholder="Doctor Name" value={formData.doctorName} onChange={handleChange} />
        <input id="gender" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} />
        <input id="visit-date" name="visitDate" type="date" value={formData.visitDate} onChange={handleChange} />
        <input id="visit-time" name="visitTime" placeholder="Visit Time (e.g. 9:30 AM)" value={formData.visitTime} onChange={handleChange} />
        <input id="visit-type" name="visitType" placeholder="Visit Type" value={formData.visitType} onChange={handleChange} />

        <button id="book-btn" type="submit" className="form-btn">
          {editData ? "Update Appointment" : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
