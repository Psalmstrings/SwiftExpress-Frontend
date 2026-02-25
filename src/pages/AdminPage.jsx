import { useState } from "react";
import "../index.css";

export default function AdminDashboard() {
  // CREATE States
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState("In Transit");
  const [currentLocation, setCurrentLocation] = useState("");
  const [expectedDelivery, setExpectedDelivery] = useState("");

  // TIMELINE fields for CREATE
  const [timelineMessage, setTimelineMessage] = useState("");
  const [timelineLocation, setTimelineLocation] = useState("");

  // UPDATE States
  const [updateTrackingId, setUpdateTrackingId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // -----------------------------------------------------------
  // CREATE TRACKING
  // -----------------------------------------------------------
  const createTracking = async () => {
    if (
      !trackingId ||
      !status ||
      !currentLocation ||
      !expectedDelivery ||
      !timelineMessage ||
      !timelineLocation
    ) {
      return alert("Please fill all fields");
    }

    const now = new Date();

    const payload = {
      trackingId,
      status,
      currentLocation,
      expectedDelivery,
      lastUpdated: now.toISOString(),
      timeline: [
        {
          message: timelineMessage,
          location: timelineLocation,
          date: now.toISOString().split("T")[0],
          time: now.toISOString().split("T")[1],
        },
      ],
    };

    try {
      const res = await fetch(`https://swiftexpress.onrender.com/api/tracking/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success || data.trackingId) {
        alert("Tracking Created Successfully!");
      } else {
        alert("Failed Creating Tracking");
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  // -----------------------------------------------------------
  // UPDATE TRACKING
  // -----------------------------------------------------------
  const updateTracking = async () => {
    if (!updateTrackingId || !updateStatus || !updateLocation || !updateMessage) {
      return alert("Please fill all update fields");
    }

    const now = new Date();

    const timelineEntry = {
      message: updateMessage,
      location: updateLocation,
      date: now.toISOString().split("T")[0],
      time: now.toISOString().split("T")[1],
    };

    const payload = {
      status: updateStatus,
      currentLocation: updateLocation,
      lastUpdated: now.toISOString(),
      $push: { timeline: timelineEntry },
    };

    try {
      await fetch(`https://swiftexpress.onrender.com/api/tracking/update/${updateTrackingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Tracking Updated Successfully!");
    } catch (err) {
      alert("Failed Updating");
    }
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>

      {/* CREATE SECTION */}
      <h3>Create Tracking Entry</h3>

      <input placeholder="Tracking ID" onChange={(e) => setTrackingId(e.target.value)} />
      <input
        placeholder="Status (e.g. In Transit)"
        onChange={(e) => setStatus(e.target.value)}
        defaultValue="In Transit"
      />
      <input
        placeholder="Current Location"
        onChange={(e) => setCurrentLocation(e.target.value)}
      />
      <input type="date" onChange={(e) => setExpectedDelivery(e.target.value)} />

      <h4>Add First Timeline Entry</h4>
      <input
        placeholder="Timeline Message"
        onChange={(e) => setTimelineMessage(e.target.value)}
      />
      <input
        placeholder="Timeline Location"
        onChange={(e) => setTimelineLocation(e.target.value)}
      />

      <button onClick={createTracking}>Create Tracking</button>

      <hr />

      {/* UPDATE SECTION */}
      <h3>Update Existing Tracking</h3>

      <input
        placeholder="Tracking ID"
        onChange={(e) => setUpdateTrackingId(e.target.value)}
      />
      <input
        placeholder="Update Status"
        onChange={(e) => setUpdateStatus(e.target.value)}
      />
      <input
        placeholder="New Location"
        onChange={(e) => setUpdateLocation(e.target.value)}
      />
      <input
        placeholder="Timeline Message"
        onChange={(e) => setUpdateMessage(e.target.value)}
      />

      <button onClick={updateTracking}>Update Tracking</button>
    </div>
  );
}