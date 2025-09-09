import React from "react";

function AppointmentTable({ appointments, onDelete, onEdit }) {
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
        {appointments.map((appt, index) => (
          <tr key={index}>
            <td>{appt.name}</td>
            <td>{appt.age}</td>
            <td>{appt.phoneNumber}</td>
            <td>{appt.doctorName}</td>
            <td>{appt.gender}</td>
            <td>{appt.visitDate}</td>
            <td>{appt.visitTime}</td>
            <td>{appt.visitType}</td>
            <td>
              <button id="edit-btn" onClick={() => onEdit(index)}>Edit</button>
              <button id="delete-btn" onClick={() => onDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AppointmentTable;
