import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

let View = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    },
    
});

module.exports = View;