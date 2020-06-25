const Mock = require('mockjs');
const Random = Mock.Random;
const mock = Mock.mock;

const proxy = {
    'GET /api/todos': {
        'code': 0,
        'msg': '成功',
        'data':mock({
          'list|3': [
              {
                  'id': '@id',
                  'title': '@cname',
                  'completed|1-2': true,
              },
          ],
        })


        // [{
        //     name: Random.cname(),
        //     userId: Random.id(),
        //     date: Random.date('yyyy-MM-dd')
        // }]
    },
    'GET /api/test': {
        name: Random.cname(),
        userId: Random.id(),
        date: Random.date('yyyy-MM-dd'),
    },
    'GET /api/user/list': mock({
        'array|3': [
            {
                id: 1,
                username: 'kenny',
                sex: 'male',
            },
        ],
    }),
    /**
     * @param {express.Request} req
     * @param {express.Response} res
     */
    'POST /api/login/account': (req, res) => {
        return res.json({
            status: 'ok',
            data: {
                id: Random.id(),
                userName: Random.cname(),
                city: Random.city(),
            },
        });
    },
};
module.exports = proxy;
