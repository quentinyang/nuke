let Nuke = {
    ActivityIndicator: require('./ActivityIndicator/ActivityIndicator'),
    Alert: require('./Alert.js'),
    AppRegistry: require('./CommonApi').AppRegistry,
    AppState: require('./AppState/AppState'),

    Button: require('./Button'),
    BackAndroid: require('./CommonApi').BackAndroid,

    Component: require('./Component.js'),


    // Custom Module: DeviceId
    DeviceId: require('../native-libs/DeviceID/deviceId'),

    Dimensions: require('./CommonApi').Dimensions,

    Image: require('./Image.js'),
    InteractionManager: require('./CommonApi').InteractionManager,

    ListView: require('./ListView.js'),
    Linking: require('./Linking'),

    MapView: require('./MapView.js'),
    Modal: require('./Modal'),

    NativeModules: require('./CommonApi').NativeModules,
    Navigator: require('./Navigator.js'),
    NetInfo: require('./NetInfo'),

    Progress: require('./Progress/Progress'),
    Picker: require('./Picker.js'),
    PixelRatio: require('./CommonApi').PixelRatio,
    Platform: require('./CommonApi').Platform,

    React: require('./React.js'),
    RefreshControl: require('./RefreshControl.js'),

    ScrollView: require('./ScrollView'),
    StatusBar: require('./StatusBar'),
    StyleSheet: require('./CommonApi').StyleSheet,
    Switch: require('./Switch.js'),

    TabBar: require('./TabBar/TabBar'),
    Text: require('./Text.js'),
    TextInput: require('./TextInput'),
    TouchableHighlight: require('./Touchable').TouchableHighlight,
    TouchableOpacity: require('./Touchable').TouchableOpacity,
    TouchableWithoutFeedback: require('./Touchable').TouchableWithoutFeedback,

    View: require('./View.js'),
    WebView: require('./WebView'),
};

module.exports = Nuke;