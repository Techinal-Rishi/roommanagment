import React, { useEffect, useRef, useState, useContext } from 'react'
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
    //eslint-disable-next-line
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
  }

  const handleClick = (event) => {
    event.preventDefault();
    editRoom(room.id, room.etitle, room.edescription, room.econtact, room.eplace);
    refClose.current.click();
    props.showAlert("Updated Successfully!!", "success");
  }

  const onChange = (event) => {
    setRoom({ ...room, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Addroom showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Room</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={room.etitle} id="etitle" name="etitle" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" value={room.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="econtact" className="form-label">Contact</label>
                  <input type="text" className="form-control" value={room.econtact} id="econtact" name="econtact" onChange={onChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="eplace" className="form-label">Place</label>
                  <input type="text" className="form-control" value={room.eplace} id="eplace" name="eplace" onChange={onChange} required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={room.etitle.length < 5 || room.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Room</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Rooms</h1>
        <div className="container">
          {rooms && rooms.length === 0 && 'No Rooms to display'}
        </div>
        {Array.isArray(rooms) && rooms.map((singleRoom) => {
          return <RoomItem key={singleRoom._id} updateRoom={updateRoom} showAlert={props.showAlert} room={singleRoom} />;
        })}
      </div>
    </>
  )
}

export default Rooms;