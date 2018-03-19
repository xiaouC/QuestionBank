/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { convert_size } from './screen_utils';
import question from './question.json';

// 洗牌
function shuffle(array) {
  var i,x,j;
  for (i=array.length; i > 0; --i) {
    j = Math.floor(Math.random() * i);
    x = array[j];
    array[j] = array[i-1];
    array[i-1] = x;
  }
}

// 
function shuffle_options(options, index) {
  var new_options = options.slice(0);
  var right_answer = new_options.splice(index, 1);

  shuffle(new_options);

  var new_index = Math.floor(Math.random() * (options.length));
  new_options.splice(new_index, 0, right_answer);

  return [new_options, new_index];
}

var src_right = require('./images/right.png');
var src_wrong = require('./images/wrong.png');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      options: [],
      right_index: 0,
      counter: 0,
      can_next_question: false,
      show_answer_flag: false,
    };

    this.selected_index = -1;
  }

  componentDidMount() {
    this.next_question();
  }

  next_question() {
    var question_index = Math.floor(Math.random() * question.length);
    var question_info = question[question_index];
    var options = shuffle_options(question_info.options, question_info.index);

    this._radio_group_ref.setState({
      selectedIndex: -1,
    });

    this.selected_index = -1;

    this.setState({
      title: question_info.title,
      desc: question_info.desc,
      options: options[0],
      right_index: options[1],
      counter: this.state.counter + 1,
      can_next_question: false,
      show_answer_flag: false,
    });
  }

  render_radio_button_content(item, index) {
    if (this.state.show_answer_flag && index == this.selected_index) {
      return (
        <View style={styles.radio_button_content}>
          <Text style={styles.radio_text}>{item}</Text>
          <View style={{flex: 1}}/>
          <Image style={styles.result_image} source={this.selected_index == this.state.right_index ? src_right : src_wrong}/>
        </View>
      );
    }

    return (
      <View style={styles.radio_button_content}>
        <Text style={styles.radio_text}>{item}</Text>
        <View style={{flex: 1}}/>
      </View>
    );
  }

  render_next_button() {
    if (this.state.can_next_question) {
      return (
        <TouchableOpacity onPress={()=>{this.next_question();}}>
          <View style={styles.button_view}>
            <Text style={styles.next_question_text}>下一题</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.button_view}>
        <Text style={styles.next_question_text_disable}>下一题</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title_view}>
          <Text style={styles.title_text}>{this.state.counter + '、' + this.state.title + '：' + this.state.desc}</Text>
        </View>

        <View style={styles.radio_group_container}>
          <RadioGroup
            ref={(ref) => { this._radio_group_ref = ref;}}
            style={styles.radio_group}
            onSelect={(index, value)=>{
              this.selected_index = index;
          }}>
            {this.state.options.map((item, index) => {
              return (
                <RadioButton
                  key={index}
                  style={styles.radio_button}
                >
                  {this.render_radio_button_content(item, index)}
                </RadioButton>
              );
            })}
          </RadioGroup>
        </View>

        <View style={styles.next_question_view}>
          <TouchableOpacity onPress={()=>{
            if (this.selected_index != this.state.right_index) {
              this.setState({
                show_answer_flag: true,
                can_next_question: false,
              });
            }
            else {
              this.setState({
                show_answer_flag: true,
                can_next_question: true,
              });
            }
          }}>
            <View style={styles.button_view}>
              <Text style={styles.next_question_text}>确  定</Text>
            </View>
          </TouchableOpacity>

          <View style={{width: convert_size(50)}}/>

          {this.render_next_button()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: convert_size(750),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title_view: {
    width: convert_size(750),
    height: convert_size(100),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  title_text: {
    fontSize: convert_size(30),
    color: 'black',
    textAlign: 'center',
    marginLeft: convert_size(50),
  },

  radio_group_container: {
    width: convert_size(750),
    height: convert_size(420),
    marginLeft: convert_size(100),
  },

  radio_group: {
    flexDirection: 'column',
  },

  radio_button: {
    width: convert_size(600),
    height: convert_size(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  radio_button_content: {
    width: convert_size(400),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  radio_text: {
    fontSize: convert_size(20),
    color: 'black',
    textAlign: 'center',
    marginLeft: convert_size(20),
  },

  result_image: {
    width: convert_size(50),
    height: convert_size(50),
    resizeMode: 'stretch',
    marginRight: convert_size(20),
  },

  next_question_view: {
    flexDirection: 'row',
    width: convert_size(400),
    height: convert_size(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: convert_size(50),
  },

  button_view: {
    width: convert_size(120),
    height: convert_size(80),
    borderColor: '#979797',
    borderRadius: convert_size(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: convert_size(20),
    backgroundColor: '#F6F6F6',
  },

  next_question_text: {
    fontSize: convert_size(24),
    color: 'black',
    textAlign: 'center',
  },

  next_question_text_disable: {
    fontSize: convert_size(32),
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
});
