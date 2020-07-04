import React,{ useState, useEffect } from "react";
import { randomBytes } from 'crypto'
import { Redirect } from "react-router-dom"
import './style/create-room.css'

const CreateRoom = () => {
    const [roomId,setRoomId] = useState('')
    const [streamId, setStreamId] = useState(2) 
    const [room, setRoom] = useState(false)

    useEffect(() => {
        setRoomId(randomBytes(10).toString('hex'))
    }, [])

    if (room) {
        return ( <Redirect to={`/room/${roomId}/${streamId}`} /> )
    }

    return (
        <section id="create-room-page">
            <div id="create-room">
            <label htmlFor="room-id"> room id </label>
            <input type="text" value={roomId} disabled name="room-id"/><br/>
            <label htmlFor="stream-id"> select what u want to stream </label>
            <select name="stream-id" defaultValue="2" onChange={e => setStreamId(e.target.value)}>
                <option value="1"> share ur screen </option>
                <option value="2"> video call </option>
                <option value="3"> only audio </option>
                <option value="4"> only video </option>
            </select>
            <button onClick={() => setRoom(true)} id="btn"> 
                create room 
            </button>
            </div>
        </section>
    );
};

export default CreateRoom;
