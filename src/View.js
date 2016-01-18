import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

let View = React.createClass({
    PropTypes: {
        style: PropTypes.object
    },
    render() {
        let style = this.props.style;
        
        return (
            <div style={style}>
                {this.props.children}
            </div>
        )
    },
    
});

module.exports = View;