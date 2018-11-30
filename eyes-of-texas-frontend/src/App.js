import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import axios from 'axios'
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      event: null
    };
  }

  setToken = tokenVal => {
    this.setState({ token: tokenVal });
  }

  setEvent = eventVal => {
    this.setState({ event: eventVal});
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
      this.props.history.push("/login");
    })
    .catch(error => {
      alert("Could not Logout");
    });
  }

  render() {

    const childProps = {
      token: this.state.token,
      setToken: this.setToken,
      setEvent: this.setEvent,
      event: this.state.event
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
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
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
