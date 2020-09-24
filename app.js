const express = require('express')
const mongoose = require('mongoose')


const app = express()

app.use(express.json({ extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/collection', require('./routes/collection.routes'))

if (process.env.NODE_ENV == 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 8080

async function start(){
    try{

        await mongoose.connect("mongodb+srv://surta:123@cluster0.nqkum.azure.mongodb.net/mydb?retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(console.log("Mongo"))

        app.listen(PORT, () => console.log(`App has been started ${PORT}...`))
    }
     catch(e){
        console.log('Server error.', e.message)
        process.exit(1)
    }
}

start()