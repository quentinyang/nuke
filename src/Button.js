import React from 'react';

let Button = React.createClass({
    render: function() {
        let style = {
            ...{
                display: 'block',
                paddingTop: '10',
                paddingBottom: '10',
                fontSize: '16',
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#349ae9',
                borderRadius: '5'
            },
            ...this.props.style
        };
        return (
            <span style={style} onClick={this.props.onClick}>
                {this.props.children}
            </span>
        )
    }
    
});

module.exports = Button;