let Nuke = {
    Text: require('./Text.js'),
    View: require('./View.js'),
    Switch: require('./Switch.js'),
    Image: require('./Image.js'),
    MapView: require('./MapView.js'),
    Picker: require('./Picker.js'),
    Alert: require('./Alert.js'),
    RefreshControl: require('./RefreshControl.js'),
    Navigator: require('./Navigator.js'),
    ListView: require('./ListView.js'),
    Component: require('./Component.js'),
    ActivityIndicator: require('./ActivityIndicator/ActivityIndicator'),
    React: require('./React.js'),
    Dimensions: require('./CommonApi').Dimensions,
    PixelRatio: require('./CommonApi').PixelRatio,
    StyleSheet: require('./CommonApi').StyleSheet,
    Platform: require('./CommonApi').Platform,
    BackAndroid: require('./CommonApi').BackAndroid,
    InteractionManager: require('./CommonApi').InteractionManager,
    AppRegistry: require('./CommonApi').AppRegistry,
    NativeModules: require('./CommonApi').NativeModules,
    TextInput: require('./TextInput'),
    WebView: require('./WebView'),
    ScrollView: require('./ScrollView'),
    StatusBar: require('./StatusBar'),
    Progress: require('./Progress/Progress'),
    TabBar: require('./TabBar/TabBar'),

    TouchableHighlight: require('./Touchable').TouchableHighlight,
    TouchableOpacity: require('./Touchable').TouchableOpacity,
    TouchableWithoutFeedback: require('./Touchable').TouchableWithoutFeedback,
    Button: require('./Button'),
    Linking: require('./Linking'),
    Modal: require('./Modal/Modal'),

    //custom module
    DeviceId: require('../native-libs/DeviceID/deviceId')
};

module.exports = Nuke;