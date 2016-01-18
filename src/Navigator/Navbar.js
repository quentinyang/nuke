const React = require('react');
import View from '../View.js';
import Styles from './Style';

const Navbar = React.createClass({

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
    let text = this.props.text;

    return (

        <View style={Styles.container}>
            {text}
        </View>

    );
  },
});

module.exports = Navbar;
