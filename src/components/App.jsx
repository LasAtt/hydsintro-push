import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import React from 'react';
import {Grid, Row, Col} from  'react-bootstrap';
import MessageContainer from './MessageContainer.jsx';

class App extends React.Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col className="header">
            <h2>Webchat</h2>
          </Col>
          <Col className="content">
            <MessageContainer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
