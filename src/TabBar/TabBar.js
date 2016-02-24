'use strict';

import React, { PropTypes } from 'react';
import Styles from './Style';
import View from '../View';
import Icon from '../Icon/Icon';
import Immutable from 'immutable';
import Component from '../Component';

class TabBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { data, style, ...other } = this.props

        let wrapStyle = {
            ...Styles.tabsNavigator,
            ...style
        }

        let list = data.map((item, index) => {
            let isSelected = item.get('isSelected')
            let selectedStyle = Styles.tabsTab

            if (isSelected) {
                selectedStyle = {
                    ...Styles.tabsTab,
                    ...Styles.isSelected
                }
            }

            return (
                <View style={selectedStyle} key={index}>
                    <View style={Styles.tabsIcon}>
                        <Icon value={item.get('iconValue')}/>
                    </View>
                    <View style={Styles.tabsLabel}>{item.get('label')}</View>
                </View>
            )
        })

        return (
            <View style={wrapStyle}>
                {list}
            </View>
        )
    }
}

/*[{
    iconValue: '',
    label: '',
    isSelected: ''
}]*/

TabBar.propTypes = {
    data: PropTypes.instanceOf(Immutable.List)
}

module.exports = TabBar;