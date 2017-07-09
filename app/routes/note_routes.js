module.exports = function (app, db) {
    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        }
        db.collection('note').insert(note, (error, result) => {
            if (error) {
                res.send({ 'error': 'An error has occurred' })
            } else {
                res.send(result.ops[0])
            }
        })
    })

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': id }
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' })
            } else {
                res.send(result.ops[0])
            }
        })
    })
}