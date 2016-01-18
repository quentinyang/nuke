'use strict';

import React from 'react';
import PullToRefresh from './PullToRefresh';
var NATIVE_REF = 'swiperefreshlayout';

/**
 * React view that supports a single scrollable child view (e.g. `ScrollView`). When this child
 * view is at `scrollY: 0`, swiping down triggers an `onRefresh` event.
 * 
 * The style `{flex: 1}` might be required to ensure the expected behavior of the child component
 * (e.g. when the child is expected to scroll with `ScrollView` or `ListView`).
 */
var PullToRefreshView = React.createClass({
    mixins: [PullToRefresh(React)({
        resources: function(data) {
            _onRefresh()
        },
        enabled: function() {
            return this.props.enabled || false
        },
        eventDom: window
    })],

    propTypes: {
        /**
         * Whether the pull to refresh functionality is enabled
         */
        enabled: React.PropTypes.bool,
        /**
         * The colors (at least one) that will be used to draw the refresh indicator
         */
        // colors: React.PropTypes.arrayOf(ColorPropType),
        /**
         * The background color of the refresh indicator
         */
        // progressBackgroundColor: ColorPropType,
        /**
         * Whether the view should be indicating an active refresh
         */
        refreshing: React.PropTypes.bool,
        /**
         * Size of the refresh indicator, see PullToRefreshViewAndroid.SIZE
         */
        // size: React.PropTypes.oneOf(RefreshLayoutConsts.SIZE.DEFAULT, RefreshLayoutConsts.SIZE.LARGE),
    },

    // getInnerViewNode: function() {
    //     return this.refs[NATIVE_REF];
    // },

    // setNativeProps: function(props) {
    //     return this.refs[NATIVE_REF].setNativeProps(props);
    // },

    render: function() {
        return (
            <div
                enabled={this.props.enabled}
                onRefresh={this._onRefresh}
                ref={NATIVE_REF}
                refreshing={this.props.refreshing}
                style={this.props.style}>
                    {this.props.children}
                    {this.setLoadingDom()}
            </div>
        );
    },

    _onRefresh: function() {
        this.props.onRefresh && this.props.onRefresh();
        // this.refs[NATIVE_REF].setNativeProps({refreshing: !!this.props.refreshing});
    }
});

module.exports = PullToRefreshView;