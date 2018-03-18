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
} from 'react-native';

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { convert_size } from './screen_utils';
import question from './question.json';

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

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desc: '',
            options: [],
            right_index: 0,
            counter: 0,
        };
    }

    componentDidMount() {
        this.next_question();
    }

    next_question() {
        var question_index = Math.floor(Math.random() * question.length);
        console.log('question_index : ' + question_index);
        var question_info = question[question_index];
        for (var k in question_info) {
            console.log(k + ' : ' + question_info[k]);
        }
        var options = shuffle_options(question_info.options, question_info.index);
        for (var k in options) {
            console.log(k + ' : ' + options[k]);
        }

        this.setState({
            title: question_info.title,
            desc: question_info.desc,
            options: options[0],
            right_index: options[1],
            counter: this.state.counter + 1,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title_view}>
                    <Text style={styles.title_text}>{this.state.counter + '、' + this.state.title + '：' + this.state.desc}</Text>
                </View>

                <View style={styles.radio_group_container}>
                    <RadioGroup
                      style={styles.radio_group}
                      onSelect={(index, value)=>{
                        this.setState({gender_index: value, can_submit: true})
                    }}>
                        {this.state.options.map((item, index) => {
                            return (
                                <RadioButton
                                  key={index}
                                  style={styles.radio_button}
                                  value={index}
                                >
                                    <View style={styles.radio_button_content}>
                                        <Text style={styles.radio_text}>{item}</Text>
                                        <View style={{flex: 1}}/>
                                        <Image style={styles.result_image} source={require('./images/right.png')}/>
                                    </View>
                                </RadioButton>
                            );
                        })}
                    </RadioGroup>
                </View>

                <View style={styles.next_question_view}>
                    <Text style={styles.next_question_text}>下一题</Text>
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
        width: convert_size(200),
        height: convert_size(60),
        justifyContent: 'center',
        alignItems: 'center',
    },

    next_question_text: {
        fontSize: convert_size(24),
        color: 'black',
        textAlign: 'center',
    },
});
