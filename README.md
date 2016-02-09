# foundrystore

foundrystore is a general purpose state management built on FunctionFoundry and Fluxury.

It manages an object tree which may be manipulated with a formula language.

## Getting Started

Option A) Install from npm.

```sh
$ npm install --save foundrystore
```

Require into your project.

```js
var createStore = require('foundrystore') // Node.js / browserify / webpack
// or
import createStore from 'foundrystore' // ES6 syntax
```

Option B) Install from dist folder.

```HTML
<html>
  <head>
    <script src="/path/to/foundrystore.js"><script>
    ...
```

## Getting data

This library does not specify data fetching. Use jQuery, XHR, fetch, websockets and other solution to access data.

## Basic Usage

```js
var store = createStore()
store.set({ key: 'value' })
store.get('key')


store.set({ todos: [{ c: true, m: 'Feels' }, { c: true, m: 'so good' }]}) // c is for checked and m for message
store.setFilter({
  table: 'todos',
  field: 'm',
  op: 'eq',
  value: 'so good'}
)
store.get('todos') // => [{ m: 'so good' }]
```

## Advanced Usage

```js
// Add custom query methods
var store = createStore({
  combineTodos: (state) => state.todos.map(d => d.m).join()
  getCheckedCount: (state) => state.todos.filter(d => d.c).length
}, {
  setTodos: (todos) => {
    this.set({ todos: todos })
  }
})


store.setTodos([{ c: true, m: 'Feels' }, { c: false, m: 'so good' }])
// of store.set({ todos: [{ c: true, m: 'Feels' }, { c: false, m: 'so good' }] })


store.combineTodos() // => 'Feels so good'
store.getCheckedCount() // => 1
```
