import React from 'react';

let TextInput = React.createClass({
    render: function() {
        let type = '',
            {style, keyboardType, ...other} = this.props;
        switch(keyboardType) {
            case 'numeric':
                type = 'tel';
                break;
            default:
                type = 'text';
        }

        let styles = {
            ...{
                width: '100%',
                height: '34',
                margin: '0',
                border: '0',
                fontSize: '16',
                boxSizing:'border-box'
            },
            ...style
        };

        return (
            <input
                style={styles}
                type={type}
                {...other}
            />
        )
    },
    onFocus: function(e) {
        this.refs.input.styles.outline = 0;
        this.props.onFocus ? this.props.onFocus(e) : '';
    }
    
});

module.exports = TextInput;