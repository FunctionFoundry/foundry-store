'use strict';

var _fluxury = require('fluxury');

var _functionfoundry = require('functionfoundry');

var Box = _interopRequireWildcard(_functionfoundry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function GeneralStore() {
  var methods = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var actions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return (0, _fluxury.createStore)('GeneralStore', {
    data: {}, // { investments: [{ investmentType: 'Debt' }]}
    filters: [], // [{ table: 'investments', field: 'investmentType', op: 'gt', value: ['typeA', 'typeB'] }]
    orderBy: [] }, // [{ table: 'investments', field: 'investmentType', asc: true }]
  {
    set: function set(state, newData) {
      return Object.assign({}, state, { data: Object.assign({}, state.data, newData) });
    },

    // Filter data format
    // [{ field: 'a', op: 'eq', value: ''}]
    setFilter: function setFilter(state, data) {

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
        throw Error('data must be object');
      }

      var filters = state.filters.filter(function (n) {
        return n.table === action.data.table && n.field !== action.data.field;
      }).concat(data);

      return Object.assign({}, state, { filters: filters });
    },
    setFilters: function setFilters(state, filters) {
      return Object.assign({}, state, { filters: filters });
    },
    setOrderBy: function setOrderBy(state, orderBy) {
      return Object.assign({}, state, { orderBy: orderBy });
    }
  }, Object.assign({}, methods, {
    all: function all(state) {
      return state.data;
    },
    get: function get(state, param) {

      if (state.filters.length === 0 && state.orderBy.length === 0) {
        return state.data[param];
      }

      // reduce filter to true / false values for each field
      var filters = state.filters.filter(function (n) {
        return n.table === param;
      }).map(function (filter) {
        return state.data[param].map(function (n) {

          if (filter.field) {
            return n[filter.field];
          }

          return n;
        }).map(function (n) {
          var f = Box[filter.op.toUpperCase()];

          if (typeof f !== 'function') {
            throw filter.op + ' is not supported by functionfoundry!';
          }

          return f(n, filter.value);
        });
      }),

      // reduce the order by statements into a flattened array.
      orderBy = state.orderBy.filter(function (n) {
        return n.table === param;
      }).reduce(function (a, b) {
        return a.concat([b.fieldName, !b.asc]);
      }, []);

      return _functionfoundry.SORT.apply(undefined, [_functionfoundry.FILTER.apply(undefined, [state.data[param]].concat(_toConsumableArray(filters)))].concat(_toConsumableArray(orderBy)));
    }
  }));
}

module.exports = GeneralStore;
