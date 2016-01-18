let Style = {
    container: {
        height: '4.4rem',
        lineHeight: '4.4rem',
        width: '100%',
        zIndex: 30,
        textAlign: 'center',
        backgroundColor: '#efeff4',
        fontSize: '1.7rem',
        position: 'absolute',
        top: 0,
    },

    leftArrow: {
        position:'absolute',
        textAlign: 'left',
        left: 0,
        top: 0,
        color: '#007aff',
    },
    fontIcon: {
        color: '#007aff',
        display: 'inline-block',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        fontSize: '2.4rem',
        verticalAlign: 'top',
        lineHeight: 'inherit',
    },
    arrowText: {
        display: 'inline-block',
        verticalAlign: 'middle',//TODO::top
        fontSize: 'inherit',
        lineHeight: 'inherit',
    },
    
    rightArrow: {
        position:'absolute',
        textAlign: 'right',
        right: 0,
        top: 0,
        color: '#007aff',
    },

    onepx: {
        display: 'block',
        height: '0.1rem',
        backgroundColor: '#b2b2b2',
        width: '100%',

    }


};
module.exports = Style;