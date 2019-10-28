import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
    return {
      ...state,
      ...action.decks
    }
    case ADD_DECK:
    return {
        ...state,
        ...action.deck
    }
    case ADD_CARD:
    const { key } = action.item
    const { question, answer } = action.item.card

    return {
      ...state,
      [key]: {
        ...state[key],
        questions: state[key].questions.concat({ question, answer })
      }
    }
    default:
    return state
  }
}

export default decks
