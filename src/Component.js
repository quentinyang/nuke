import React from 'react'
var PureRenderMixin = require('react-addons-pure-render-mixin')

class Component extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
       return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
    }
}

export default Component;