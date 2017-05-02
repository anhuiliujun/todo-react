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

export default combineCycles(addTodo, queryTodo);
