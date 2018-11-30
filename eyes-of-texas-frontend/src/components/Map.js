/*
 * GoogleMap hover example
 */
import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import Marker from './Marker.jsx';

import { K_SIZE } from './hover_styles.js';

export default class Map extends Component {
  //   static propTypes = {
  //     center: PropTypes.array,
  //     zoom: PropTypes.number,
  //     greatPlaceCoords: PropTypes.any
  //   };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 9,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    let t = this
    navigator.geolocation.getCurrentPosition(function (position) { 
      t.setState({"center": [position.coords.latitude, position.coords.longitude]})
    })
  }

  constructor(props) {
    super(props);

    this.state =  {
      "center": [30.267153, -97.743057]
    }
  }
  

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMap
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          center={this.state.center}
          zoom={this.props.zoom}
          bootstrapURLKeys={{ key: "AIzaSyBq7hr78P_D2vJS2WImC_veBLP4J7-m1rU" }}
          // instead of css hover (which sometimes is bad for map markers) (bad means inability to hover on markers placed under other markers)
          // you can use internal GoogleMap component hover algorithm
          // hover algorithm explained at x_distance_hover example
          hoverDistance={K_SIZE / 2}
        >
          <Marker lat={59.955413} lng={30.337844} text={'A'} eventFunc={this.props.eventFunc} /* Kreyser Avrora */ />
          <Marker {...this.props.greatPlaceCoords} text={'B'} eventFunc={this.props.eventFunc} /* road circle */ />
        </GoogleMap>
      </div>

    );
  }
}