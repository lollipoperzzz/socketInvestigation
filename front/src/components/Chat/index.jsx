import React, {useEffect, useState} from "react";
import {Box, Button, makeStyles, TextField} from '@material-ui/core'

export const Chat = (props) => {
    const { socket, username, roomId } = props
    const classes = useStyles()
    const [myMessage, setMyMessage] = useState('')
    const [messageList, setMessageList] = useState([])


    const onSendMessage = async () => {
        const messageData = {
            author: username,
            roomId,
            message: myMessage,
            time: new Date()
        }
        await socket.emit('send_message', messageData)
        setMessageList((list) => [...list, messageData])
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <Box className={classes.chatContainer}>
            <Box className={classes.chatHeader}>
                LiveChat
            </Box>
            <Box className={classes.chatBody}>
                {messageList.map((item) => <div>{item.message}</div>)}
            </Box>
            <Box className={classes.chatFooter}>
                <TextField
                    placeholder="Type a message..."
                    value={myMessage}
                    onChange={(e) => setMyMessage(e.target.value)}
                    className={classes.textField}
                    color="primary"
                />
                <Button
                    onClick={onSendMessage}
                    color="inherit"
                >
                    &#9658;
                </Button>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    chatHeader: {
        display: 'flex',
        justifyContent: 'center'
    },
    chatBody: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    chatFooter: {
        display: 'flex',
    },
    textField: {
        '& .MuiInputBase-input': {
          color: 'white'
        },
    }
}))