import React from 'react';
import { render } from 'react-dom';

let Text = React.createClass({
    render: function() {
        return (
            <span style={this.props.style} onClick={this.props.onPress}>
                {this.props.children}
            </span>
        )
    }
    
});

module.exports = Text;