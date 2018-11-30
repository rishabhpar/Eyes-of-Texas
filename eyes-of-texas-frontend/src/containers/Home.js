import React, { Component } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import "./Home.css";
import Map from "../components/Map"

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

  changeEvent = event => {
    this.setState({ "eventData": event })
  }

  renderEvent() {
    if (this.state.eventData == null)
      return(<div></div>);
    return(
      <div className="container">
        <Row>
          <Col>
            <p>
              <b>{this.state.eventData['title']}</b>
              <br></br>
              {this.state.eventData['votes']} votes
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
      </div>
    );
  }

  renderMap() {
    return (
      <div>
        <Map props={this.props} eventFunc={this.changeEvent}></Map>
        renderEvent();
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