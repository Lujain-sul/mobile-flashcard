import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, green, saveDeckTitle } from '../utils/helpers'

class AddDeck extends Component {
  state = {
    title: null
  }

  handleSubmit = () => {
    const { title } = this.state
    const key = title.replace(/\s/g, '')

    this.props.dispatch(addDeck({
      [key]: {
        title,
        questions : []
      }
    })
  )
    saveDeckTitle({
      key,
      title
    })
    .then(() => {
      // reset state
      this.setState({
        title: null
      })

      // redirect to the newly created deck
      this.toDeck({ id: key, title })
    })
  }

  toDeck = ({ id, title }) => {
  this.props.navigation.navigate(
  'Deck',
  {
    id,
    title
  })
}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
            <Text style={styles.title}>What is the title of your new deck?</Text>
            <KeyboardAvoidingView style={styles.titleContainer} behavior='padding'>
              <TextInput
                style={styles.titleInput}
                placeholder='Deck Title'
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
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

export default connect()(AddDeck)

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
title: {
  fontSize: 20,
  marginRight: 10,
  marginLeft: 10
},
titleContainer: {
  flexDirection: 'row',
  marginTop: 20
},
titleInput: {
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
