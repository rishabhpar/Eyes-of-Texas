import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

class App extends React.Component {
  static defaultProps = {
    center: {lat: 30.2863743, lng: -97.7368889},
    zoom: 11
  };

  render() {
    return (
       <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBq7hr78P_D2vJS2WImC_veBLP4J7-m1rU" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent 
          lat={30.2863743} 
          lng={-97.7368889} 
          text={'GDC'} 
        />
      </GoogleMapReact>

    );
  }
}

export default App;
