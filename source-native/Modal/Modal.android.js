import React, { PropTypes } from 'react-native'
import Portal from 'react-native/Libraries/Portal/Portal'
import InteractionManager from 'react-native/Libraries/Interaction/InteractionManager'
import Component from '../Component'
import View from '../View'
import { StyleSheet } from '../CommonApi'

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pos: 0
        }
    }
    componentWillMount() {
        this.tag = Portal.allocateTag();
    }
    componentDidMount() {
        if (this.props.visible) {
            Portal.showModal(this.tag, this._renderModal(this.props));
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.visible) {
            Portal.showModal(this.tag, this._renderModal(newProps));
            //this.animateUp(); //some animation display when modal open
        } else {
            //some animation display when modal close
            //this.animateDown();
            //InteractionManager.runAfterInteractions(()=> {
                Portal.closeModal(this.tag);
            //})
        }
    }
    render() {
        return <Portal onModalVisibilityChanged={this.props.onModalVisibilityChanged} />
    }
    _renderModal(newProps) {
        var children = newProps.children;
        let {style, animated} = this.props;
        if(1){
            return (
                <View key="modal" style={style ? style : styles.container}>
                    {children}
                </View>
            )
        } else {
            return /*(
                <Animated.View
                    style={[styles.container, {top: this.state.pos}]}
                >
                    {children}
                </Animated.View>
            )*/
        }
    }
}

Modal.propTypes= {
    visible: PropTypes.bool,
    //animated: PropTypes.bool,
    //style: ViewStylePropType,
    onModalVisibilityChanged: PropTypes.func.isRequired
};

Modal.defaultProps = {
    visible: false,
    animated: false,
    onModalVisibilityChanged: function() {}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#000',
        opacity: 0.5
    }
});

module.exports = Modal;