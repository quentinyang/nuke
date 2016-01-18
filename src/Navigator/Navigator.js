import React, {PropTypes} from 'react';
import View from '../View.js';
import { createHashHistory } from 'history';

var history = createHashHistory({
    queryKey: false
});

const Navigator = React.createClass({

  propTypes: {
    /**
     * Optional function that allows configuration about scene animations and
     * gestures. Will be invoked with the route and should return a scene
     * configuration object
     *
     * ```
     * (route) => Navigator.SceneConfigs.FloatFromRight
     * ```
     */
    configureScene: PropTypes.func,

    /**
     * Required function which renders the scene for a given route. Will be
     * invoked with the route and the navigator object
     *
     * ```
     * (route, navigator) =>
     *   <MySceneComponent title={route.title} />
     * ```
     */
    renderScene: PropTypes.func.isRequired,

    /**
     * Specify a route to start on. A route is an object that the navigator
     * will use to identify each scene to render. `initialRoute` must be
     * a route in the `initialRouteStack` if both props are provided. The
     * `initialRoute` will default to the last item in the `initialRouteStack`.
     */
    initialRoute: PropTypes.object,

    /**
     * Provide a set of routes to initially mount. Required if no initialRoute
     * is provided. Otherwise, it will default to an array containing only the
     * `initialRoute`
     */
    initialRouteStack: PropTypes.arrayOf(PropTypes.object),

    /**
     * @deprecated
     * Use `navigationContext.addListener('willfocus', callback)` instead.
     *
     * Will emit the target route upon mounting and before each nav transition
     */
    onWillFocus: PropTypes.func,

    /**
     * @deprecated
     * Use `navigationContext.addListener('didfocus', callback)` instead.
     *
     * Will be called with the new route of each scene after the transition is
     * complete or after the initial mounting
     */
    onDidFocus: PropTypes.func,

    /**
     * Optionally provide a navigation bar that persists across scene
     * transitions
     */
    navigationBar: PropTypes.node,

    /**
     * Optionally provide the navigator object from a parent Navigator
     */
    navigator: PropTypes.object,

    /**
     * Styles to apply to the container of each scene
     */
    // TODO::Style
    // sceneStyle: View.propTypes.style,
  },

  getInitialState () {
    // routeStack:
    // {
    //   name: 'Route name',
    //   path: 'home/overview'
    //   index: 0,
    //   component: Component
    // }
    var routeStack = this.props.initialRouteStack || [this.props.initialRoute];

    return {
        routeStack
    };
  },

  componentDidMount() {
    //TODO::mount
  },

  componeneDidUpdate() {
    //TODO::update
  },

// <Navigator
//     initialRoute={{name: 'My First Scene', index: 0}}
//     renderScene={(route, navigator) =>
//       <MySceneComponent
//         name={route.name}
//         onForward={() => {
//           var nextIndex = route.index + 1;
//           navigator.push({
//             name: 'Scene ' + nextIndex,
//             index: nextIndex,
//           });
//         }}
//         onBack={() => {
//           if (route.index > 0) {
//             navigator.pop();
//           }
//         }}
//       />
//     }
//   />

  _renderScene(route = {}, i) {
    var scene = this.props.renderScene(route, this)

    var Component = scene.props.component || route.component;

    return (
      <View 
        key={'scene_' + String(route.pathname).replace(/\//g,'-') + i}
        ref={'scene_' + i}
        >
        <View ref='navbar'>{route.name}</View>

        <Component/>

      </View>
    );
  },

  render() {
    let scenes = this.state.routeStack.map((route, index) => {
      console.log(route)
      return this._renderScene(route, index);
    });
    return (

        <View>
          
          <View>
            {scenes}
          </View>
        </View>

    );
  },

  // returns the current list of routes
  getCurrentRoutes() {
    
  },
  
  // Jump backward without unmounting the current scene
  jumpBack() {

  },
  
  // Jump forward to the next scene in the route stack
  jumpForward() {

  },
  
  // Transition to an existing scene without unmounting
  jumpTo(route) {

  },
  
  // Navigate forward to a new scene, squashing any scenes that you could jumpForward to
  push(route) {

  },
  
  // Transition back and unmount the current scene
  pop() {

  },
  
  // Replace the current scene with a new route
  replace(route) {

  },
  
  // Replace a scene as specified by an index
  replaceAtIndex(route, index) {

  },
  
  // Replace the previous scene
  replacePrevious(route) {

  },
  
  // Navigate to a new scene and reset route stack
  resetTo(route) {

  },
  
  // Reset every scene with an array of routes
  immediatelyResetRouteStack(routeStack) {

  },
  
  // Pop to a particular scene, as specified by its route. All scenes after it will be unmounted
  popToRoute(route) {

  },
  
  // Pop to the first scene in the stack, unmounting every other scene
  popToTop() {

  },
  


});

module.exports = Navigator;
