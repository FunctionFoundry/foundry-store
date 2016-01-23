import {createStore, dispatch} from 'fluxury'
import * as Box from 'functionfoundry'
import {FILTER, SORT} from 'functionfoundry'

function GeneralStore(methods={}, actions={}) {
  return createStore(
    'GeneralStore',
    {
      data: {},    // { investments: [{ investmentType: 'Debt' }]}
      filters: [], // [{ table: 'investments', field: 'investmentType', op: 'gt', value: ['typeA', 'typeB'] }]
      orderBy: [], // [{ table: 'investments', field: 'investmentType', asc: true }]
    },
    {
      set: (state, newData) => Object.assign(
        {},
        state,
        { data: Object.assign({}, state.data, newData)}
      ),

      // Filter data format
      // [{ field: 'a', op: 'eq', value: ''}]
      setFilter: (state, data) => {

        if (typeof data !== 'object') {
          throw Error('data must be object')
        }

        let filters = state.filters
        .filter(n => n.table === action.data.table && n.field !== action.data.field)
        .concat(data);

        return Object.assign({}, state, { filters: filters })

      },
      setFilters: (state, filters) => Object.assign({}, state, {filters}),
      setOrderBy: (state, orderBy) => Object.assign({}, state, {orderBy})
    },
    Object.assign(
      {},
      methods,
      {
        all: (state) => state.data,
        get: (state, param) => {

          if (state.filters.length === 0 && state.orderBy.length === 0) {
            return state.data[param]
          }

          // reduce filter to true / false values for each field
          let filters = state.filters
          .filter( n => n.table === param)
          .map( (filter) => {
            return state.data[param]
            .map(n => {

              if (filter.field) {
                return n[filter.field]
              }

              return n;
            })
            .map(n => {
              let f = Box[filter.op.toUpperCase()];

              if (typeof f !== 'function') {
                throw `${filter.op} is not supported by functionfoundry!`
              }

              return f(n, filter.value)

            })
          }),

          // reduce the order by statements into a flattened array.
          orderBy = state.orderBy
          .filter( n => n.table === param)
          .reduce((a, b) => {

            return a.concat([b.fieldName, !b.asc])

          }, [])

          return SORT(
            FILTER( state.data[param], ...filters ),
            ...orderBy
          )
        }
      }
    )
  )
}

module.exports = GeneralStore
