import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import axios from 'axios'

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            username: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.username.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        axios.post('http://127.0.0.1:5000/v1/auth/register', {
            "email": this.state.email,
            "password": this.state.password,
            "username": this.state.username
        }, this.config)
            .then(response => {
                // handle success
                this.props.setToken(response.data['auth_token'])
                this.props.history.push("/");
            })
            .catch(error => {
                // handle error
                alert("Register Failed")
                this.setState({ isLoading: false });
                //console.log(error.response);
            });
    }

    render() {
        return (
            <div className="Register">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Register"
                        loadingText="Loading..."
                    />
                </form>
            </div>
        );
    }
}