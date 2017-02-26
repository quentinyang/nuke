import React, { Component, PropTypes } from 'react';

let Tel = React.createClass({
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
            <a style={style} href={'tel:' + this.props.tel}
                {...other}>
                {this.props.children}
            </a>
        )
    },
    
});

module.exports = Tel;