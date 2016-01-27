import React, { PropTypes } from 'react'
import View from '../View.js';
import Styles from './Style'
import Combine from '../Combine'

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {transparent, visible, style, ...other} = this.props;
        let transparentStyle = transparent ? {backgroundColor: '#000', opacity: '0.33'} : {backgroundColor: '#eee'};
        let visibleStyle = visible ? {display: 'block'} : {display: 'none'};

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
                <View style={Combine(Styles.content, style)} {...other}>
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