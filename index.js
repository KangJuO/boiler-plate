//install express module => can start with express function 
//install mongoose module => can connect to mongDB
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://KangJuO:13241324@boilerplate.z4gvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  
}).then(() =>  console.log('MongDB Connected...'))
  .catch(err => console.log(err ))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})