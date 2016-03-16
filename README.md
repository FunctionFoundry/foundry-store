# foundrystore : UNSTABLE

foundrystore is a general purpose state management built on FunctionFoundry and Fluxury.

It is like a workbook in spreadsheet land; along with a similar formula language to manipulate it.

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
import {COMPILE as compile} from 'functionfoundry'
var store = createStore()
store.setState({ key: 'value' })
store.get('key')


store.setState({ todos: { c: true, m: 'Feels' } }) // c is for checked and m for message
store.setFilter('todos!m = "so good"')
store.get('todos') // => [{ m: 'so good' }]
store.get('todos!m') // => 'so good'

// it can reference tabular data and supports calculated fields
store.setState({
  worksheet: {
    A1: 1,
    A2: 2,
    A3: compile('=A1+A2')
  }
})

// and it accepts tabular data
store.setState([
  [
    [1],
    [2],
    [compile('=A1+A2')]
  ]
])
```

## Advanced Usage

Crazy peanut butter sandwhich kunju ninja code.

```js
// Add custom query methods
var store = createStore({
  combineTodos: (state) => state.todos.map(d => d.m).join(' ')
  getCheckedCount: (state) => state.todos.filter(d => d.c).length
}, {
  setTodos: (todos) => {
    this.setState({ todos: todos })
  }
})

store.setTodos([{ c: true, m: 'Feels' }, { c: true, m: 'so good' }])

store.combineTodos() // => 'Feels so good'
store.getCheckedCount() // => 1
```
