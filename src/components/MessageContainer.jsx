import React from 'react'
import ScrollArea from 'react-scrollbar'
import { messaging } from '../util/firebase';
import MessageList from './MessageList.jsx'

class MessageContainer extends React.Component {

  state = {
    messages: [],
  };

  componentDidMount() {
    messaging.onMessage((message) => {
      this.setState({ messages: this.state.messages.concat([message]) })
    })
  }

  render() {
    return (
      <React.Fragment>
        <ScrollArea
          speed={0.8}
          className="chat"
        >
          <MessageList
            messages={this.state.messages}
          />
        </ScrollArea>
      </React.Fragment>
    );
  }
}

export default MessageContainer
