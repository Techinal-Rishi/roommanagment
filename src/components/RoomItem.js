import React, { useContext } from "react";
import RoomContext from "../context/rooms/RoomContext";

const RoomItem = (props) => {
  const context = useContext(RoomContext);
  const { deleteRoom } = context;
  const { room, updateRoom } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{room.title}</h5>  
            <div>
              <span style={{ cursor: 'pointer' }} onClick={() => { 
                deleteRoom(room._id); 
                props.showAlert("Deleted Successfully!!", "success"); 
              }}>
                <i className="fa-solid fa-trash-can mx-2"></i>
              </span> 
              <span style={{ cursor: 'pointer' }} onClick={() => { updateRoom(room); }}>
                <i className="fa-solid fa-pen-to-square mx-2"></i> 
              </span>      
            </div>
          </div>
          <p className="card-text">{room.description}</p>
          <p className="card-text"><small className="text-muted">Place: {room.place}</small></p>
          <p className="card-text"><small className="text-muted">Contact: {room.contact}</small></p>       
        </div>
      </div>
    </div>
  );
};

export default RoomItem;