import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

let View = React.createClass({
    PropTypes: {
        style: PropTypes.object
    },
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    },
    
});

module.exports = View;