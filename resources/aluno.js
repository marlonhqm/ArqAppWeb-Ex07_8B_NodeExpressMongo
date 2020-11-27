const express = require('express')
const Aluno = require('../models/aluno') 


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find()

    return res.send(alunos)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
})

router.get('/:id', getAluno, async (req, res) => {
  
  res.json(res.aluno)
})

router.post('/', async (req, res) => {
  
  const aluno = new Aluno({
    matricula: req.body.matricula,
    anoSemestreDeEntrada: req.body.anoSemestreDeEntrada,
    nomeCompleto: req.body.nomeCompleto,
    Curso: req.body.Curso
  })

  try {
    const created = await aluno.save()

    res.status(201).json(created)
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

router.patch('/:id', getAluno, async (req, res) => {
  if (req.body.matricula != null) {
    res.aluno.matricula = req.body.matricula
  }
  if (req.body.anoSemestreDeEntrada != null) {
    res.aluno.anoSemestreDeEntrada = req.body.anoSemestreDeEntrada
  }
  if (req.body.nomeCompleto != null) {
    res.aluno.nomeCompleto = req.body.nomeCompleto
  }
  if (req.body.Curso != null) {
    res.aluno.Curso = req.body.Curso
  }

  try {
    const update = await res.aluno.save()

    res.json(update)
  } catch (error) {
    res.status(400).json({message: err.message})
  }

})

router.delete('/:id', getAluno, async (req, res) => {

  try {
    await res.aluno.remove()

    res.json({message: 'Aluno Deletado com Sucesso'})
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

// middleware
async function getAluno(req, res, next) {
  let aluno
  try {
    aluno = await Aluno.findById(req.params.id)

    if (aluno == null) {
      return res.status(404).json({message: 'Aluno não encontrado'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.aluno = aluno

  next()
}

module.exports = router

