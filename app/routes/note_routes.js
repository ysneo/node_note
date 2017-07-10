const ObjectID = require('mongodb').ObjectID

module.exports = function (app, db) {
    const myCollection = db.collection('note')
    const errorMsg = { 'error': 'An error has occurred' }

    // https://docs.mongodb.com/manual/reference/method/js-collection/
    // to create a new note in collection    
    app.post('/notes', (req, res) => {
        const Body = req.body
        if (!Body.title) return res.send('You can\'t let title empty.')
        const note = {
            text: Body.body,
            title: Body.title
        }
        myCollection.insert(note, (error, result) => {
            if (error) {
                res.send(errorMsg)
            } else {
                // console.log(result);
                res.send(result.ops[0])
            }
        })
    })

    // to get a document in collection  
    const getId = (req) => {
        const id = req.params.id
        return { '_id': new ObjectID(id) }
    }

    app.get('/notes/:id', (req, res) => {
        myCollection.findOne(getId(req), (err, item) => {
            if (err) {
                res.send(errorMsg)
            } else {
                res.send(item)
            }
        })
    })

    // to delete a document in collection
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        myCollection.remove(getId(req), (err, item) => {
            if (err) {
                res.send(errorMsg)
            } else {
                console.log(item);
                res.send(`Note ${id} deleted!`)
            }
        })
    })

    // to modify a document in collection which is already exist
    // todo: if you fail to supply a body or title,
    // the PUT request will nullify those fields on the note in the database.
    app.put('/notes/:id', (req, res) => {
        const Body = req.body
        const note = {
            title: Body.title,
            text: Body.body
        }
        myCollection.update(getId(req), note, (err, result) => {
            if (err) {
                res.send(errorMsg)
            } else {
                res.send(note)
            }
        })
    })
}