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
        zIndex: '4',
        borderTop: '0.1rem solid #bfbfc3',
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
        color: '#ADABB1',
        cursor: 'pointer',
        lineHeight: '1',
        padding: '0 5px',
        position: 'relative',
        width: '100%',
        WebkitAppearance: 'none',
    },
    isSelected: {
        backgroundColor: 'transparent',
        color: '#349ae9',
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
        lineHeight: '16px',
        WebkitFontSmoothing: 'antialiased'
    },
    iconColor: {
        color: '#349ae9',
        fontSize: '24px'
    }
};

module.exports = style;



