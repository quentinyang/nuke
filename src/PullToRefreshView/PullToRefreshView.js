'use strict';

import React, { Component, PropTypes } from 'react';
var NATIVE_REF = 'swiperefreshlayout';
var styles = {
    'width': '100%',
    'height': '6rem',
    'lineHeight': '6rem',
    'textAlign': 'center',
    'fontSize': '1.6rem',
    'display': 'block'
};

var eventDom = window

/**
 * React view that supports a single scrollable child view (e.g. `ScrollView`). When this child
 * view is at `scrollY: 0`, swiping down triggers an `onRefresh` event.
 * 
 * The style `{flex: 1}` might be required to ensure the expected behavior of the child component
 * (e.g. when the child is expected to scroll with `ScrollView` or `ListView`).
 */
class PullToRefreshView extends Component {
    constructor(props) {
        super(props);
    }

    // getInnerViewNode: function() {
    //     return this.refs[NATIVE_REF];
    // },

    // setNativeProps: function(props) {
    //     return this.refs[NATIVE_REF].setNativeProps(props);
    // },

    render() {
        return (
            <div
                enabled={this.props.enabled}
                ref={NATIVE_REF}
                refreshing={this.props.refreshing}
                style={this.props.style}>
                    {this.props.children}
                    {this.setLoadingDom()}
            </div>
        );
    }

    _onRefresh() {
        this.props.onRefresh && this.props.onRefresh();
        // this.refs[NATIVE_REF].setNativeProps({refreshing: !!this.props.refreshing});
    }

    initPullToRefresh() {
        var self = this;

        eventDom.addEventListener('scroll', function () {
            var height = 0;
            // var $this = $(this);

            if (self.props.refreshing || !self.props.enabled) {
                return;
            }

            if (eventDom == window) {
                height = 0 + document.documentElement.offsetHeight - window.scrollY - window.innerHeight;
            }/* else {
                height = 0 + $this.attr('scrollHeight') - $this.attr('scrollTop') - $this.attr('clientHeight');
            }*/

            if(height <= 100) {
                self._onRefresh();
            }
        });
    }

    setLoadingDom() {
        let { enabled } = this.props;

        return enabled ? 
            <a style={styles}>加载中...</a> : <a style={styles}>不好意思，已经没有了...</a>
    }

    componentDidUpdate() {
        let { enabled } = this.props
        if (enabled) {
            eventDom.removeEventListener('scroll')
        }
    }

    componentDidMount() {
        this.initPullToRefresh();
    }

    componentWillUnmount() {
        eventDom.removeEventListener('scroll')
    }
}

PullToRefreshView.propTypes = {
    /**
     * Whether the pull to refresh functionality is enabled
     */
    enabled: PropTypes.bool,
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
    refreshing: PropTypes.bool,
    /**
     * Size of the refresh indicator, see PullToRefreshViewAndroid.SIZE
     */
    // size: React.PropTypes.oneOf(RefreshLayoutConsts.SIZE.DEFAULT, RefreshLayoutConsts.SIZE.LARGE),
    onRefresh: PropTypes.func.isRequired
}

module.exports = PullToRefreshView;