import React from 'react';
import {Text} from 'react-native';
import Component from './Component'

class TextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, style, ...props} = this.props;

        return (
            <Text allowFontScaling={false} style={[{fontFamily: 'Helvetica',fontSize: 16, color: '#3e3e3e'}, style]} {...props}>
            {children}
            </Text>
        )
    }
}

module.exports = TextComponent;