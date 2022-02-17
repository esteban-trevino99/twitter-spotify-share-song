const { deserialize } = require('./helpers')

class BaseController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.req.query = deserialize(this.req.getQuery());
    }
}

module.exports = BaseController;