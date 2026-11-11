import React, { useContext } from "react";
import RoomContext from "../context/rooms/RoomContext";

const RoomItem = (props) => {
  const context = useContext(RoomContext);
  const { deleteRoom } = context;
  const { room, updateRoom } = props;

  return (
    <div className="col-md-6 col-lg-4 my-3">
      <div className="room-card">
        <div className="room-card-header">
          <div className="room-avatar-badge">
            <i className="fa-solid fa-door-open"></i>
          </div>
          <div className="card-action-group">
            <button
              type="button"
              className="action-btn action-btn-edit"
              title="Edit Room"
              onClick={() => { updateRoom(room); }}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              className="action-btn action-btn-delete"
              title="Delete Room"
              onClick={() => { 
                deleteRoom(room._id); 
                props.showAlert("Deleted Successfully!!", "success"); 
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>

        <div className="room-card-body">
          <h5 className="room-card-title">{room.title}</h5>
          <p className="room-card-description">{room.description}</p>

          <div className="room-meta-group">
            <div className="room-meta-item">
              <span className="meta-icon-tag meta-icon-place">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <span><strong>Place:</strong> {room.place}</span>
            </div>
            <div className="room-meta-item">
              <span className="meta-icon-tag meta-icon-contact">
                <i className="fa-solid fa-phone"></i>
              </span>
              <span><strong>Contact:</strong> {room.contact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
