import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, gray } from '../utils/helpers'

class DeckDetails extends Component {
  render() {
    const { deck } = this.props
    
    return (
        <View style={styles.item}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.counter}>{deck.questions.length} cards</Text>
        </View>
    )
  }
}

function mapStateToProps(decks, { id }) {
  const deck = decks[id]
  return {
    deck
  }
}

export default connect(mapStateToProps)(DeckDetails)

const styles = StyleSheet.create({
  item: {
  backgroundColor: white,
  borderRadius: Platform.OS === 'ios' ? 16 : 2,
  padding: 20,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 17,
  justifyContent: 'center',
  shadowRadius: 3,
  shadowOpacity: 0.8,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {
    width: 0,
    height: 3
  }
},
title: {
  fontSize: 20,
  alignSelf: 'center'
},
counter: {
  fontSize: 12,
  paddingTop: 10,
  alignSelf: 'center',
  color: gray
},
})
