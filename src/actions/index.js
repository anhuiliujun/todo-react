import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })

export const addTodoSuccess = todo => ({type: types.ADD_TODO_SUCCESS, todo})
export const queryTodo = () => ({type: types.QUERY_TODO})
export const queryTodoSuccess = todos => ({type: types.QUERY_TODO_SUCCESS, todos})
export const completeTodoSuccess = todo => ({type: types.COMPLETE_TODO_SUCCESS, todo})
export const deleteTodoSuccess = id => ({type: types.DELETE_TODO_SUCCESS, id})
export const editTodoSuccess = todo => ({type: types.EDIT_TODO_SUCCESS, todo})
