'use strict';

import React, { PropTypes } from 'react';
import Styles from './Style';
import View from '../View';
import Immutable from 'immutable';
import Component from '../Component';

class ListView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var { dataSource, renderRow, style, ...other } = this.props;
        var list = dataSource.map((item, index) => {
            return renderRow(item, index);
        });
        var styles = {
            ...Styles.list,
            ...style
        };

        return (
            <div style={{...styles}} {...other}>
                <div style={{...Styles.borderTop}}></div>
                {list}
                <div style={{...Styles.borderTop, ...Styles.borderBottom}}></div>
            </div>
        )
    }
}

ListView.propTypes = {
    dataSource: PropTypes.instanceOf(Immutable.List),
    renderRow: PropTypes.func.isRequired
}

module.exports = ListView;