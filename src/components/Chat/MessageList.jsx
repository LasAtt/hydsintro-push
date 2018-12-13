import React from 'react'
import { ListGroup } from 'react-bootstrap'

import Message from './Message.jsx'

const MessageList = ({messages}) => (
  <div>
    <ListGroup id="chat">
      {messages.map((message, index) =>
        <Message
          key={index}
          text={message}
        />
      )}
    </ListGroup>
  </div>
);


export default MessageList
