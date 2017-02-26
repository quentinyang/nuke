import React from 'react';

let Text = React.createClass({
    render: function() {
        let {onPress, onClick, children, ...props} = this.props;

        return (
            <span onClick={onPress || onClick}
                {...props}>
                {children}
            </span>
        )
    }
    
});

module.exports = Text;