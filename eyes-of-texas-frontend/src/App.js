import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import axios from 'axios'
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      event: null,
      newEvents: null
    };
  }

  setToken = tokenVal => {
    this.setState({ token: tokenVal });
  }

  setEvent = eventVal => {
    this.setState({ event: eventVal });
  }

  selected = select => {
    let t = this;
    if (select != "all") {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Current location " + position.coords.latitude + " " + position.coords.longitude);
        t.setState({"center": [position.coords.latitude, position.coords.longitude]})
        console.log("TOKENNN " + t.state.token);
        axios.get("http://127.0.0.1:5000/v1/events", {
          "headers": { 
            "Authorization": "Bearer " + t.state.token
          },
          "params": {
            "lat": position.coords.latitude,
            "lng": position.coords.longitude,
            "rad": 10000,
            "cat": select
          }
        })
        .then(response => { 
          console.log('Setting')
          console.log(response.data.events)
          t.setState({"newEvents": response.data.events})
        })
      })
    }
    else {
      console.log("Reset")
      this.setState({newEvents: null});
    }
  
    
  }

  handleLogout = event => {
    console.log("Current token is " + this.state.token);
    axios.post("http://127.0.0.1:5000/v1/auth/logout", {}, {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Bearer " + this.state.token
      }
    })
      .then(response => {
        this.setToken(null);
        this.setState({upEvent: null})
        this.props.history.push("/login");
      })
      .catch(error => {
        alert("Could not Logout");
      });
  }

  upEvent = event => { 
    console.log("Calling upevent");
    return this.state.newEvents;
  }



  render() {

    const childProps = {
      token: this.state.token,
      setToken: this.setToken,
      setEvent: this.setEvent,
      event: this.state.event,
      upEvent: this.state.newEvents
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Eyes of Texas</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.token != null
                ? <Fragment>
                    <NavDropdown eventKey="4" title="Category" id="nav-dropdown" onSelect={this.selected}>
                      <MenuItem eventKey="all">All</MenuItem>
                      <MenuItem eventKey="food">Food</MenuItem>
                      <MenuItem eventKey="study">Study</MenuItem>
                      <MenuItem eventKey="party">Party</MenuItem>
                    </NavDropdown>
                    <LinkContainer to="/create">
                      <NavItem>Create</NavItem>
                    </LinkContainer>
                    <NavItem>Feed</NavItem> 
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                  </Fragment>
                : <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import axios from 'axios'
// import Login from './Login'

// const AnyReactComponent = ({ text }) => (
//   <div style={{
//     color: 'white', 
//     background: 'blue',
//     padding: '15px 10px',
//     display: 'inline-flex',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '100%',
//     transform: 'translate(-50%, -50%)'
//   }}>
//     {text}
//   </div>
// );

// var config = {
//   headers: {'Authorization': "bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDM0NTU0ODYsImlhdCI6MTU0MzM2OTA2Niwic3ViIjoxfQ.rvDUP3_AJ1qCtsadz_xXr_JIIFKmGWghthqZsEdt6aY"}
// };

// class App extends React.Component {
//   static defaultProps = {
//     center: {lat: 30.284860, lng: -97.736679},
//     zoom: 16
//   };

//   componentDidMount() {
//     axios.get('http://127.0.0.1:5000/v1/events?lat=33.058890&lng=-96.658260&cat=food&rad=0', config)
//     .then(function (response) {
//       // handle success
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .then(function () {
//       // always executed
//     });
//   }

//   render() {
//     return (

//        <Login></Login>

//     );
//   }
// }

// export default App;
