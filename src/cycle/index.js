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
      category: 'create',
      send: {text}
    }))

  const addTodoResponse$ = sources.HTTP
    .select('create')
    .flatten()
    .map(res => res.body.data)
    .map(actions.addTodoSuccess)

  return {
    ACTION: addTodoResponse$,
    HTTP: addTodoRequest$
  }
}

export default combineCycles(addTodo);
