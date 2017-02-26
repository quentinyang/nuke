import React, {Component} from 'react';

import PureRenderMixin from 'react-addons-pure-render-mixin';

class NukeComponent extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
       return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
    }
}

module.exports = NukeComponent;

