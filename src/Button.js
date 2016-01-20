import React from 'react';

let Button = React.createClass({
    render: function() {
        let {children, style, ...props} = this.props;
        let styles = {
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
            ...style
        };
        return (
            <span style={styles} {...props}>
                {children}
            </span>
        )
    }
    
});

module.exports = Button;