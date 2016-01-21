import React from 'react';

let Image = React.createClass({
    render: function() {
        let {style, source, ...props} = this.props;
        let styles = {
            ...{
                width: '100%',
                border: '0',
                padding: '0',
                margin: '0'
            },
            ...style
        };
        let sources = source.uri? source.uri: source;
        return (
            <img style={styles} src={sources} {...props} />
        )
    }
    
});

module.exports = Image;