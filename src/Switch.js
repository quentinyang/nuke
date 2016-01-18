import React from 'react';

let Switch = React.createClass({
    render: function() {
        let outSwitch, inSwitch;
        if(this.props.value) {
            outSwitch = {
                backgroundColor: this.props.onTintColor || '#4cd964',
                borderColor: this.props.onTintColor || '#4cd964'
            };
            inSwitch = {
                right: '1'
            };
        } else {
            outSwitch = {
                backgroundColor: this.props.tintColor || '#fff',
                borderColor: '#e6e6e6'
            };
            inSwitch = {
                left: '1'
            };
        }
        let outStyle = {
            ...{
                position: 'relative',
                width: '50',
                height: '30',
                backgroundColor: '#4cd964',
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#4cd964',
                borderRadius: '20',
                boxSizing: 'border-box'
            },
            ...this.props.style,
            ...outSwitch
        };
        let inStyle = {
            ...{
                position: 'absolute',
                top: '1',
                width: '26',
                height: '26',
                backgroundColor: this.props.thumbTintColor || '#fff',
                borderWidth: '1',
                borderStyle: 'solid',
                borderColor: '#eee',
                borderRadius: '50%',
                boxSizing: 'border-box'
            },
            ...inSwitch
            
        };
        return (
            <div style={outStyle} value={this.props.value} onClick={this.handleClick}>
                <div style={inStyle}></div>
            </div>
        )
    },
    handleClick: function() {
        if(this.props.disabled) return;
        this.props.onValueChange(!this.props.value);
    }
    
});

module.exports = Switch;