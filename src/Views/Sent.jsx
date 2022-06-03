import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import { db } from '../firebase/firebaseConfig';
import { collection, doc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { AuthContext, useAuth } from '../Context/AuthProvider';
import { useData } from '../Context/DataProvider';


export const Sent = () => {
    const messageBody = useRef('');
    const messageRec = useRef('');
    const [messageList, setMessageList] = useState([]);
    const [orderedMessages, setOrderedMessages] = useState([])
    const { currentUser } = useAuth()
    const { messages, sendMessage, receiveMessage } = useData()


    
    const handleSubmit = (e) => {
        e.preventDefault()

        let dataToSend = {
            body: messageBody.current.value,
            dateCreated: serverTimestamp(),
            username: messageRec.current.value
        }
        sendMessage( dataToSend )
        receiveMessage( dataToSend )

        messageBody.current.value = ''
        messageRec.current.value = ''
    }
    useEffect(() => {
        setMessageList( messages )
    }, [messages])

    let newList = []
    for (let i = 0; i < messages.length; i++) {
        if (messages[i]['sender'] == currentUser.email) {
            newList.push(messages[i])
        }
    }


    return (
        <div className="row">
            <h1> Sent Items </h1>
            <div className="col-md-12">
                <ul className="list-group">
                    {
                        newList.length !== 0 ?
                            newList.map(message => (
                                <li key={message.id} className="list-group-item">
                                    <p> To: {`${message.receiver}`}</p>
                                    <div>
                                        <p>{message.body}
                                            <small>
                                                <span className='float-right'> {moment(message.dateCreated.toDate()).fromNow()} </span>
                                            </small>
                                        </p>
                                    </div>
                                </li>
                            )) :
                            <p> No Messages at the Moment</p>
                    }
                </ul>

            </div>
        </div>
    )
}
