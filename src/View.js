import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

let View = React.createClass({
    PropTypes: {
        style: PropTypes.object
    },
    render() {
        let {
            ref,
            style,
            ...other,
        } = this.props;

        return (
            <div style={style}
                {...other}>
                {this.props.children}
            </div>
        )
    },
    
});

module.exports = View;