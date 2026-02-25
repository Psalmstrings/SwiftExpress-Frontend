export default function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((e, index) => (
        <div key={index} className="timeline-item">
          <div className="dot"></div>
          <div>
            <h4>{e.message}</h4>
            <p>{e.location}</p>
            <span>{e.date} — {e.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}