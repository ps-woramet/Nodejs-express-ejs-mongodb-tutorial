var Userdb = require('../model/model')

//create and save new user
// POST http://localhost:3000/api/users
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({messge: 'contact can not be empty'})
        return 
    }
    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    console.log(user)

    // save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add_user')
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Some error occurred while creating a create operation'})
        })
}

// retrieve and return all users/ retrive and return a single user
// GET http://localhost:3000/api/users
// GET http://localhost:3000/api/users?id=64d4cc8fa4a70ca802a1602e
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: 'Not found user with id' + id})
                }else{
                    res.send(data)
                }
            }).catch(err=> {
                res.status(500).send({message: 'Error retrieving user with id' + id})
            })
    }
    else{
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
            .catch(err=>{
                res.status(500).send({message:err.message || 'Error Occurred while retriving user information'})
            })
    }
}

// update a new idetified user by user id
// PUT http://localhost:3000/api/users/64d4cc8fa4a70ca802a1602e
exports.update = (req, res) => {
    if (!req.body){
        return res
        .status(400)
        .send({message: 'Data to update can not be empty'})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot Update user with ${id} Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: 'error update user information'})
    })
}

// Delete a user with spacified user id in the request
// Delete http://localhost:3000/api/users/64d4d06f78494a62aaa30bb9
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if (!data){
            res.status(404).send({message: `Cannot Delete with id ${id} Maybe id is wrong`})
        }else{
            res.send({
                message: 'User was deleted successfully'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'Could not delete User with id =' + id
        })
    })
}