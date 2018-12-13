import React from 'react'
import {ListGroupItem} from 'react-bootstrap'

const Message = ({ text }) => (
  <ListGroupItem>
    {text}
  </ListGroupItem>
);

export default Message
