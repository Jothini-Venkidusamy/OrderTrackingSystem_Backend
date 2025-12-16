import './OrderTimeline.css';

const OrderTimeline = ({ currentStatus }) => {
  const statuses = ['Ordered', 'Packed', 'Shipped', 'Delivered'];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="timeline">
      {statuses.map((status, index) => (
        <div key={status} className="timeline-item">
          <div className={`timeline-dot ${index <= currentIndex ? 'active' : ''}`}>
            {index <= currentIndex ? '✓' : index + 1}
          </div>
          <div className="timeline-label">{status}</div>
          {index < statuses.length - 1 && (
            <div className={`timeline-line ${index < currentIndex ? 'active' : ''}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;
