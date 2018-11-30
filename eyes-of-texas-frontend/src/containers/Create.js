import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import SimpleMarker from "../components/SimpleMarker"
import LoaderButton from "../components/LoaderButton";
import "./Create.css";
import GoogleMap from 'google-map-react';
import axios from 'axios'

export default class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            desc: "",
            lng: 0,
            lat: 0,
            categories: "",
            time_event: null,
            title: ""
        };
    }

    handleChange = event => {
        if (event.target.id == "categories") {
            this.setState({categories: event.target.value.split(",")})
        }
        else {
            this.setState({
                [event.target.id]: event.target.value
            });
        }
    }

    config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + this.props.token
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        let data = {
            "title":  this.state.title,
            "time_event": this.state.time_event,
            "desc": this.state.desc,
            "lng": this.state.lng,
            "lat": this.state.lat,
            "categories": this.state.categories
        }

        console.log(data)

        axios.post('http://127.0.0.1:5000/v1/events', data, this.config)
            .then(response => {
                // handle success
                console.log(response)
                this.props.history.push("/");
            })
            .catch(error => {
                // handle error
                alert("Create  Failed")
                this.setState({ isLoading: false });
                //console.log(error.response);
            });
    }

    _onClick = ({x, y, lat, lng, event}) =>  {
        this.setState({lat: lat, lng: lng})
        console.log(lat)
        console.log(lng)
    }
    
    render() {
        return (
            <div className="create_event">
                <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMap
                // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
                onClick={this._onClick}
                center={[30.2832184, -97.7381365]}
                zoom={15}
                bootstrapURLKeys={{ key: "AIzaSyBq7hr78P_D2vJS2WImC_veBLP4J7-m1rU" }}>
                <SimpleMarker lat={this.state.lat} lng={this.state.lng}></SimpleMarker>
                </GoogleMap>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="title" bsSize="large">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            autoFocus
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="desc" bsSize="large">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            value={this.state.desc}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="categories" bsSize="large">
                        <ControlLabel>Categories</ControlLabel>
                        <FormControl
                            value={this.state.categories}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="time_event" bsSize="large">
                        <ControlLabel>Time of Event</ControlLabel>
                        <FormControl
                            value={this.state.time_event}
                            onChange={this.handleChange}
                            placeholder="2018-12-01T19:30:00Z"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create Event"
                        loadingText="Creating…"
                    />
                </form>
            </div>
        );
    }
}