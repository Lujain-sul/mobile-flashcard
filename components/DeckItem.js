import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, Platform, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DeckDetails from './DeckDetails'
import { white, gray } from '../utils/helpers'

class DeckItem extends Component {
  render() {
    const { id, title } = this.props

    return (
      <TouchableOpacity onPress={() =>
          this.props.navigation.navigate(
          'Deck',
          {
            id,
            title
          }
        )}>
        <DeckDetails id={id}/>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(decks, { id }) {
  const title = decks[id].title
  return {
    id,
    title
  }
}

export default withNavigation(connect(mapStateToProps)(DeckItem))

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
center: {
  flex: 1,
  alignSelf: 'center',
},
counter: {
  fontSize: 12,
  paddingTop: 10,
  color: gray,
},
})
