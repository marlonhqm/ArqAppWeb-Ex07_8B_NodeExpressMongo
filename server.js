const express = require('express')
const mongoose = require('mongoose') 
const cursoRouter = require('./resources/curso')
const alunoRouter = require('./resources/aluno')


require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)

const app = express()
const db = mongoose.connection

app.use(express.json())

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use('/v1/cursos', cursoRouter)
app.use('/v1/alunos', alunoRouter)


app.listen(3000, function () {
  console.log('Server is running port 3000')
})