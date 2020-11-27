const express = require('express')
const Curso = require('../models/curso') 


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.find()

    return res.send(cursos)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
  
})

router.get('/:id', getCurso, async (req, res) => {
  
  res.json(res.curso)
})

router.post('/', async (req, res) => {
  
  const curso = new Curso({
    area: req.body.area,
    nome: req.body.nome,
    regime: req.body.regime,
    numeroDeSemestres: req.body.numeroDeSemestres
  })

  try {
    const created = await curso.save()

    res.status(201).json(created)
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

router.patch('/:id', getCurso, async (req, res) => {
  if (req.body.area != null) {
    res.curso.area = req.body.area
  }
  if (req.body.nome != null) {
    res.curso.nome = req.body.nome
  }
  if (req.body.regime != null) {
    res.curso.regime = req.body.regime
  }
  if (req.body.numeroDeSemestres != null) {
    res.curso.numeroDeSemestres = req.body.numeroDeSemestres
  }

  try {
    const update = await res.curso.save()

    res.json(update)
  } catch (error) {
    res.status(400).json({message: err.message})
  }

})

router.delete('/:id', getCurso, async (req, res) => {

  try {
    await res.curso.remove()

    res.json({message: 'Curso Deletado com Sucesso'})
  } catch (error) {
    res.status(500).json({message: err.message})
  }
})

// middleware
async function getCurso(req, res, next) {
  let curso
  try {
    curso = await Curso.findById(req.params.id)

    if (curso == null) {
      return res.status(404).json({message: 'Curso não encontrado'})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.curso = curso

  next()
}

// export
module.exports = router

