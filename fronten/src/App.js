import { mean, truncate, zipWith } from 'lodash';
import SockJS from 'sockjs-client';
import stomp from 'stompjs/lib/stomp.js';
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    messages: []
  };

  componentDidMount() {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = stomp.Stomp.over(socket);
    client.debug = () => {};
    let arrivalTimes = [];
    let smallArrivalTimes = [];
    let mediumArrivalTimes = [];
    let largeArrivalTimes = [];
    let timesTaken = [];
    let timesTakenSmall = [];
    let timesTakenMedium = [];
    let timesTakenLarge = [];
    client.connect(
      {},
      () => {
        client.subscribe('/topic/push50', message => {
          arrivalTimes = [];
          timesTaken = [];
        });
        client.subscribe('/topic/push50/payload', message => {
          const ts = Date.now();
          const body = JSON.parse(message.body);
          this.setState({ messages: this.state.messages.concat([truncate(body.message, 100)]) });
          timesTaken.push(ts - body.time);
          arrivalTimes.push(ts)
        });
        client.subscribe('/topic/push50/finish', message => {
          const averageTime = mean(timesTaken);
          const intervalRate = mean(zipWith(arrivalTimes.slice(1), arrivalTimes, (a, b) => a-b).filter(a => !isNaN(a)));
          console.log(`For push type 50: \n  average time taken for messages: ${averageTime}ms \n  inter arrival rate: ${intervalRate}ms`)
        });
        client.subscribe('/topic/push25', message => {
          arrivalTimes = [];
          timesTakenSmall = [];
          timesTakenMedium = [];
          timesTakenLarge = [];
        });
        client.subscribe('/topic/push25/payload', message => {
          const ts = Date.now();
          const body = JSON.parse(message.body);
          this.setState({ messages: this.state.messages.concat([truncate(body.message, 100)]) });

          switch (body.size) {
            case "small":
              timesTakenSmall.push(ts - body.time);
              smallArrivalTimes.push(ts);
              break;
            case "medium":
              timesTakenMedium.push(ts - body.time);
              mediumArrivalTimes.push(ts);
              break;
            case "large":
              timesTakenLarge.push(ts - body.time);
              largeArrivalTimes.push(ts);
              break;
            default:
              break;
          }
          arrivalTimes.push(ts)
        });
        client.subscribe('/topic/push25/finish', message => {
          const smallIntervalRate = mean(zipWith(smallArrivalTimes.slice(1), smallArrivalTimes, (a, b) => a-b).filter(a => !isNaN(a)));
          const mediumIntervalRate = mean(zipWith(mediumArrivalTimes.slice(1), mediumArrivalTimes, (a, b) => a-b).filter(a => !isNaN(a)));
          const largeIntervalRate = mean(zipWith(largeArrivalTimes.slice(1), largeArrivalTimes, (a, b) => a-b).filter(a => !isNaN(a)));
          console.log(`For push type 25 (small): \n  average time taken for messages: ${mean(timesTakenSmall)}ms\n  inter arrival rate: ${smallIntervalRate}ms`)
          console.log(`For push type 25 (medium): \n  average time taken for messages: ${mean(timesTakenMedium)}ms\n  inter arrival rate: ${mediumIntervalRate}ms`)
          console.log(`For push type 25 (large): \n  average time taken for messages: ${mean(timesTakenLarge)}ms\n  inter arrival rate: ${largeIntervalRate}ms`)
        });
      }
    );

  }

  render() {
    return (
      <div className="App">
        <h1>Received messages</h1>
        <div className="messages">
          {this.state.messages.map((message, index) =>
            <p key={index}>{message}</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
