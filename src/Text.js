import React from 'react';

let Text = React.createClass({
    render: function() {
        let {onPress, children, ...props} = this.props;

        return (
            <span onClick={onPress}
                {...props}>
                {children}
            </span>
        )
    }
    
});

module.exports = Text;