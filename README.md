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

store.set({ investments: [{ name: 'FundA' }, { name: 'FundB' }]})
store.filter('investments', 'EQ(name, "FundA")')
store.get('investments') // => [{ name: 'FundA' }]
store.filter('investments', 'OR(EQ(name, "FundA"), EQ(name, "FundB"))')
store.sort('investments', 'name', 'desc')
store.get('investments') // => [{ name: 'FundB' }, { name: 'FundA' }]
```

## Advanced Usage

```js
// Add custom query methods
var store = createStore({
  getOpen: (state) => state.investments.filter(n => n.open).map(n => n.name)
  getOpenCount: (state) => state.investments.filter(n => n.open).length
}, {
  setInvestments: (investments) => {
    this.set({ investments: investments })
  }
})

store.setInvestments([{ name: 'FundA' open: false }, { name: 'FundB', open: true }])

store.getOpen() // => ['FundB']
store.getOpenCount() // => 1
```
