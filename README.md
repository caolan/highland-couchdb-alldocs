# highland-couchdb-alldocs

Provides a [Highland](http://highlandjs.org) Streams API for iterating over
all ids or documents in a CouchDB database.


```js
var alldocs = require('highland-couchr-alldocs');
var db = 'http://localhost:5984/mydb';


// return a stream of all ids in 'mydb' fetching 100 ids at a time
alldocs.ids(db, 100).each(function (id) {
    console.log('ID: ' + id);
});

// return a stream of unresolved requests for all documents in db
var docs = alldocs.docs(db);

// you can then sequence these as you like using the Highland stream API...

// fetch 10 docs at a time (still processing them in order)
docs.parallel(10).map(...).each(...);

// fetch docs in series
docs.series().map(...).each(...);

// you can also use Highlands error handling methods,
// eg, stop processing on first request error:
docs.series().stopOnError(function (err) {
    console.error('Something broke');
});
```
