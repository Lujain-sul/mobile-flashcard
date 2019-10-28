import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

export const green = '#57dcae'
export const darkGreen = '#279d74'
export const red = '#e80b0b'
export const gray = '#757575'
export const white = '#fff'
export const blue = '#57c8dc'
export const yellow = '#ffc300'

export const DECKS_STORAGE_KEY = 'UdaciFlashCards:decks'
const NOTIFICATION_KEY = 'UdaciFlashCards:notifications'

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(JSON.parse)
}

export function getDeck({ key }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => JSON.parse(results)[key])
}

export function saveDeckTitle({ key, title }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck({ key, question, answer }) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((results) => JSON.parse(results)[key])
  .then((data) => {
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
      [key]: {
        ...data,
        questions: data.questions.concat({question, answer})
      }
    }))
  })
}

export function clearDecks() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}

export function starterMessage() {
  return '🤓 Start with adding decks!'
}

/*
  UdaciFitness is used as a guide
  https://github.com/udacity/reactnd-UdaciFitness-complete
*/

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: "Take a quiz!",
    body: "👋 Don't forget to study today and take a quiz",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if(data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if(status === 'granted') {
          // clear it just in case we don't set to
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          // set daily reminder at 7:00 a.m. for early 🐦
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(7)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          )

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}
