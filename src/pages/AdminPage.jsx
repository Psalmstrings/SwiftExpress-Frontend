import { useState } from "react";
import "../index.css";

export default function AdminDashboard() {

  // ============================================================
  // CREATE STATES
  // ============================================================
  const [createData, setCreateData] = useState({
    trackingId: "",
    status: "In Transit",
    currentLocation: "",
    expectedDelivery: "",
    timelineMessage: "",
    timelineLocation: "",
  });

  // ============================================================
  // UPDATE STATES
  // ============================================================
  const [updateData, setUpdateData] = useState({
    trackingId: "",
    status: "",
    currentLocation: "",
    expectedDelivery: "",
    timelineMessage: "",
    timelineLocation: "",
    timelineStatus: "",
    timelineDate: "",
  });

  // ============================================================
  // HANDLE INPUT CHANGE
  // ============================================================
  const handleCreateChange = (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // ============================================================
  // CREATE TRACKING
  // ============================================================
  const createTracking = async () => {
    const {
      trackingId,
      status,
      currentLocation,
      expectedDelivery,
      timelineMessage,
      timelineLocation,
    } = createData;

    if (
      !trackingId ||
      !status ||
      !currentLocation ||
      !expectedDelivery ||
      !timelineMessage ||
      !timelineLocation
    ) {
      return alert("Please fill all create fields");
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
          status,
          date: now.toISOString().split("T")[0],
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
        setCreateData({
          trackingId: "",
          status: "In Transit",
          currentLocation: "",
          expectedDelivery: "",
          timelineMessage: "",
          timelineLocation: "",
        });
      } else {
        alert("Failed Creating Tracking");
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  // ============================================================
  // UPDATE TRACKING
  // ============================================================
 // ============================================================
// ADD NEW TIMELINE ENTRY ONLY
// ============================================================
const updateTracking = async () => {
  const {
    trackingId,
    timelineMessage,
    timelineLocation,
    timelineStatus,
    timelineDate,
  } = updateData;

  if (
    !trackingId ||
    !timelineMessage ||
    !timelineLocation ||
    !timelineStatus ||
    !timelineDate
  ) {
    return alert("Please fill all timeline fields");
  }

  const payload = {
    $push: {
      timeline: {
        message: timelineMessage,
        location: timelineLocation,
        status: timelineStatus,
        date: timelineDate,
      },
    },
  };

  try {
    const res = await fetch(
      `https://swiftexpress.onrender.com/api/tracking/update/${trackingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("New Timeline Entry Added Successfully!");

      setUpdateData({
        trackingId: "",
        status: "",
        currentLocation: "",
        expectedDelivery: "",
        timelineMessage: "",
        timelineLocation: "",
        timelineStatus: "",
        timelineDate: "",
      });
    } else {
      alert(data.message || "Failed Adding Timeline");
    }
  } catch (err) {
    alert("Server Error");
  }
};

  // ============================================================
  // UI
  // ============================================================
  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>

      {/* ================= CREATE ================= */}
      <section>
        <h3>Create Tracking Entry</h3>

        <input
          name="trackingId"
          placeholder="Tracking ID"
          value={createData.trackingId}
          onChange={handleCreateChange}
        />

        <input
          name="status"
          placeholder="Status"
          value={createData.status}
          onChange={handleCreateChange}
        />

        <input
          name="currentLocation"
          placeholder="Current Location"
          value={createData.currentLocation}
          onChange={handleCreateChange}
        />

        <input
          type="date"
          name="expectedDelivery"
          value={createData.expectedDelivery}
          onChange={handleCreateChange}
        />

        <h4>First Timeline Entry</h4>

        <input
          name="timelineMessage"
          placeholder="Timeline Message"
          value={createData.timelineMessage}
          onChange={handleCreateChange}
        />

        <input
          name="timelineLocation"
          placeholder="Timeline Location"
          value={createData.timelineLocation}
          onChange={handleCreateChange}
        />

        <button onClick={createTracking}>Create Tracking</button>
      </section>

      <hr />

      {/* ================= UPDATE ================= */}
      <section>
        <h3>Update Tracking</h3>

        <input
          name="trackingId"
          placeholder="Tracking ID"
          value={updateData.trackingId}
          onChange={handleUpdateChange}
        />

        <input
          name="status"
          placeholder="Status"
          value={updateData.status}
          onChange={handleUpdateChange}
        />

        <input
          name="currentLocation"
          placeholder="Current Location"
          value={updateData.currentLocation}
          onChange={handleUpdateChange}
        />

        <input
          type="date"
          name="expectedDelivery"
          value={updateData.expectedDelivery}
          onChange={handleUpdateChange}
        />

        <h4>Add Timeline Entry</h4>

        <input
          name="timelineMessage"
          placeholder="Timeline Message"
          value={updateData.timelineMessage}
          onChange={handleUpdateChange}
        />

        <input
          name="timelineLocation"
          placeholder="Timeline Location"
          value={updateData.timelineLocation}
          onChange={handleUpdateChange}
        />

        <input
          name="timelineStatus"
          placeholder="Timeline Status"
          value={updateData.timelineStatus}
          onChange={handleUpdateChange}
        />

        <input
          type="date"
          name="timelineDate"
          value={updateData.timelineDate}
          onChange={handleUpdateChange}
        />

        <button onClick={updateTracking}>Update Tracking</button>
      </section>
    </div>
  );
}