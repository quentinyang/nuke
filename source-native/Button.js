import React, { PropTypes, StyleSheet, Text, TouchableHighlight } from 'react-native'
import Component from '../Component'
/*import StyleSheetPropType from 'StyleSheetPropType';
import ViewStylePropTypes from 'ViewStylePropTypes';
import TextStylePropTypes from 'TextStylePropTypes';

let ViewStylePropType = StyleSheetPropType(ViewStylePropTypes);
let TextStylePropType = StyleSheetPropType(TextStylePropTypes);*/

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { label, disabled, containerStyle, itemStyle, onPress, onLongPress, ...other } = this.props;
        var stylesItem = [styles.item, itemStyle];
        disabled && stylesItem.push(styles.disabledItem);
        return (
            <TouchableHighlight
                style={[styles.container, containerStyle]}
                underlayColor="#fff"
                onPress={this.onPress.bind(this)}
                onLongPress={this.onLongPress.bind(this)}
                {...other}
            >
                <Text style={stylesItem}>{label}</Text>
            </TouchableHighlight>
        );
    }

    onPress() {
        var { disabled, onPress } = this.props;
        if(disabled) {
            return;
        }
        onPress && onPress();
    }

    onLongPress() {
        var { disabled, onLongPress } = this.props;
        if(disabled) {
            return;
        }
        onLongPress && onLongPress();
    }
}

Button.propTypes= {
    label: PropTypes.string,
    disable: PropTypes.bool,
    //containerStyle: ViewStylePropType,
    //itemStyle: TextStylePropType,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
};

Button.defaultProps = {
    disable: false,
    onPress: function() {},
    onLongPress: function() {}
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    item: {
        flex: 1,
        height: 40,
        lineHeight: 30,
        fontSize: 19,
        textAlign: 'center',
        backgroundColor: '#04C1AE',
        borderRadius: 10,
        borderWidth: 0,
        color: '#fff'
    },
    disabledItem: {
        backgroundColor: '#ccc',
    }
});

module.exports = Button