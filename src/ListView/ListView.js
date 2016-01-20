'use strict';

import React, { PropTypes } from 'react';
import Styles from './Style';
import View from '../View';

var ListView = React.createClass({

    propTypes: {
        // dataSource: PropTypes.array.isRequired,
        renderRow: PropTypes.func.isRequired
    },

    render: function() {
        var { dataSource, renderRow, style, ...other } = this.props;
        var list = dataSource.map((item, index) => {
            return renderRow(item, index);
        });
        var styles = {
            ...Styles.list,
            style
        };

        return (
            <div style={{...styles}} {...other}>
                <div style={{...Styles.borderTop}}></div>
                {list}
                <div style={{...Styles.borderTop, ...Styles.borderBottom}}></div>
            </div>
        )
    }
});

module.exports = ListView;