import {combineCycles} from 'redux-cycles';
import xs from 'xstream';

import * as ActionTypes from '../constants/ActionTypes';
import * as actions from '../actions';

export function addTodo(sources) {
  const addTodoRequest$ = sources.ACTION
    .filter(action => action.type === ActionTypes.ADD_TODO)
    .map(action => action.text)
    .filter(x => !!x)
    .map(text => ({
      url: '/api/todos',
      method: 'POST',
      category: 'createTodo',
      send: {text}
    }))

  const addTodoResponse$ = sources.HTTP
    .select('createTodo')
    .flatten()
    .map(res => res.body.data)
    .map(actions.addTodoSuccess)

  return {
    ACTION: addTodoResponse$,
    HTTP: addTodoRequest$
  }
}

export function queryTodo(sources) {
  const queryTodoRequest$ = sources.ACTION
    .filter(action => action.type === ActionTypes.QUERY_TODO)
    .mapTo({
      url: '/api/todos',
      category: 'queryTodo'
    })

  const queryTodoResponse$ = sources.HTTP
    .select('queryTodo')
    .flatten()
    .map(res => res.body.data)
    .map(actions.queryTodoSuccess)

  return {
    HTTP: queryTodoRequest$,
    ACTION: queryTodoResponse$
  }
}

export function toggleTodo(sources) {
  const toggleTodoRequest$ = sources.ACTION
    .filter(action => action.type === ActionTypes.COMPLETE_TODO)
    .map(action => action.id)
    .map(id => ({
      url: `/api/todos/${id}/toggle`,
      category: 'toggleTodo',
      method: 'PUT'
    }))

  const toggleTodoResponse$ = sources.HTTP
    .select('toggleTodo')
    .flatten()
    .map(res => res.body.data)
    .map(actions.completeTodoSuccess)

  return {
    ACTION: toggleTodoResponse$,
    HTTP: toggleTodoRequest$
  }
}

export function deleteTodo(sources) {
  const deleteTodoRequest$ = sources.ACTION
    .filter(action => action.type === ActionTypes.DELETE_TODO)
    .map(action => action.id)
    .map(id => ({
      url: `/api/todos/${id}`,
      category: 'deleteTodo',
      method: 'DELETE'
    }))

  const deleteTodoResponse$ = sources.HTTP
    .select('deleteTodo')
    .flatten()
    .map(res => res.body.data)
    .map(actions.deleteTodoSuccess)

  return {
    ACTION: deleteTodoResponse$,
    HTTP: deleteTodoRequest$
  }
}

export function editTodo(sources) {
  const editTodoRequest$ = sources.ACTION
    .filter(action => action.type === ActionTypes.EDIT_TODO)
    .map(action => ({id: action.id, text: action.text}))
    .map(({id, text}) => ({
      url: `/api/todos/${id}`,
      send: {text},
      method: 'PUT',
      category: 'editTodo'
    }))

  const editTodoResponse$ = sources.HTTP
    .select('editTodo')
    .flatten()
    .map(res => res.body.data)
    .map(actions.editTodoSuccess)

  return {
    ACTION: editTodoResponse$,
    HTTP: editTodoRequest$
  }
}

export function clearCompleted(sources) {
  const clearCompletedRequest$ = sources.ACTION
    .filter(action => action.type === ActionTypes.CLEAR_COMPLETED)
    .mapTo({
      url: '/api/todos/clearCompleted',
      method: 'POST',
      category: 'clearCompletedTodo'
    })

  const clearCompletedResponse$ = sources.HTTP
    .select('clearCompletedTodo')
    .flatten()
    .map(res => res.body.data)
    .map(actions.clearCompletedSuccess)

  return {
    ACTION: clearCompletedResponse$,
    HTTP: clearCompletedRequest$
  }
}

export default combineCycles(addTodo, queryTodo, toggleTodo, deleteTodo, editTodo, clearCompleted);
