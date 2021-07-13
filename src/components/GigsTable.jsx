import React from "react";
import { Link } from "react-router-dom";

const GigsTable = ({ gigs }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Venue</th>
          <th>Country</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {gigs.map((gig) => (
          <tr key={gig._id}>
            <td>{gig.name}</td>
            <td>{gig.date}</td>
            <td>{gig.time}</td>
            <td>{gig.venue}</td>
            <td>{gig.country}</td>
            <td style={{ color: gig.status.color }}>{gig.status.title}</td>
            <td>
              <Link to={`/gigs/${gig._id}`}>
                <i
                  className="fa fa-pencil-square-o"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GigsTable;
