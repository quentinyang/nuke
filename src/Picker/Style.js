let listHeight = '15';//rem
let buttonHeight = '1.8';//rem
let style = {
    container: {
        // position: 'fixed',
        width: '100%',
        height: '100%',
    },
    list: {
        margin: 0,
        padding: 0,
        position: 'fixed',
        backgroundColor: '#fff', 
        width: '100%',
        height: listHeight + 'rem',
        overflow: 'hidden',
        bottom: 0,
        zIndex: 99,
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
        margin: 0,
        padding: 0,
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 90,
        background: '#000',
        opacity: 0.5,
    },
    operation: {
        background: '#EEE',
        borderRadius: '.5rem .5rem 0 0',
        position: 'absolute',
        width: '100%',
        zIndex: 99,
        bottom: (listHeight - 0.1) + 'rem',
        borderBottom: '0.1rem solid #d9d9d9'
    },
    pickerContainer: {
        transitionDuration: '1s',
        position: 'relative',
        zIndex: 99,
        display: 'none',    
    },
    text: {
        height: '3.4rem',
        fontSize: '1.6rem',
        display: 'inline-block',
        lineHeight: '3.4rem',
        width: '100%',
    },
    button: {
        color: '#000',
        background: 'none',
        display: 'inline-block',
        fontSize: '1.6rem',
        width: '50%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        height: buttonHeight + 'rem',
        lineHeight: buttonHeight + 'rem',
        borderRadius: 0,
    }

};

module.exports = style;