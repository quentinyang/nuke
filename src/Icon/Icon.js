import React from 'react';
import Styles from './Style';

let Icon = React.createClass({
    render: function() {
        let {value, style, ...props} = this.props;
        let styles = {
            ...Styles.iconfont
            ...style
        };
        return (
            <i style={styles} {...props}>{value}</i>
        );
    }

});

module.exports = Icon;