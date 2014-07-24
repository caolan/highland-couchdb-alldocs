var _ = require('highland');
var couchr = require('highland-couchr');


function alldocs(dburl, batchsize, include_docs) {
    var curr;
    return _(function (push, next) {
        var opt = {
            limit: batchsize,
            include_docs: true
        };
        if (curr) {
            opt.start_key = JSON.stringify(curr);
            opt.skip = 1;
        }
        var req = couchr.get(dburl + '/_all_docs', opt);
        req.errors(push).apply(function (res) {
            var rows = res.body.rows;
            curr = rows[rows.length - 1].id;
            rows.forEach(function (r) {
                push(null, r);
            });
            if (rows.length < batchsize) {
                // no more ids
                push(null, _.nil);
            }
            else {
                next();
            }
        });
    });
};

exports.ids = function (dburl, batchsize) {
    return alldocs(dburl, batchsize || 200, false).map(function (row) {
        return row.id;
    });
};

exports.docs = function (dburl, batchsize) {
    return alldocs(dburl, batchsize || 20, true).map(function (row) {
        return row.doc;
    });
};
