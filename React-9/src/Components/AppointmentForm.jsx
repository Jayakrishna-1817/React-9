import React from "react";

export default function AppointmentForm({ form, setForm, handleSubmit, isUpdating, resetForm }) {
  function handleChange(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Patient Name</label>
            <input id="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label>Age</label>
            <input id="age" value={form.age} onChange={handleChange} />
          </div>
          <div>
            <label>Phone Number</label>
            <input id="phone-number" value={form["phone-number"]} onChange={handleChange} />
          </div>
          <div>
            <label>Doctor Name</label>
            <input id="dr-name" value={form["dr-name"]} onChange={handleChange} />
          </div>
          <div>
            <label>Gender</label>
            <input id="gender" value={form.gender} onChange={handleChange} />
          </div>
          <div>
            <label>Visit Date</label>
            <input id="visit-date" type="date" value={form["visit-date"]} onChange={handleChange} />
          </div>
          <div>
            <label>Visit Time</label>
            <input id="visit-time" placeholder="e.g. 9:30 AM" value={form["visit-time"]} onChange={handleChange} />
          </div>
          <div>
            <label>Visit Type</label>
            <input id="visit-type" value={form["visit-type"]} onChange={handleChange} />
          </div>
        </div>

        <div className="btn-row">
          <button id="book-btn" type="submit">
            {isUpdating ? "Update Appointment" : "Book Appointment"}
          </button>
          {isUpdating && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
