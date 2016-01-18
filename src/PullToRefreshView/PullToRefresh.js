function PullToRefresh(React) {
    return function(options) {
        return {
            initPullToRefresh() {
                var self = this;

                options.eventDom.on('scroll.PullToRefresh', function () {
                    var height = 0;
                    var $this = $(this);

                    if (self.props.refreshing || options.enabled.bind(self)()) {
                        return;
                    }
                    if (options.eventDom == window) {
                        height = 0 + document.documentElement.offsetHeight - $this.scrollTop() - window.innerHeight;
                    } else {
                        height = 0 + $this.attr('scrollHeight') - $this.attr('scrollTop') - $this.attr('clientHeight');
                    }
                    if(height <= 100) {
                        if ($.isFunction(options.resources)) {
                            options.resources.bind(self)()
                        }
                    }
                });
            },

            _reference: {
                styles: {
                    'width': '100%',
                    'height': '6rem',
                    'lineHeight': '6rem',
                    'textAlign': 'center',
                    'fontSize': '1.6rem',
                    'display': 'block'
                }
            },

            setLoadingDom() {
                let enabled = options.enabled.bind(this)()
                return enabled ? 
                    <a style={this._reference.styles}>不好意思，已经没有了...</a> : <a style={this._reference.styles}>加载中...</a>
            },

            componentDidUpdate() {
                let { enabled } = this.props
                if (enabled) {
                    options.eventDom.off('scroll.PullToRefresh')
                }
            },

            componentDidMount() {
                this.initPullToRefresh();
            },

            componentWillUnmount() {
                options.eventDom.off('scroll.PullToRefresh')
            }
        }
    }
}

module.exports = PullToRefresh;