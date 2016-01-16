import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
// import { style } from './style.css';

let Picker = React.createClass({
    render() {
        return (
            <div style={{}}>
            Picker
            </div>
        )
    },
    propTypes: {
        label: PropTypes.string
    }
});

module.exports = Picker