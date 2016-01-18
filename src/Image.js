import React from 'react';

let Image = React.createClass({
    render: function() {
        let style = {
            ...{
                width: '100%',
                border: '0',
                padding: '0',
                margin: '0'
            },
            ...this.props.style
        };
        let source = this.props.source.uri? this.props.source.uri: this.props.source;
        return (
            <img style={style} src={source} />
        )
    }
    
});

module.exports = Image;