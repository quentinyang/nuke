let Style = {
    container: {
        width: '100%',
        height: '100%'
    },
    mask: {
        animationDuration: '140ms',
        height: '100%',
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: '999'
    },
    content: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '27rem',
        height: '15rem',
        padding: '1.5rem',
        backgroundColor: '#fff',
        opacity: '0.95',
        borderRadius: '1.6rem',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: '1000'
    }
};

module.exports = Style