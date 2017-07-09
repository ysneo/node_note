const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    const errorMsg = { 'error': 'An error has occurred' }

    app.post('/notes', (req, res) => {
        const Body = req.body
        if (!Body.title) return res.send('You can\'t let title empty.')
        const note = {
            text: Body.body,
            title: Body.title
        }
        db.collection('note').insert(note, (error, result) => {
            if (error) {
                res.send(errorMsg)
            } else {
                console.log(result);
                res.send(result.ops[0])
            }
        })
    })

    app.get('/notes?id=', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send(errorMsg)
            } else {
                res.send(item)
            }
        })
    })
}