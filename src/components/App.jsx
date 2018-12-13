import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import React from 'react';
import {Grid, Row, Col} from  'react-bootstrap';
import Chat from './Chat/Chat.jsx';

class App extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col className="header">
            <h2>Webchat</h2>
          </Col>
          <Col className="content">
            <Chat />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
