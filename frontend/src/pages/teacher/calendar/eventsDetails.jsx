import { Roles } from "../../../store/slice/auth.slice.js";

const eventsDetails = ({ isOpen, onClose, eventData, role }) => {
  if (!isOpen) return null;

  const {
    title,
    description,
    start,
    end,
    class: className,
    hasConsent,
  } = eventData;

  // Correcting the date offset issue
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Invalid date:", dateStr, error);
      return "";
    }
  };

  return (
    <div className="background-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="close" onClick={onClose}>
          x
        </div>
        <div className="event-details-card">
          <h3>{title}</h3>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Start Date:</strong> {formatDate(start)}
          </p>
          <p>
            <strong>End Date:</strong> {formatDate(end)}
          </p>
          <p>
            <strong>Class:</strong> {className}
          </p>
          <p>
            <strong>Has Consent:</strong> {hasConsent ? "Yes" : "No"}
          </p>
          {role === Roles.TEACHER || role === Roles.MANAGER ? (
            <button>Edit Event</button>
          ) : (
            <button>Save to Favorites</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default eventsDetails;
