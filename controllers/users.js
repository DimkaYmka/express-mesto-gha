const userSchema = require('../models/user');

module.exports.getUsers = (req, res) => {
  userSchema.find({})
    .then((users) => res.status(200).send(users)) // console.log(users) )
    .catch((err) => res.status(500).send({ message: err.message })); // console.log(err) )
};

module.exports.getUser = (req, res) => {
  userSchema.findById(req.params.id)
    .then((user) => res.status(200).send(user)) // console.log(user) )
    .catch((err) => res.status(500).send({ message: err.message })); // console.log(err) )
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema.create({ name, about, avatar })
    .then((user) => res.status(201).send(user)) // console.log(user) )
    .catch((err) => res.status(500).send({ message: err.message })); // console.log(err) )
};





// const getUsers = (req, res) => {
//   res.status(200).send(users)
// }

// const getUser = (req, res) => {
//   const {id} = req.params;
//   const user = users.find((item) => item.id === Number(id));

//   if (user) {
//     return res.status(200).send(user)
//   }
//   return res.status(404).send({message: 'User not found'})
// }

// const createUser =(req, res) => {
//   id += 1;
//   const newUser = {
//     id,
//     ...req.body,
//   };

//   users.push(newUser);
//   res.status(201).send(newUser)
// }

// module.exports = { getUsers, getUser, createUser}