import React from "react";

export default function AppointmentTable({ appointments, handleEdit, handleDelete, openActionFor, setOpenActionFor }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Patient Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Doctor</th>
          <th>Gender</th>
          <th>Visit Date</th>
          <th>Visit Time</th>
          <th>Visit Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((app) => (
          <tr key={app.id}>
            <td>{app.name}</td>
            <td>{app.age}</td>
            <td>{app["phone-number"]}</td>
            <td>{app["dr-name"]}</td>
            <td>{app.gender}</td>
            <td>{app["visit-date"]}</td>
            <td>{app["visit-time"]}</td>
            <td>{app["visit-type"]}</td>
            <td style={{ position: "relative" }}>
              <button
                id="action-btn"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenActionFor(openActionFor === app.id ? null : app.id);
                }}
              >
                ⋮
              </button>
              {openActionFor === app.id && (
                <div className="action-menu">
                  <div id="edit-btn" onClick={() => { handleEdit(app); setOpenActionFor(null); }}>
                    Edit
                  </div>
                  <div id="delete-btn" onClick={() => handleDelete(app.id)}>
                    Delete
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
