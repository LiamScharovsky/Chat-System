import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import { db } from '../firebase/firebaseConfig';
import { collection, doc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { AuthContext, useAuth } from '../Context/AuthProvider';
import { useData } from '../Context/DataProvider';
 

export const Home = () => {
    const messageBody = useRef('');
    const messageRec = useRef('');
    const [messageList, setMessageList] = useState([]);
    const [orderedMessages, setOrderedMessages] = useState([])
    const { currentUser } = useAuth( )
    const { messages, sendMessage } = useData()
    const handleSubmit = (e) => {
        e.preventDefault()

        let dataToSend = {
            body: messageBody.current.value,
            dateCreated: serverTimestamp(),
            receiver: messageRec.current.value,
            deleted: false,
            sender:currentUser.email
        }
        sendMessage(dataToSend)

        messageBody.current.value = ''
        messageRec.current.value = ''
    }
    useEffect(() => {
        setMessageList(messages)
    }, [messages])
    let newList = []
    for (let i = 0; i < messages.length; i ++){
        if (messages[i]['receiver'] == currentUser.email){
            newList.push(messages[i])
        }
    }
    console.log(newList)

  return (
      <div className="row">
          <div className="col-md-12">
              <h1>Hello, {currentUser.email}</h1>
              <form onSubmit={ handleSubmit  }>
                  <div className="row">
                      <div className="col-md-7">
                          <div className="form-group">
                              <input 
                                  ref= { messageBody }
                                  type="text"
                                  className="form-control"
                                  name="messageBody"
                                  placeholder="Write your message" />
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="form-group">
                              <input 
                                  ref = { messageRec }
                                  type="text"
                                  className="form-control"
                                  name="recepient"
                                  placeholder="Who are we messaging?" />
                          </div>
                      </div>
                      <div className="col-md-2">
                          <input type="submit" value="Send" className='btn btn-primary' />
                      </div>
                  </div>
              </form>
              <hr />
              <h1>Inbox</h1>

              <ul className="list-group">
                  {
                      newList.length !== 0 ?
                          newList.map(message => (
                              <li className="list-group-item">
                                  <p> From: {`${message.sender}`}</p>
                                  <div>
                                      <p>{message.body}
                                          <small>
                                              <span className='float-right'> {moment(message.date_created).fromNow()} </span>
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
