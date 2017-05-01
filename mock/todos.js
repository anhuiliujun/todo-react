'use strict';

let todos = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
]

module.exports = {
    'GET /todos': function (req, res) {
        setTimeout(function () {
            res.json({
                status: 1,
                data: todos
            });
        }, 500)
    },
    'POST /todos': function (req, res) {
        const todo = {
            id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: JSON.parse(req.body).text
        }
        todos = [todo, ...todos]
        setTimeout(function () {
            res.json({
                status: 1,
                data: todo
            })
        }, 500)
    },
    'PUT /todos/:id': function (req, res) {
        const text = JSON.parse(req.body).text;
        const id = parseInt(req.params.id, 10);
        todos = todos.map(todo => todo.id === id ? { id, text, completed: todo.completed } : todo)
        setTimeout(function () {
            res.json({
                status: 1,
                data: todos.find(todo => todo.id === id)
            })
        }, 500)
    },
    'DELETE /todos/:id': function (req, res) {
        const id = parseInt(req.params.id, 10)
        todos = todos.filter(todo => todo.id !== id)
        setTimeout(function () {
            res.json({
                status: 1,
                data: todos
            })
        }, 500)
    },
    'PUT /todos/:id/toggle': function (req, res) {
        const id = parseInt(req.params.id, 10);
        todos = todos.map(todo => todo.id === id ? {id, text, completed: !todo.completed} : todo)
        setTimeout(function () {
            res.json({
                status: 1,
                data: todos
            })
        }, 500)
    },
    'PUT /todos/completeAll': function (req, res) {
        const areAllMarked = todos.every(todo => todo.completed)
        todos = todos.map(todo => ({id: todo.id, text: todo.text, completed: !areAllMarked}))
        setTimeout(function () {
            res.json({
                status: 1,
                data: todos
            })
        }, 500)
    },
    'PUT /todos/clearCompleted': function (req, res) {
        todos = todos.filter(todo => todo.completed === false)
        setTimeout(function () {
            res.json({
                status: 1,
                data: todos,
            })
        })
    }
};
