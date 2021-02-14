import {
  GET_USERS,
  SET_RECIPIENT,
  SET_AMOUNT,
  // SUBMIT_PAYMENT,
  GET_TRANSACTIONS
} from '../actionCreators/transactionsActionCreator'

const initialState = {
  users: [],
  payment: {
    recipientId: '',
    amount: null
    // balance: null
  },
  amount: null,
  transactions: []
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return { ...state, users: action.users }
    }
    case GET_TRANSACTIONS: {
      return { ...state, transactions: action.transactions }
    }
    case SET_RECIPIENT: {
      return {
        ...state,
        payment: {
          recipientId: action.id
        }
      }
    }
    // case SUBMIT_PAYMENT: {
    //   return { ...state, amount: action.amount }
    // }
    case SET_AMOUNT: {
      return { ...state, payment: { ...state.payment, amount: action.amount } }
    }
    default:
      return state
  }
}

export default transactionsReducer
