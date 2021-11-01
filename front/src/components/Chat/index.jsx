import React, {useEffect, useState} from "react";
import {Box, Button, makeStyles, TextField} from '@material-ui/core'
import {MessageSeparator, ChatContainer, MainContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import moment from "moment";


export const Chat = (props) => {
    const { socket, username, roomId } = props
    const classes = useStyles()
    const [myMessage, setMyMessage] = useState('')
    const [messageList, setMessageList] = useState([])


    const onSendMessage = async () => {
        if(myMessage) {
            const messageData = {
                author: username,
                roomId,
                message: myMessage,
                time: moment().format('HH:mm')
            }
            await socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData])
            setMyMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div style={{ position: "relative", height: "100%" }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {messageList.map((item) =>
                            <Message model={{
                              message: item.message,
                              sentTime: item.time,
                              sender: item.author,
                              direction: username === item.author ? 'outgoing' : 'incoming'
                            }}>
                                   <Message.Footer sender={item.author} sentTime={item.time} />
                            </Message>
                        )}
                    </MessageList>
                    <MessageInput
                        value={myMessage}
                        className={classes.textInput}
                        onChange={setMyMessage}
                        placeholder="Type message here"
                        onSend={onSendMessage}
                        attachButton={false}
                        autoFocus
                    />
                </ChatContainer>
            </MainContainer>
        </div>
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
    },
    textInput: {
        textAlign: 'initial'
    }
}))