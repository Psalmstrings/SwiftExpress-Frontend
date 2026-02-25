import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

export default function TrackingPage() {
  const { trackingId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const API_URL = 

  const statusSteps = [
    "Pending",
    "Shipped",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    async function fetchTracking() {
      try {
        const res = await fetch(`https://swiftexpress.onrender.com/api/tracking/${trackingId}`);
        if (!res.ok) throw new Error(`Unable to fetch data (Status: ${res.status})`);

        const json = await res.json();

        // Convert timeline object → array if needed
        const timelineArray = Array.isArray(json.timeline)
          ? json.timeline
          : json.timeline
          ? [json.timeline]
          : [];

        setData({ ...json, timeline: timelineArray });
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchTracking();
  }, [trackingId]);

  if (loading) return <p className="loader">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!data) return <p>No tracking information found.</p>;

  const currentStepIndex = statusSteps.indexOf(data.status);
  const progressPercent =
    currentStepIndex >= 0
      ? (currentStepIndex / (statusSteps.length - 1)) * 100
      : 0;

  return (
    <div className="tracking-page">
      {/* Tracking ID */}
      <h2 className="tracking-id">Tracking Number: {data.trackingId}</h2>


      {/* Delivery Box */}
      <div className="delivery-box">
        <h3>Expected Delivery</h3>

        {data.expectedDelivery ? (
          <div className="delivery-info">
            <div className="date-block">
              <p className="day">
                {new Date(data.expectedDelivery).getDate()}
              </p>
              <p className="month-year">
                {new Date(data.expectedDelivery).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {new Date(data.expectedDelivery).getFullYear()}
              </p>
            </div>

            <div className="time-block">
              <p className="time">
                {data.timeline.time ? data.timeline.time : "Time not available"}
              </p>
            </div>
          </div>
        ) : (
          <p>No expected delivery date</p>
        )}

        <p className="desc">
          Your item is currently <b>{data.status}</b> at{" "}
          <b>{data.currentLocation}</b>.
        </p>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {data.timeline.length > 0 ? (
          data.timeline.map((event, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <p className="event-title">{event.message}</p>
                <p className="event-location">{event.location}</p>
                <p className="event-date">
                  {event.date} at {event.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No tracking updates yet.</p>
        )}
      </div>
    </div>
  );
}