import React, { useState } from "react";
import io from "socket.io-client";
import './App.css';
import {Chat} from "./components/Chat";
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";


const ENDPOINT = "http://localhost:3001";
const socket = io.connect(ENDPOINT)

export const WelcomePage = () => {
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('')

    const joinRoom = () => {
        socket.emit('joinRoom', roomId)
    }
    return (
        <div className="App">
            <header className="App-header">
                <Typography variant="h4">Join A Chat</Typography>
                <TextField
                    type="text"
                    placeholder="John..."
                    color="primary"
                    variant="outlined"
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                />
                <TextField
                    type="text"
                    placeholder="Room ID"
                    color="primary"
                    variant="outlined"
                    onChange={event => setRoomId(event.target.value)}
                    value={roomId}/>
                <Button
                    onClick={joinRoom}
                    disabled={!username || !roomId}
                    variant="outlined"
                    color="secondary"
                >
                    Join A Room
                </Button>
                <Chat socket={socket} username={username} roomId={roomId}/>
            </header>
        </div>
    );
}

