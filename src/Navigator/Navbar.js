const React = require('react');
import View from '../View.js';
import Text from '../Text.js';
import Icon from '../Icon/Icon.js';
import Styles from './Style';

let LeftArrow = React.createClass({

  render() {
    return (
        <View style={Styles.leftArrow} onClick={this.props.onClick}>
            <View style={Styles.leftArrowIcon}><Icon value="&#xe610;" style={Styles.arrowColor}/></View>
            <Text style={Styles.arrowText}>{this.props.text}</Text>
        </View>

    );
  },
});

let RightArrow = React.createClass({

  render() {
    return (

        <View style={Styles.rightArrow} onClick={this.props.onClick}>
            <View style={Styles.rightArrowIcon}><Icon value="&#xe610;" style={Styles.arrowColor}/></View>
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
