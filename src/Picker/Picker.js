import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import View from '../View';
import Button from '../Button';
import Text from '../Text';

import Styles from './Style';

// Debug tool:
// <div ref="tool" style={{display: 'none'}}>
//   <select className="" style={{display: 'block'}}>
//     <option>1</option>
//     <option>2</option>
//     <option>3</option>
//     <option>4</option>
//     <option>5</option>
//     <option>6</option>
//     <option>7</option>
//     <option>8</option>
//     <option>9</option>
//     <option>10</option>
//   </select>
//   <input type="text" ref="text" />
//   <button onClick={self.run}>Go</button>
//   <button className="prev" onClick={self.goPrevious}>上一个</button>
//   <button className="next" onClick={self.goNext}>下一个</button>
// </div>

const PickerCore = React.createClass({
  propTypes: {
    label: PropTypes.string
  },
  getInitialState () {
    return {

    };
  },

  _px2rem(px) {
    return px / this.data.utils.px2remRate;
  },
  _rem2px(rem) {
    return rem * this.data.utils.px2remRate;;
  },

  // use px
  data: {
    config: {
      buffer: 4,//扩大滑动效果因素
      px2remRate: 10,//系统px转换rem比例
      offset: 2,// 一版是 2 或 1
      perHeight: 30,// 3rem or 30px
    },
    animation: {
      index: 0,// 当前第几个
    },
    selected: null,
    touch: {
      start: {x: 0, y: 0},
      end: {x: 0, y: 0},
      move: 0
    },
  },

  componentDidMount() {
    var self = this;
    var data = this.data;

    this.init();
  },

  init() {
    this.setSelected(0);
  },

  componeneDidUpdate() {
    //TODO::update
  },

  goPrevious(e) {
    console.log('previous');

    this._animate(this.getIndex('prev'));
  },

  goNext(e) {
    console.log('next');
    this._animate(this.getIndex('next'));
  },

  setSelected(index) {
    
    // 向量（正/负表示向前/向后） 
    var vector = (index || 0) - this.data.config.offset;

    for (var i = 0; i < Math.abs(vector); i++) {
      if (vector > 0) {
        this.goNext();
      } else {
        this.goPrevious();
      }
    }

  },

  /* test funciton */
  run() {
    var self = this;
    var text = this.refs.text.value;

    // for (var i = 0; i < Math.abs(text); i++) {
    //   if (text > 0) {
    //     self.goNext();
    //   } else {
    //     self.goPrevious();
    //   }
    // }

    this.setSelected(text);
  },

  

  /**
   * // max next index: -( (len-1) - offset )
   * // max previous index: offset
   * Case 1: offset = 2 (0,1,2,)
   *  total | max next | max previous 
   *  ===== | ======== | ============
   *  10    | -7       | 2
   * 
   * Case 2: offset = 1(0,1)
   *  total | max next | max previous 
   *  ===== | ======== | ============
   *  10    | -8       | 1
   */
  getIndex(direction) {
    var offset = this.data.config.offset;
    var maxNext = - ((this.props.options.length - 1) - offset);
    var maxPrevious = offset;
    var index = this.data.animation.index;

    if (direction == 'next') {
      --index;
      if (Math.abs(index) > Math.abs(maxNext)) {
        index = maxNext;
      }
    } else {
      ++index;
      if (index > maxPrevious) {
        index = maxPrevious;
      }
    }

    // reset value
    this.data.animation.index = index;

    console.log('index', index);

    this.data.selected = this.props.options[offset - index];

    console.log('selected: ', offset - index, this.data.selected);

    // execute change handler (callback)
    this.changeHandler(this.data.selected);

    return index;
  },

  changeHandler(data) {
    let changeCallback = this.props.onValueChange;
    if (changeCallback && (typeof changeCallback === 'function')) {
        changeCallback(data);
    }
  },

  _animate(index) {
    var self = this;
    var refs = this.refs;
    var selectedIndex = this.data.config.offset - index;
    var item, text;

    var move = (index * 3) + 'rem';
    this.props.options.map(function(item, index) {
        item = refs['item' + index];
        text = refs['text' + index];

        item.style.WebkitTransform = 'translate3D(0, ' + move + ', 0)';
        item.style.transform = 'translate3D(0, ' + move + ', 0)';
        item.style.border = 'none';

        text.style.WebkitTransform = 'scale(1, 1)';
        text.style.transform = 'scale(1, 1)';
        text.style.color = '#ccc';
        if (index == selectedIndex) {
          text.style.color = '#000';
          text.style.WebkitTransform = 'scale(1.5, 1.5)';
          text.style.transform = 'scale(1.5, 1.5)';
          // $(item).css('border-top', '0.1rem solid #ccc');
          // $(item).css('border-bottom', '0.1rem solid #ccc');
        }
    });

  },

  onTouchStart(e) {
    var touches = e.touches;
    console.log('start', e.touches, e.changedTouches);
  },
  onTouchMove(e) {
    var touches = e.touches;
    // console.log('move', e.touches, e.changedTouches);
    if (this.data.touch.start.y) {
      this.data.touch.end.y = touches[0].pageY;
    } else {
      this.data.touch.start.y = touches[0].pageY;
    }

    var moveDistance = (this.data.touch.end.y - this.data.touch.start.y) * this.data.config.buffer;

    console.log('real move', (this.data.touch.end.y - this.data.touch.start.y), 
                'Move buffer: ', moveDistance, 
                'Current selected', this.data.selected);

    if (Math.abs(moveDistance) > this.data.config.perHeight) {
      this.data.touch.start.y = touches[0].pageY;
      if (moveDistance > 0) {
        this.goPrevious();
      } else {
        this.goNext();
      }
    }
    this.onCancelEvent(e);

  },
  onTouchEnd(e) {
    // Do nothing here.
  },



  onCancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();  
  },

  render() {
    var self = this;

    let selectOption = this.props.options.map(function(item, key) {
      
      var name, value;
      if (typeof item === 'object') {
        name = item.name;
        value = item.value;
      } else {
        name = item;
        value = item;
      }
      // console.log('name', name, 'value', value, 'Index:', key);
      return (
          <li key={key} style={Styles.item} ref={'item' + key}>
            <span ref={'text' + key} 
                style={{
                        display: 'block', 
                        transition: '0.5s ease', WebkitTransition: '0.5s ease', 
                        transitionDelay: '0.1s', WebkitTransitionDelay: '0.1s'
                    }} 
                customize-data={value}>{name}</span>
          </li>
      );
    });

    var { ...borderTopStyle } = Styles.border;
    borderTopStyle.top = '5.5rem';
    
    var { ...borderBottomStyle } = Styles.border;
    borderBottomStyle.top = '9.5rem';

    return (

        <View style={Styles.container}>
          <ul ref="list" style={Styles.list} 
              onTouchStart={this.onTouchStart}
              onTouchMove={this.onTouchMove}
              onTouchEnd={this.onTouchEnd} >
            {selectOption}
            <p style={borderTopStyle}></p>
            <p style={borderBottomStyle}></p>
          </ul>
          
        </View>

    );
  },
});

const Picker = React.createClass({

  getInitialState () {
    this.screenHeight = window.screen.height;
    return {
        
    };
  },

  data: {

  },

  componentDidMount() {
    //TODO::mount
    
  },

  componeneDidUpdate() {
    //TODO::update
  },

  onCancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();  
  },

  clickHandler(key, e) {
    
    if (key === 'confirm') {
        let changeCallback = this.props.onValueChange;
        if (changeCallback && (typeof changeCallback === 'function')) {
            
            this.displaySelect(this.data);
            changeCallback(this.data);
        }
    }

    this.close();
  },

  displaySelect(data) {
    var text = ReactDOM.findDOMNode(this.refs.text);
    text.innerHTML = data.name;
  },

  getValue() {
    return this.data;
  },

  changeCallback(data) {
    if (typeof data === 'object') {
        this.data = data;
    } else {
        this.data = {name: data, value: data};
    }
    console.log(this.data);
  },

  open() {
    this.closed = false;
    var picker = ReactDOM.findDOMNode(this.refs.picker);
    picker.style.display = 'block';
    setTimeout(()=>{this._transformUpStyle(picker.style);}, 1);

    var overlay = ReactDOM.findDOMNode(this.refs.overlay);
    overlay.style.display = 'block';
  },

  close() {
    this.closed = true;
    var picker = ReactDOM.findDOMNode(this.refs.picker);
    setTimeout(() => {picker.style.display = 'none';}, 500);
    this._transformDownStyle(picker.style);

    var overlay = ReactDOM.findDOMNode(this.refs.overlay);
    setTimeout(() => {overlay.style.display = 'none';}, 500);
  },

  _transformUpStyle(styles) {
    styles.WebkitTransform = 'translate3d(0,' + (this.screenHeight/10 - 7.8) + 'rem,0)';
    styles.transform = 'translate3d(0,' + (this.screenHeight/10 - 7.8) + 'rem,0)';
  },
  _transformDownStyle(styles) {
    styles.WebkitTransform = 'translate3d(0,' + (this.screenHeight /10 + 16.8) + 'rem,0)';
    styles.transform = 'translate3d(0,' + (this.screenHeight /10 + 16.8) + 'rem,0)';
  },
  render() {
    var {...containerStyles} = Styles.container;

    var {...pickerStyles} = Styles.pickerContainer;
    this._transformDownStyle(pickerStyles)
    
    var {...overlayStyles} = Styles.overlay;
    overlayStyles.display = 'none';

    var {...leftButton} = Styles.button;
    leftButton.borderRight = '.1rem solid #d9d9d9';
    leftButton.marginRight = '-.1rem';

    let {
        ...others
    } = this.props;

    return (
        <View {...others}>
            <Text ref="text" style={Styles.text} onClick={this.open} onPress={this.open}>{this.props.placeholder}</Text>

            <View style={containerStyles}>
                <View ref='overlay' style={overlayStyles}
                    onTouchStart={this.onCancelEvent}
                    onTouchMove={this.onCancelEvent}
                    onTouchEnd={this.onCancelEvent} />
                <View ref="picker" style={pickerStyles}>
                    <View style={Styles.operation}>
                        <Button ref="cancel" style={leftButton} onClick={this.clickHandler.bind(null, 'cancel')}>取消</Button>
                        <Button ref="confirm" style={Styles.button} onClick={this.clickHandler.bind(null, 'confirm')}>确定</Button>
                    </View>

                    <PickerCore
                        options={this.props.options}
                        onValueChange={this.changeCallback}
                        itemStyle={this.props.itemStyle}
                        selectedValue={this.props.selectedValue}
                    />
                </View>
                
            </View>
            
        </View>

    );
  },
});

module.exports = {
    Picker: Picker,
    PickerCore: PickerCore,
};

