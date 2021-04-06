// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()

const urlRequest = '/api/users'

server.use(express.json())

// POST - /api/users
server.post(urlRequest, (req,res) => {

  const userData = req.body

  if(!userData.name || !userData.bio){
    res.status(422).json({message: "need valid name and bio"})
  }

  Users.insert(userData)
    .then(user => {
      if(!user){
        res.status(422).json({message: "the user doesnt exist"})
      }else{
        res.status(200).json(user)
      }
    })
    .catch(err => res.status(500).json({message: 'user not inserted'}))

})

// GET - /api/users
server.get(urlRequest, (req,res) => {

  Users.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({message: 'there are no users'}))

})

// GET - /api/users/:id
server.get(`${urlRequest}/:id`, (req,res) => {

  const {id} = req.params
  console.log(id)

  if(!id){
    res.status(404).json({message: "user not found"})
  }

  Users.findById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({message: "user doesnt exist"}))

})

// DELETE - /api/users/:id
server.get(`${urlRequest}/:id`, (req,res) => {

  const {id} = req.params
  if(!id){
    res.status(500).json({message: 'no id found'})
  }

  Users.remove(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({message: 'sorry cant delete it'}))

})

// PUT - /api/users/:id
server.get(`${urlRequest}/:id`, async (req,res) => {

  const {id} = req.params
  const updateData = req.body

  try {

    if(!updateData.name || !updateData.bio){
      res.status(422).json({message: "need both name and bio"})
    }else{
      const updatedUser = await Users.update(id, updateData)

      if(!updatedUser){
        res.status(422).json({message: 'user doesnt exist'})
      }else{
        res.status(200).json(updatedUser)
      }
    }



  } catch (error) {
    res.status(500).json({message: 'sorry couldnt update'})
  }

})



server.get('*', (req,res) => {
  console.log('Server is up i guess, welcome')
  res.send({message: 'slow beans'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
