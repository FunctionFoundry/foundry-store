# general-store

general-store is a general purpose state management library based on Facebook's Flux architecture.

It is built on top of fluxury and functionfoundry.

## Why build general-store?

General purpose data management capability. Libraries like redux have done a lot to educate people about the reducer pattern. This library seeks to make that easier to use.

It offers general purpose filter and sort along with a formula language and function library similar to the spreadsheets that everyone uses today.

It is intended for use with React.js which keeps the DOM in sync with the general-store.

Similar to flux it does not specify data fetching. This solution may be used with REST, SOAP or any other HTTP based protocol that your application demands. You may use XMLHTTPRequest, jQuery, fetch or any other mechanism that can asynchronously deliver data to a browser.

## Getting Started

Option A) Install from npm.

```sh
$ npm install --save fluxury-general-store
```

Require into your project.

```js
var store = require('fluxury-general-store') // Node.js / browserify / webpack
// or
import store from 'fluxury-general-store' // ES6 syntax
```

Option B) Install from dist folder.

```HTML
<html>
  <head>
    <script src="/path/to/general-store.js"><script>
    ...
```
