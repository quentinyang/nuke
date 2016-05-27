'use strict';

import React, {PropTypes} from 'react';
import Portal from 'react-native/Libraries/Portal/Portal.js';
import InteractionManager from 'react-native/Libraries/Interaction/InteractionManager'
import Component from '../Component'
import View from '../View'
import { StyleSheet } from '../CommonApi'

class Modal extends Component{
    constructor(props) {
        super(props);
        this.portalTag = null;
    }

    componentWillMount() {
        this.portalTag = Portal.allocateTag();
    }

    componentWillUnmount() {
        Portal.closeModal(this.portalTag);
        this.portalTag = null;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.visible) {
            Portal.showModal(this.portalTag, this.renderModal(newProps));
        } else {
            Portal.closeModal(this.portalTag);
        }
    }

    componentDidUpdate(previousProps) {
        if (!previousProps.visible && this.props.visible) {
            if (this.props.onShow) {
                this.props.onShow();
            }
        } else if(previousProps.visible && !this.props.visible) {
            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        }
    }

    renderModal(newProps) {
        var modalBackgroundColorStyle = {
            backgroundColor: newProps.transparent ? 'transparent' : '#000000',
        };

        return (
            <View key={this.portalTag} style={[styles.container, modalBackgroundColorStyle]}>
                {this.props.children}
            </View>
        );
    }

    render() {
        return null;
    }
}

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
});

Modal.propTypes= {
    animated: PropTypes.bool,
    transparent: PropTypes.bool,
    visible: PropTypes.bool,
    onShow: PropTypes.func,
    onDismiss: PropTypes.func,
};

Modal.defaultProps = {
    animated: false,
    transparent: false,
    visible: false,
};

module.exports = Modal;