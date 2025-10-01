import { useState } from "react";

export default function StudentCard({ student }) {
  const [status, setStatus] = useState("");

  return (
    <div className="card h-100">
      <img src={student.photo} alt={student.name} className="card-img-top" />
      <div className="card-body">
        <p className="text-center text-muted mb-2">{student.id}</p>

        <div className="d-flex justify-content-between small mb-2">
          <span>{student.name}</span>
          <span>{student.location}</span>
        </div>

        <div className="d-flex gap-4 mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`status-${student.id}`}
              id={`absent-${student.id}`}
              value="absent"
              checked={status === "absent"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`absent-${student.id}`}>Absent</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`status-${student.id}`}
              id={`present-${student.id}`}
              value="present"
              checked={status === "present"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label className="form-check-label" htmlFor={`present-${student.id}`}>Present</label>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-warning btn-sm" onClick={() => alert(`${student.name}: ${status || 'no status'}`)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
