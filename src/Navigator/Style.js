let Style = {
    container: {
        height: '5rem',
        lineHeight: '5rem',
        width: '100%',
        zIndex: 30,
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
        fontSize: '1.7rem',
        position: 'absolute',
        top: 0,
    },
    leftArrow: {
        position:'absolute',
        textAlign: 'left',
        left: 0,
        top: 0,
        color: '#ff9d34',
    },
    arrowText: {
        display: 'inline-block',
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
        backgroundColor: '#d9d9d9',
        width: '100%',

    },
    leftArrowIcon: {
        display: 'inline-block',
        padding: '0 10px 0 30px',
        transform: 'rotate(180deg)',
        OTransform: 'rotate(180deg)',
        WebkitTransform: 'rotate(180deg)',
        MozTransform: 'rotate(180deg)'
    },
    rightArrowIcon: {
        display: 'inline-block',
        padding: '0 10px 0 5px'
    },
    arrowColor: {
        color: '#349ae9'
    }
};
module.exports = Style;