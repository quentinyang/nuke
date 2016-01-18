let style = {
    container: {

    },
    list: {
        margin: 0,
        padding: 0,
        position: 'fixed',
        backgroundColor: '#fff', 
        width: '100%',
        height: '15rem',
        overflow: 'hidden',
    },
    item: {
        listStyle: 'none',
        textAlign: 'center',
        fontSize: '1.5rem',
        height: '3rem',
        lineHeight: '3rem',
        padding: 0,
        transition: '0.5s all ease',
    },
    border: {
        position: 'absolute', 
        zIndex: 999, 
        display: 'block', 
        width: '100%', 
        height: '0.1rem',
        backgroundColor: '#ccc', 
    }
};

module.exports = style;