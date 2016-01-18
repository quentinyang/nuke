'use strict';

import React, { PropTypes } from 'react';

var ListView = React.createClass({

    propTypes: {
        dataSource: PropTypes.array.isRequired,
        renderRow: PropTypes.func.isRequired
    },

    render: function() {
        var { dataSource, renderRow } = this.props;
        var list = dataSource.map((item, index) => {
            return renderRow(item, index);
        });

        return (
            <div>
                {list}
            </div>
        )
    }
});

module.exports = ListView;