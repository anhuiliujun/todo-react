import {
  SEARCH_USERS_SUCCESS
} from '../constants/ActionTypes'

const initialState = []

export default function users(state = initialState, action = {}) {
  switch(action.type) {
    case SEARCH_USERS_SUCCESS:
      return [...action.users];

    default:
      return state;
  }
}
