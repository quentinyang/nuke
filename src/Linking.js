import React, { PropTypes } from 'react'
import { Route, Link } from 'react-router'
import { createHashHistory } from 'history'

const history = createHashHistory({
    queryKey: false
});

class Linking extends React.Component {
    getChildContext() {
        return {history: history};
    }
    render() {
        return (
            <Link
                style={this.props.style || {}}
                className={this.props.className || ''}
                to={this.props.to}
                query={this.props.query}
                hash={this.props.hash}
                state={this.props.state}
                activeStyle={this.props.activeStyle}
                activeClassName={this.props.activeClassName}
                onlyActiveOnIndex={this.props.onlyActiveOnIndex}
                onClick={this.props.onClick}
            >
            {this.props.children}
            </Link>
        );
    }
    /**
     * Add a handler to LinkingIOS changes by listening to the `url` event type
     * and providing the handler
     */
    static addEventListener(type, handler) {
        handler = type || handler;
        Linking.unlisten = history.listenBefore(handler);
    }

    /**
     * Remove a handler by passing the `url` event type and the handler
     */
    static removeEventListener(type, handler) {
        if(Linking.unlisten) {
            Linking.unlisten();
        }
    }

    /**
     * Try to open the given `url` with any of the installed apps.
     */
    static openURL(url) {
        if(Linking.canOpenURL(url)) {
            history.push(url);
        } else {
            console.log('can not open the url!');
        }
    }

    /**
     * Determine whether or not an installed app can handle a given URL.
     * The callback function will be called with `bool supported` as the only argument
     *
     * NOTE: As of iOS 9, your app needs to provide the `LSApplicationQueriesSchemes` key
     * inside `Info.plist`.
     */
    static canOpenURL(url, callback) {
        if(typeof url !== 'string') {
            console.log('Invalid url: should be a string');
            return false;
        }

        if(callback && typeof callback !== 'function') {
            console.log('A valid callback function is required');
            return false;
        }

        return callback ? callback() : true;
    }

    /**
     * If the app launch was triggered by an app link, it will pop the link url,
     * otherwise it will return `null`
     */
    static popInitialURL() {
        return null;
    }
}
Linking.childContextTypes = {
    history: React.PropTypes.object
}
Linking.unlisten = undefined;
module.exports = Linking
