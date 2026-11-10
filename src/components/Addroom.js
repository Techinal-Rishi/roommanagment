import React, { useState, useContext } from 'react'
import RoomContext from "../context/rooms/RoomContext"

const Addroom = (props) => {
     const context = useContext(RoomContext);
     const { addRoom } = context; // Ensure this matches your context function name (addRoom vs addroom)

     const [room, setRoom] = useState({ title: "", description: "", contact: "", place: "" });

     const handleClick = (event) => {
        event.preventDefault();
        addRoom(room.title, room.description, room.contact, room.place);
        setRoom({ title: "", description: "", contact: "", place: "" });
        props.showAlert("Added successfully!!", "success");
     }; 

     const onChange = (event) => {
        setRoom({ ...room, [event.target.name]: event.target.value });
     }

  return (
    <div>
      <div className="container my-3">
        <h1>Add a Room</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" value={room.title} className="form-control" id="title" name="title" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" value={room.description} className="form-control" id="description" name="description" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">Contact</label>
            <input type="text" value={room.contact} className="form-control" id="contact" name="contact" onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="place" className="form-label">Place</label>
            <input type="text" value={room.place} className="form-control" id="place" name="place" onChange={onChange} required />
          </div>
          <button disabled={room.title.length < 5 || room.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Room</button>
        </form>
      </div>
    </div>
  )
}

export default Addroom;