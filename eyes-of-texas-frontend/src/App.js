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
    center: {lat: 30.284860, lng: -97.736679},
    zoom: 16
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
          text={'CS BUILDING'} 
        />
        <AnyReactComponent 
          lat={30.289148} 
          lng={-97.736512} 
          text={'RLM'} 
        />
        <AnyReactComponent 
          lat={30.286386} 
          lng={-97.739369} 
          text={'Main Building'} 
        />
        <AnyReactComponent 
          lat={30.286933} 
          lng={-97.741139} 
          text={'Texas Union'} 
        />
        <AnyReactComponent 
          lat={30.286396} 
          lng={-97.740309} 
          text={'FAC'} 
        />
        <AnyReactComponent 
          lat={30.290033} 
          lng={-97.735380} 
          text={'ETC'} 
        />
        <AnyReactComponent 
          lat={30.290227} 
          lng={-97.736046} 
          text={'CPE'} 
        />
        <AnyReactComponent 
          lat={30.284860} 
          lng={-97.736679} 
          text={'SAC'} 
        />
      </GoogleMapReact>

    );
  }
}

export default App;
