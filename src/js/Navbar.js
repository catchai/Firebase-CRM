import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth, signOut } from './Firebase/helpers';

class Navbar extends Component {
    constructor() {
        super();
        // Initial state
        this.state = {
            authenticated: false
        }
        // Bind events
        this.logUserOut = this.logUserOut.bind(this);
    }

    // On mount check auth status
    // set authenticated status
    componentWillMount() {
        let _this = this;
        auth().onAuthStateChanged(function(user) {
            if (user) {
                _this.setState({
                    authenticated: true
                });
            }
            else {
                _this.setState({
                    authenticated: false
                })
            }
        });
    }

    // Sign a user out
    logUserOut(e) {
        e.preventDefault();
        signOut();
    }

    // Display website navigation
    // Change links based on auth status
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Winking CRM</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <div className="ml-auto my-2 my-lg-0 from-inline">
                        {
                            this.state.authenticated === true ? (
                                <div>
                                    {/* <Link className="btn btn-outline-primary" to="/dashboard">Dashboard</Link> */}
                                    { /*<Link className="btn btn-link" to="/profile">Profile</Link> */ }
                                    <Link onClick={this.logUserOut} to="/signOut" className="btn btn-link">Sign out</Link>
                                </div>
                            ) : (
                                <div>
                                    <Link className="btn btn-outline-primary" to="/login">Login</Link>
                                    <Link className="btn btn-link" to="/register">Sign Up</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;