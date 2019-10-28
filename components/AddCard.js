import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, green, addCardToDeck } from '../utils/helpers'

class AddCard extends Component {
  state = {
    question: null,
    answer: null
  }

  handleSubmit = () => {
    const { question,  answer } = this.state
    const { key } = this.props.navigation.state.params
    const card = {
      question,
      answer
    }

    this.props.dispatch(addCard({
      key,
      card
    })
  )
    addCardToDeck({
      key,
      question,
      answer
    })
    .then(() => {
      // reset state
      this.setState({
        question: null,
        answer: null
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
            <Text style={styles.details}>What is the details of your new card?</Text>
            <KeyboardAvoidingView style={[styles.detailsContainer]} behavior='padding'>
                <TextInput
                  style={[styles.detailsInput]}
                  placeholder='Question'
                  onChangeText={(question) => this.setState({question})}
                  value={this.state.question}
                  />
                <TextInput
                  style={[styles.detailsInput]}
                  placeholder='Answer'
                  onChangeText={(answer) => this.setState({answer})}
                  value={this.state.answer}
                  />
              </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={this.handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>

    )
  }
}


export default connect()(AddCard)

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
  backgroundColor: white
},
center: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
details: {
  fontSize: 20,
  marginRight: 10,
  marginLeft: 10
},
detailsContainer: {
  flexDirection: 'row',
  flex: 1,
  // justifyContent: 'space-between'
},
detailsInput: {
  flex: 1,
  height: 35,
  borderColor: 'gray',
  borderWidth: 1
},
iosSubmitBtn: {
  height: 45,
  padding: 10,
  marginLeft: 40,
  marginRight: 40,
  borderRadius: 7,
  backgroundColor: green
},
androidSubmitBtn: {
  alignSelf: 'flex-end',
  justifyContent: 'center',
  alignItems: 'center',
  height: 45,
  padding: 10,
  paddingLeft: 30,
  paddingRight: 30,
  borderRadius: 2,
  backgroundColor: green
},
submitBtnText: {
  fontSize: 22,
  textAlign: 'center',
  color: white
}
})
