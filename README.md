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

// return a stream of all documents in db, fetching 20 at a time
var docs = alldocs.docs(db, 20);

// you can also use Highlands error handling methods,
// eg, stop processing on first request error:
docs.stopOnError(function (err) {
    console.error('Something broke');
});
```
