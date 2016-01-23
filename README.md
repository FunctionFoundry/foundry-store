# general-store

general-store is a general purpose state management library based on Facebook's Flux architecture.

Similar to flux it does not specify data fetching. This solution may be used with REST, SOAP or any other HTTP based protocol that your application demands. You may use XMLHTTPRequest, jQuery, fetch or any other mechanism that can asynchronously deliver data to a browser.

It is built on top of fluxury and functionfoundry.

## Getting Started

Option A) Install from npm.

```sh
$ npm install --save fluxury-general-store
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
