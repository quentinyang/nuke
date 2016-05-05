import React, { Text } from 'react-native';
import Component from './Component'

class TextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, ...props} = this.props;

        return (
            <Text allowFontScaling={false} {...props}>
            {children}
            </Text>
        )
    }
}

module.exports = TextComponent;