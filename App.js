import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DecksList from './components/DecksList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { green,
         white,
         saveDeckTitle,
         getDeck,
         getDecks,
         clearDecks,
         setLocalNotification,
         clearLocalNotification } from './utils/helpers'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor}/>
    }
  }
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? green : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : green,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  }
})

const AppContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  componentDidMount() {
    //clearDecks()
    //clearLocalNotification()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={green} barStyle='light-content'/>
          <AppContainer/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
