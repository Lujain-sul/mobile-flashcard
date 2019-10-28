import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import DeckItem from './DeckItem'
import { getDecks, white, starterMessage } from '../utils/helpers'

class DecksList extends Component {
  state = {
    ready : false
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
    .then((decks) => dispatch(receiveDecks(decks)))
    .then(() => this.setState(() => ({
      ready: true
    })))
  }

  render() {
    const { deckIds } = this.props
    const { ready } = this.state

    if (!ready)
      return <AppLoading/>

    if(deckIds.length > 0)
    return (
      <FlatList
        data={deckIds}
        renderItem={({ item }) => <DeckItem key={item} id={item}/>}
        keyExtractor={item => item}
      />
    )

    return (
      <View style={styles.container}>
        <Text style={styles.center}>{starterMessage()}</Text>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    deckIds: Object.keys(decks)
  }
}

export default connect(mapStateToProps)(DecksList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  center: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 30,
  marginRight: 30,
  fontSize: 20
},
})
