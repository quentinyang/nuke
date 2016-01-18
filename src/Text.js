import React from 'react';

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