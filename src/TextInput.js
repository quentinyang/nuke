import React from 'react';

let TextInput = React.createClass({
    render: function() {
        let type = '';
        switch(this.props.keyboardType) {
            case 'numeric':
                type = 'tel';
            default:
                type = 'text';
        }

        let {style, ...other} = this.props

        let styles = {
            ...{
                width: '100%',
                height: '34',
                margin: '0',
                paddingLeft: '10',
                border: '0',
                fontSize: '16',
                boxSizing:'border-box'
            },
            ...style
        };

        

        return (
            <input
                style={{...styles}}
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