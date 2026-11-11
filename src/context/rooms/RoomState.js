import React, { useState } from "react";
import RoomContext from "./RoomContext";

const RoomState = (props) => {
 const host = process.env.REACT_APP_HOST || "http://localhost:5000"; // Update with your backend URL/port if different
    const [rooms, setRooms] = useState([]);

    // 1. Get all Rooms
    const getRooms = async () => {
        try {
            const response = await fetch(`${host}/api/rooms/fetchallrooms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            setRooms(json);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    // 2. Add a Room
    const addRoom = async (title, description, contact, place) => {
        try {
            const response = await fetch(`${host}/api/rooms/addroom`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, contact, place })
            });

            const room = await response.json();
            if (response.ok) {
                setRooms(rooms.concat(room));
            } else {
                console.error("Failed to add room:", room);
            }
        } catch (error) {
            console.error("Error adding room:", error);
        }
    };

    // 3. Delete a Room (matches /deleteRoom/:id route)
    const deleteRoom = async (id) => {
        try {
            const response = await fetch(`${host}/api/rooms/deleteRoom/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            if (response.ok) {
                const newRooms = rooms.filter((room) => room._id !== id);
                setRooms(newRooms);
            } else {
                console.error("Failed to delete room:", json);
            }
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    };

    // 4. Edit a Room
    const editRoom = async (id, title, description, contact, place) => {
        try {
            const response = await fetch(`${host}/api/rooms/updateroom/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, contact, place })
            });
            // eslint-disable-next-line no-unused-vars
            const json = await response.json();

            if (response.ok) {
                let newRooms = JSON.parse(JSON.stringify(rooms));
                for (let index = 0; index < newRooms.length; index++) {
                    if (newRooms[index]._id === id) {
                        newRooms[index].title = title;
                        newRooms[index].description = description;
                        newRooms[index].contact = contact;
                        newRooms[index].place = place;
                        break;
                    }
                }
                setRooms(newRooms);
            }
        } catch (error) {
            console.error("Error updating room:", error);
        }
    };

    return (
        <RoomContext.Provider value={{ rooms, getRooms, addRoom, deleteRoom, editRoom }}>
            {props.children}
        </RoomContext.Provider>
    );
};

export default RoomState;