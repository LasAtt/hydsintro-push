import React from 'react'
import ReactDOM from 'react-dom'
import {Form, InputGroup, FormControl, Button} from 'react-bootstrap'

class MessageForm extends React.Component {

  state = {
    text: ''
  };

  textArea = null;

  submitOnEnter = (e) => {
    if (!e) return;
    if (e.keyCode === 13) {
      this.submitMessage(e)
    }
  };

  submitMessage = (e) => {
    e.preventDefault();
    this.props.handleSendMessage({ message: this.state.text });

    this.setState({text: ''});
    ReactDOM.findDOMNode(this.textArea).focus()
  };

  updateMessage = (e) => {
    this.setState({text: e.target.value})
  };

  render() {
    return (
      <Form onSubmit={this.submitMessage}>
        <InputGroup>
          <FormControl
            componentClass="textarea"
            className="textbox"
            placeholder="Enter message"
            onKeyUp={this.submitOnEnter}
            onChange={this.updateMessage}
            ref={(input) => this.textArea = input}
            value={this.state.text}
          />
          <InputGroup.Button>
            <Button type="submit" className="messagebutton" block>Send</Button>
          </InputGroup.Button>
        </InputGroup>
      </Form>
    )
  }
}

export default MessageForm;
