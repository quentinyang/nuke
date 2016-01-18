import React, { PropTypes } from 'react'
import View from '../View.js';
import Styles from './Style'

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let transparentStyle = this.props.transparent ? {backgroundColor: '#000', opacity: '0.33'} : {backgroundColor: '#eee'};
        let visibleStyle = this.props.visible ? {display: 'block'} : {display: 'none'};

        let containerStyle = {
            ...Styles.container,
            ...visibleStyle
        };

        let maskStyle = {
            ...Styles.mask,
            ...transparentStyle
        };

        return (
            <View style={containerStyle}>
                <View style={maskStyle}/>
                <View style={Styles.content}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

Modal.propTypes = {
    animated: PropTypes.bool,
    onDismiss: PropTypes.func,
    transparent: PropTypes.bool,
    visible: PropTypes.bool
};
Modal.defaultProps = {
    animated: false,
    onDismiss: null,
    transparent: true,
    visible: false
};
module.exports = Modal