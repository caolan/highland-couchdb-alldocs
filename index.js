var _ = require('highland');
var couchr = require('highland-couchr');


exports.ids = function (dburl, batchsize) {
    var curr;
    return _(function (push, next) {
        var opt = {limit: batchsize};
        if (curr) {
            opt.start_key = JSON.stringify(curr);
            opt.skip = 1;
        }
        var req = couchr.get(dburl + '/_all_docs', {limit: batchsize});
        req.errors(push).apply(function (res) {
            var rows = res.body.rows;
            rows.forEach(function (r) {
                push(null, r.id);
            });
            if (rows.length < batchsize) {
                // no more ids
                push(null, _.nil);
            }
            else {
                curr = rows[rows.length - 1].id;
                next();
            }
        });
    });
};

exports.docs = function (dburl, /*optional*/idbatch) {
    var n = idbatch || 100;
    return exports.ids(dburl, n).map(function (id) {
        var url = dburl + '/' + encodeURIComponent(id);
        return couchr.get(url, {}).pluck('body');
    });
};
