import { useState } from "react";

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    class: "",
    hasConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventData);
  };

  return (
    isOpen && (
      <div className="background-overlay" onClick={onClose}>
        <div className="modal-window" onClick={(e) => e.stopPropagation()}>
          <div className="close" onClick={onClose}>
            x
          </div>
          <form className="form-event" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Class:</label>
              <input
                type="text"
                name="class"
                value={eventData.class}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Has Consent:</label>
              <input
                type="checkbox"
                name="hasConsent"
                checked={eventData.hasConsent}
                onChange={handleChange}
              />
            </div>
            <button className="submit-button" type="submit">
              Save Event
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EventModal;
