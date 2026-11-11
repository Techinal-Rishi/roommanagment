import React, { useState, useContext } from 'react';
import RoomContext from "../context/rooms/RoomContext";

const Addroom = (props) => {
  const context = useContext(RoomContext);
  const { addRoom } = context;

  const [room, setRoom] = useState({ title: "", description: "", contact: "", place: "" });

  const handleClick = (event) => {
    event.preventDefault();
    addRoom(room.title, room.description, room.contact, room.place);
    setRoom({ title: "", description: "", contact: "", place: "" });
    props.showAlert("Added successfully!!", "success");
  };

  const onChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <div className="form-icon-bubble">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div>
          <h3 className="mb-1" style={{ fontSize: '1.4rem' }}>List a New Room</h3>
          <p className="text-muted small mb-0">Fill in the details below to add a room listing to your dashboard</p>
        </div>
      </div>
      <form onSubmit={handleClick}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label-custom">
              <i className="fa-solid fa-heading text-primary"></i> Room Title
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-pen"></i>
              <input
                type="text"
                value={room.title}
                className="form-control"
                id="title"
                name="title"
                placeholder="e.g. Spacious 2BHK Near Metro"
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="place" className="form-label-custom">
              <i className="fa-solid fa-location-dot text-primary"></i> Location / Place
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-map-pin"></i>
              <input
                type="text"
                value={room.place}
                className="form-control"
                id="place"
                name="place"
                placeholder="e.g. Downtown Sector 18"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="contact" className="form-label-custom">
              <i className="fa-solid fa-phone text-primary"></i> Contact Number
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-phone"></i>
              <input
                type="text"
                value={room.contact}
                className="form-control"
                id="contact"
                name="contact"
                placeholder="e.g. +1 234 567 890"
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="description" className="form-label-custom">
              <i className="fa-solid fa-align-left text-primary"></i> Description
            </label>
            <div className="input-icon-wrapper">
              <i className="fa-solid fa-file-lines"></i>
              <input
                type="text"
                value={room.description}
                className="form-control"
                id="description"
                name="description"
                placeholder="e.g. Fully furnished with AC, Wi-Fi & balcony..."
                onChange={onChange}
                minLength={5}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <small className="text-muted">
            <i className="fa-solid fa-circle-info me-1"></i>
            Title and description must be at least 5 characters long.
          </small>
          <button
            disabled={room.title.length < 5 || room.description.length < 5}
            type="submit"
            className="btn btn-gradient-submit"
          >
            <i className="fa-solid fa-plus-circle"></i> Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addroom;
