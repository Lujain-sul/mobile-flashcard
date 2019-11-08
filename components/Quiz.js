import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import CardFlip from 'react-native-card-flip'
import { white, green, darkGreen, red, blue, gray, setLocalNotification, clearLocalNotification } from '../utils/helpers'


class Quiz extends Component {
  state = {
    currKey: 0,
    score: 0,
    isCompleted: false
  }

  handleCorrectAns = () => {
    const { questions } = this.props
    this.state.currKey + 1 === questions.length
    ? this.setState((prevState) => ({
      ...prevState,
      isCompleted: true,
      score: prevState.score + 1
    }), () => {
      // resest notifications if a quiz is completed
      clearLocalNotification()
      .then(setLocalNotification)
    })
    : this.setState((prevState) => ({
      ...prevState,
      currKey: prevState.currKey + 1,
      score: prevState.score + 1
    }))

    // hide the next card
    this.flipCard()
  }

  handleIncorrectAns = () => {
    const { questions } = this.props
    this.state.currKey + 1 === questions.length
    ? this.setState((prevState) => ({
      ...prevState,
      isCompleted: true
    }), () => {
      // resest notifications if a quiz is completed
      clearLocalNotification()
      .then(setLocalNotification)
    })
    : this.setState((prevState) => ({
      ...prevState,
      currKey: prevState.currKey + 1
    }))

    // hide the next card
    this.flipCard()
  }

  flipCard = () => {
    if(this.state.currSide == 0)
      this.card.flip()
  }

  restart = () => {
    this.setState({
      currKey: 0,
      currSide: 0,
      score: 0,
      isCompleted: false
    })
  }

  toDeck = () => {
    const { key } = this.props.navigation.state.params
    const { title } = this.props

    this.props.navigation.navigate(
    'Deck',
    {
      id: key,
      title
    })
  }

  render() {
    const { questions } = this.props
    const { currKey, score, isCompleted } = this.state

    if(!isCompleted)
    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          underlayColor={gray}
          onPress={() => this.card.flip()}>
          <Text style={styles.hintText}>💡Answer</Text>
        </TouchableHighlight>

        {/* https://www.npmjs.com/package/react-native-card-flip */}
        <CardFlip style={styles.cardContainer}
          ref={(card) => this.card = card}
          onFlip={() => this.setState({ currSide: this.card.state.side })}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.card.jiggle()}>
            <Text style={[styles.centerText, { color: white }]}>
              {currKey + 1} of {questions.length} cards: {questions[currKey].question}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => this.card.jiggle()}>
            <Text style={[styles.centerText, { color: white }]}>{questions[currKey].answer}</Text>
          </TouchableOpacity>
        </CardFlip>

        <TouchableOpacity
          style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: darkGreen }]}
          onPress={this.handleCorrectAns}>
          <Text style={styles.submitBtnText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: red }]}
          onPress={this.handleIncorrectAns}>
          <Text style={styles.submitBtnText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    )

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          <Text style={styles.centerText}>Your score is {score} 😄</Text>
        </View>

        <TouchableOpacity
          style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: green }]}
          onPress={this.restart}>
          <Text style={styles.submitBtnText}>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, { backgroundColor: green }]}
          onPress={this.toDeck}>
          <Text style={styles.submitBtnText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(decks, { navigation }) {
  const { key } = navigation.state.params
  return {
    title: decks[key].title,
    questions: decks[key].questions
  }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 20,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  card: {
    flex: 1,
    backgroundColor: blue,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  centerText: {
    fontSize: 20,
    alignSelf: 'center'
  },
  hintText: {
    fontSize: 15,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 15,
    color: gray
  },
  iosSubmitBtn: {
    height: 45,
    padding: 10,
    marginBottom: 15,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 7
  },
  androidSubmitBtn: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 15,
    borderRadius: 2
  },
  submitBtnText: {
    fontSize: 22,
    textAlign: 'center',
    color: white
  }
})
