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
        let style = {
            ...{
                width: '100%',
                fontSize: '16',
                paddingLeft: '10',
                paddingRight: '10',
                paddingTop: '5',
                paddingBottom: '5',
                margin: '0',
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#d9d9d9',
                boxSizing:'border-box'
            },
            ...this.props.style
        };
        return (
            <input
            ref='input'
            style={style}
            type={type}
            defaultValue={this.props.defaultValue}
            value={this.props.value}
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            onFocus={this.onFocus}
            onBlur={this.props.onBlur}
            onChange={this.props.onChange} />
        )
    },
    onFocus: function(e) {
        this.refs.input.style.outline = 0;
        this.props.onFocus ? this.props.onFocus(e) : '';
    }
    
});

module.exports = TextInput;