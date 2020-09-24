const {Router} = require('express')
const Collection = require('../models/Collection')
const router = Router()

router.get('/collections', async (req, res) => {
    try{
        const collections = await Collection.find({owner: require.user.userId})
        res.json(links)
    } catch (e){
        res.status(500).json({message: 'Something went wrong, try again...'})
    }
})

router.post('/create', async (req, res) => {
    try {
        const {name, description, theme} = req.body
        const collection = new Collection({
            name, description, theme, owner: req.user.userId
        })
        await collection.save()
        await res.status(201).json({message: "Collection created"})
    } catch(e) {
        res.status(500).json({collection})
    }
})

router.get('/:id', async (req, res) => {
    try{
        const collections = await Collection.findById(req.params.id)
        res.json(links)
    } catch (e){
        res.status(500).json({message: 'Something went wrong, try again...'})
    }
})

module.exports = router