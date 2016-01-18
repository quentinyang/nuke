const React = require('react');
import View from '../View.js';
import Text from '../Text.js';
import Styles from './Style';

let LeftArrow = React.createClass({

  render() {
    return (

        <View style={Styles.leftArrow} onClick={this.props.onClick}>
            <Text style={Styles.fontIcon}>&lt;</Text>
            <Text style={Styles.arrowText}>{this.props.text}</Text>
        </View>

    );
  },
});

let RightArrow = React.createClass({

  render() {
    return (

        <View style={Styles.rightArrow} onClick={this.props.onClick}>
            <Text style={Styles.arrowText}>{this.props.text}</Text>
            <Text style={Styles.fontIcon}>&gt;</Text>
        </View>

    );
  },
});



let Navbar = React.createClass({

  getInitialState () {
    return {
        
    };
  },

  componentDidMount() {
    //TODO::mount
  },

  componeneDidUpdate() {
    //TODO::update
  },

  render() {
    var leftArrow = (this.props.onBack && typeof this.props.onBack === 'function') ? (<LeftArrow ref='back' text='Back' onClick={this.props.onBack}/>) : '';
    var rightArrow = (this.props.onForward && typeof this.props.onForward === 'function') ? (<RightArrow ref='forword' text='Forword' onClick={this.props.onForward}/>) : '';

    return (

        <View style={Styles.container}>
            {leftArrow}
            <Text>{this.props.text}</Text>
            {rightArrow}
            <View style={Styles.onepx}/>
        </View>

    );
  },
});

module.exports = Navbar;
