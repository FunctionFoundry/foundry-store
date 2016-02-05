# foundry-store

foundry-store is a general purpose state management built on FunctionFoundry and Fluxury.

This library does not specify data fetching. Use jQuery, XHR, fetch, websockets and other common solutions to access data.

## Getting Started

Option A) Install from npm.

```sh
$ npm install --save foundry-store
```

Require into your project.

```js
var createStore = require('fluxury-general-store') // Node.js / browserify / webpack
// or
import createStore from 'fluxury-general-store' // ES6 syntax
```

Option B) Install from dist folder.

```HTML
<html>
  <head>
    <script src="/path/to/general-store.js"><script>
    ...
```

## Basic Usage

```js
var store = createStore()
store.set({ key: 'value' })
store.get('key')

store.set({ investments: [{ name: 'FundA' }, { name: 'FundB' }]})
store.setFilter({
  table: 'investments',
  field: 'name',
  op: 'eq',
  value: 'FundA'}
)
store.get('investments') // => [{ name: 'FundA' }]
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
