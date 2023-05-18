import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import * as actions from "../actions";
import StripeCheckoutForm from "./StripeCheckoutForm";

class Header extends Component {
    renderNavBar() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            default:
                return [
                    <li key="payment"><StripeCheckoutForm /></li>,
                    <li key="credit" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credit}</li>,
                    <li key="auth"><a href="/api/logout">Logout</a></li>
                ];
        };
    }

    render() {
        return <nav>
            <div className="nav-wrapper">
                <Link
                    to={this.props.auth ? "/surveys" : "/"}
                    className="left brand-logo"
                >
                    Emaily
                </Link>
                <ul className="right">
                    {this.renderNavBar()}
                </ul>
            </div>
        </nav>
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);