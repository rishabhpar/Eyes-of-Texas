/*
 * GoogleMap hover example
 */
import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import Marker from './Marker.jsx';
import axios from 'axios'

import { K_SIZE } from './hover_styles.js';

export default class Map extends Component {
  //   static propTypes = {
  //     center: PropTypes.array,
  //     zoom: PropTypes.number,
  //     greatPlaceCoords: PropTypes.any
  //   };

  static defaultProps = {
    center: [59.938043, 30.337157],
    zoom: 16,
    greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
  };

  shouldComponentUpdate = shouldPureComponentUpdate;


  componentDidMount() {
    let t = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Current location " + position.coords.latitude + " " + position.coords.longitude);
      t.setState({"center": [position.coords.latitude, position.coords.longitude]})
      console.log("TOKENNN " + t.props.token);
      axios.get("http://127.0.0.1:5000/v1/events", {
        "headers": { 
          "Authorization": "Bearer " + t.props.token
        },
        "params": {
          "lat": position.coords.latitude,
          "lng": position.coords.longitude,
          "rad": 10000
        }
      })
      .then(response => { 
        t.setState({"events": response.data.events})
      })
    })
  }

  constructor(props) {
    super(props);

    this.state =  {
      "center": [30.267153, -96.743057],
      "events": []
    }
  }

  _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)
  

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMap
          // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
          onClick={this._onClick}
          center={this.state.center}
          zoom={this.props.zoom}
          bootstrapURLKeys={{ key: "AIzaSyBq7hr78P_D2vJS2WImC_veBLP4J7-m1rU" }}
          // instead of css hover (which sometimes is bad for map markers) (bad means inability to hover on markers placed under other markers)
          // you can use internal GoogleMap component hover algorithm
          // hover algorithm explained at x_distance_hover example
          hoverDistance={K_SIZE / 2}
        >
          {(this.props.upEvent == null ? this.state.events : this.props.upEvent).map(event => <Marker key={event.id} lat={event.latitude} lng={event.longitude} text={event.votes} eventFunc={this.props.eventFunc} data={event} />)}
        </GoogleMap>
      </div>

    );
  }
}