import React, { useEffect, useRef, useState, useContext } from 'react';
import RoomContext from "../context/rooms/RoomContext";
import RoomItem from './RoomItem';
import Addroom from './Addroom';
import { useNavigate } from 'react-router-dom';

const Rooms = (props) => {
  const context = useContext(RoomContext);
  const { rooms, getRooms, editRoom } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getRooms();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [room, setRoom] = useState({ id: "", etitle: "", edescription: "", econtact: "", eplace: "" });

  const updateRoom = (currentRoom) => {
    ref.current.click();
    setRoom({
      id: currentRoom._id,
      etitle: currentRoom.title,
      edescription: currentRoom.description,
      econtact: currentRoom.contact,
      eplace: currentRoom.place
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    editRoom(room.id, room.etitle, room.edescription, room.econtact, room.eplace);
    refClose.current.click();
    props.showAlert("Updated Successfully!!", "success");
  };

  const onChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  };

  const roomCount = Array.isArray(rooms) ? rooms.length : 0;

  return (
    <>
      {/* Welcome Hero Banner */}
      <div className="hero-banner">
        <div className="hero-pill-badge">
          <i className="fa-solid fa-sparkles"></i> Welcome to RoomEase
        </div>
        <h1 className="hero-title">
          Manage & Explore <span>Accommodations</span>
        </h1>
        <p className="hero-subtitle">
          Effortlessly publish, organize, and manage your room spaces with real-time updates.
        </p>
      </div>

      {/* Add Room Section */}
      <Addroom showAlert={props.showAlert} />

      {/* Hidden button for modal trigger */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Edit Room Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-content-custom">
            <div className="modal-header modal-header-custom">
              <h1 className="modal-title modal-title-custom fs-5" id="exampleModalLabel">
                <i className="fa-solid fa-pen-to-square text-primary"></i> Edit Room Details
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label-custom">
                    <i className="fa-solid fa-heading text-primary"></i> Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={room.etitle}
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eplace" className="form-label-custom">
                    <i className="fa-solid fa-location-dot text-primary"></i> Place
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={room.eplace}
                    id="eplace"
                    name="eplace"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="econtact" className="form-label-custom">
                    <i className="fa-solid fa-phone text-primary"></i> Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={room.econtact}
                    id="econtact"
                    name="econtact"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label-custom">
                    <i className="fa-solid fa-align-left text-primary"></i> Description
                  </label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={room.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer bg-light border-top-0 px-4 py-3">
              <button ref={refClose} type="button" className="btn btn-outline-secondary rounded-pill px-4" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                disabled={room.etitle.length < 5 || room.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-nav-primary"
              >
                <i className="fa-solid fa-floppy-disk me-1"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Listings Section */}
      <div className="my-4">
        <div className="section-header-box">
          <h2 className="section-title">
            <i className="fa-solid fa-layer-group text-primary"></i>
            <span>Your Listed Rooms</span>
          </h2>
          <span className="count-badge">
            {roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
          </span>
        </div>

        <div className="row">
          {rooms && rooms.length === 0 && (
            <div className="col-12">
              <div className="empty-state-card">
                <div className="empty-icon-circle">
                  <i className="fa-solid fa-house-chimney-crack"></i>
                </div>
                <h4 className="empty-title">No Rooms Listed Yet</h4>
                <p className="empty-desc">
                  Start by adding your first room listing using the form above. It will show up here instantly!
                </p>
              </div>
            </div>
          )}

          {Array.isArray(rooms) && rooms.map((singleRoom) => {
            return (
              <RoomItem
                key={singleRoom._id}
                updateRoom={updateRoom}
                showAlert={props.showAlert}
                room={singleRoom}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rooms;
