let style = {
    tabsNavigator: {
        WebkitAlignItems: 'stretch',
        alignItems: 'stretch',
        display: '-ms-flexbox',
        display: 'flex',
        display: '-webkit-flex',
        WebkitJustifyContent: 'space-around',
        justifyContent: 'space-around',
        WebkitBackfaceVisibility: 'hidden',
        MozBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        backgroundColor: '#efeff4',
        color: '#222222',
        height: '44px',
        width: '100%',
        position: 'fixed',
        bottom: '0',
        zIndex: '20',
    },
    tabsTab: {
        WebkitAlignItems: 'center',
        alignItems: 'center',
        display: '-ms-flexbox',
        display: 'flex',
        display: '-webkit-flex',
        WebkitFlexFlow: 'column nowrap',
        MsFlexFlow: 'column nowrap',
        flexFlow: 'column nowrap',
        WebkitFlexGrow: '1',
        MsFlexGrow: '1',
        flexGrow: '1',
        WebkitJustifyContent: 'center',
        justifyContent: 'center',
        background: 'none transparent',
        border: '0 none',
        color: '#222222',
        cursor: 'pointer',
        lineHeight: '1',
        padding: '0 5px',
        position: 'relative',
        width: '100%',
        WebkitAppearance: 'none',
    },
    isSelected: {
        backgroundColor: 'transparent',
        color: '#007aff',
    },
    tabsIcon: {
        display: 'inline-block',
        lineHeight: '1',
        fontSize: '28px',
    },
    tabsLabel: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '11px',
        height: '16px',
        lineHeight: '16px'
    },
    iconColor: {
        color: '#007aff'
    }
};

module.exports = style;



