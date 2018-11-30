import React, { Component } from "react";
import { Row, Col, Badge, Alert, Button } from "react-bootstrap";
import "./Home.css";
import Map from "../components/Map"
import axios from 'axios'

export default class Home extends Component {

  renderLander() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Eyes of Texas</h1>
          <p>An inclusive event tracking experience</p>
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      "eventData": null
    }
  }

  changeEvent = (event, marker) => {
    this.setState({ "eventData": event })
    this.setState({ "marker": marker})
  }

  vote = event => {
    let t = this;
    axios.post('http://127.0.0.1:5000/v1/vote/' + this.state.eventData.id, {}, {
      "headers": {
        "Authorization": "Bearer " + this.props.token
      },
    })
      .then(response => {
        // handle success
        let newEvent = t.state.eventData;
        newEvent.votes = newEvent.votes + 1;
        newEvent.user_has_voted = true;
        t.state.marker.setState({event: newEvent})
        t.setState({eventData: newEvent})
      })
  }

  unvote = event => {
    let t = this;
    axios.post('http://127.0.0.1:5000/v1/unvote/' + this.state.eventData.id, {}, {
      "headers": {
        "Authorization": "Bearer " + this.props.token
      },
    })
      .then(response => {
        // handle success
        let newEvent = t.state.eventData;
        newEvent.votes = newEvent.votes - 1;
        newEvent.user_has_voted = false;
        t.state.marker.setState({event: newEvent})
        t.setState({eventData: newEvent})
      })
  }

  renderEvent() {
    if (this.state.eventData == null)
      return (<div></div>);
    return (
      <Alert>
        <div className="container">
          <Row>
            <Col>
              <h1><b>{this.state.eventData['title']}</b></h1>
              <p>
                <b>{this.state.eventData['votes']} votes</b>
                <br></br>
                Posted at {new Date(this.state.eventData['time_posted']).toLocaleString()} by {this.state.eventData['poster']}
              </p>
            </Col>
            <Col>{this.state.eventData['desc']}</Col>
          </Row>
          <Row>
            <h3>Happening at {new Date(this.state.eventData['time_of_event']).toLocaleString()}</h3>
          </Row>
          <Row>
            {this.state.eventData['categories'].map(category => <Badge variant="primary">{category}</Badge>)}
          </Row>
          <br></br>
          <Row>
            {this.state.eventData.user_has_voted ? <Button variant="primary" onClick={this.unvote}>Unvote</Button> : <Button variant="primary" onClick={this.vote}>Vote</Button>}
          </Row>
        </div>
      </Alert>
    );
  }

  renderMap() {
    return (
      <div>
        <Map token={this.props.token} eventFunc={this.changeEvent} upEvent={this.props.upEvent}></Map>
        {this.renderEvent()}
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.token == null ? this.renderLander() : this.renderMap()}
      </div>
    );
  }
}