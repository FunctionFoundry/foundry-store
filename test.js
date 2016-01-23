var test = require('tape');

test('GeneralStore', function(t) {

  t.plan(10)

  var buildGeneralStore = require('./index')

  // For when switch cases seem like overkill.
  var store = buildGeneralStore({
    get: (state, param) => state[param],
  });

  t.equal(typeof store.set, 'function')
  t.equal(typeof store.get, 'function')

  store.set({ states: ['CA', 'OR', 'WA'] })

  store.set({ programs: [{ name: 'A', states: ['CA'] }, { name: 'B', states: ['OR'] }] })
  store.set({ selectedState: 'CA' })

  t.deepEqual( store.get('states'), ['CA', 'OR', 'WA']  );
  t.deepEqual( store.get('programs'), [{ name: 'A', states: ['CA'] }, { name: 'B', states: ['OR'] }] );
  t.deepEqual( store.get('selectedState'), 'CA' );

  store.setFilters([{
    table: 'states',
    op: 'EQ',
    value: 'CA'
  }])

  // console.log(store.getState())

  t.deepEqual( store.get('states'), ['CA']  );

  store.setFilters([{
    table: 'programs',
    field: 'name',
    op: 'EQ',
    value: 'A'
  }])

  t.deepEqual( store.get('programs'), [{ name: 'A', states: ['CA'] }]  );

  store.setFilters([{
    table: 'states',
    op: 'eq',
    value: 'OR'
  }])

  t.deepEqual( store.get('states'), ['OR']  );


  store.setFilters([{
    table: 'states',
    op: 'IN',
    value: ['OR','WA']
  }])

  t.deepEqual( store.get('states'), ['OR', 'WA']  );

  store.setOrderBy([{
    table: 'states',
    field: 0,
    asc: false
  }])

  t.deepEqual( store.get('states'), ['WA', 'OR']  );

})
