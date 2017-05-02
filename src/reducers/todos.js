import {
  COMPLETE_ALL,

  ADD_TODO_SUCCESS,
  QUERY_TODO_SUCCESS,
  COMPLETE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  EDIT_TODO_SUCCESS,
  CLEAR_COMPLETED_SUCCESS,
} from '../constants/ActionTypes'

const initialState = []

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO_SUCCESS:
      return [
        action.todo,
        ...state
      ]

    case QUERY_TODO_SUCCESS:
      return [
        ...action.todos,
        ...state
      ]

    case COMPLETE_TODO_SUCCESS:
      return state.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      )

    case DELETE_TODO_SUCCESS:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO_SUCCESS:
      return state.map(todo =>
        todo.id === action.todo.id ?
          action.todo :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED_SUCCESS:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
