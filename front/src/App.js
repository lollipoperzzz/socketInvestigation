import React, { useState } from "react";
import io from "socket.io-client";
import './App.css';
import {Chat} from "./components/Chat";
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";


const ENDPOINT = "http://192.168.0.78:3001";
const socket = io.connect(ENDPOINT)

function App() {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [showChat, setShowChat] = useState(false)
    const [roomId, setRoomId] = useState('')

    const joinRoom = async () => {
        await socket.emit('joinRoom', roomId)
        setShowChat(true)
    }
  return (
    <div className="App">
        <header className="App-header">
            {!showChat ? (
                <>
            <Typography variant="h4">Join A Chat</Typography>
            <TextField
              type="text"
              placeholder="Username"
              color="primary"
              variant="outlined"
              onChange={event => setUsername(event.target.value)}
              value={username}
              className={classes.textField}
            />
          <TextField
              type="text"
              placeholder="Room ID"
              color="primary"
              variant="outlined"
              onChange={event => setRoomId(event.target.value)}
              value={roomId}
              className={classes.textField}
          />
          <Button
              onClick={joinRoom}
              disabled={!username || !roomId}
              variant="outlined"
              color="secondary"
              className={classes.button}
          >
              Join A Room
          </Button>
                </>
            ) : (
                <Chat socket={socket} username={username} roomId={roomId}/>
            )}
      </header>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
    textField: {
        '& .MuiOutlinedInput-input': {
            color: 'white'
        }
    },
    button: {
        '&.MuiButton-outlinedSecondary': {
            '&.Mui-disabled': {
                color: 'grey'
            },
        }
    }
}))

export default App;