import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, Platform, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DeckDetails from './DeckDetails'
import { green, white } from '../utils/helpers'

class Deck extends Component {
  state = {
    fade: new Animated.Value(0)
  }
  static navigationOptions = ({ navigation }) => {
    const param = navigation.state.params
    return {
      title: param.title
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fade,
      { toValue: 1 })
      .start();
  }

  handleAddCard = () => {
    this.props.navigation.navigate(
    'AddCard',
    {
      key: this.props.navigation.state.params.id
    }
  )
  }

  handleStartQuiz = () => {
    this.props.navigation.navigate(
    'Quiz',
    {
      key: this.props.navigation.state.params.id
    }
  )
  }

  render() {
    const { id } = this.props.navigation.state.params
    const { disable } = this.props
    return (
      <Animated.View style={{ opacity: this.state.fade }}>
        <DeckDetails id={id}/>

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={this.handleAddCard}>
          <Text style={styles.submitBtnText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={this.handleStartQuiz}
          disabled={disable}>
          <Text style={styles.submitBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  const { id } = navigation.state.params
  return {
    disable: decks[id].questions.length === 0 ? true : false
  }
}

export default withNavigation(connect(mapStateToProps)(Deck))

const styles = StyleSheet.create({
  iosSubmitBtn: {
    height: 45,
    padding: 10,
    marginTop: 20,
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
    marginTop: 10,
    borderRadius: 2,
    backgroundColor: green
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
    color: white
  }
})
