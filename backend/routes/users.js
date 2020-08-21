const router = require('express').Router();
const Subers =  require('../models/subers.model');
const { response, query } = require('express');

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

router.get('/:page/:size?', asyncHandler(async (req, res) => {
      const page = parseInt(req.params.page);
      const size = parseInt(req.params.size);
      const Qgender = parseInt(req.query.gender);
      const Qdob = parseInt(req.query.dob);
      let Mquery;
      let querySort = {};

      if (Qgender)
        querySort.gender = Qgender;

      if(Qdob)
        querySort.dob = Qdob;

      if (req.query.search) {
        Mquery = {username: new RegExp(req.query.search, "i")};
      } else {
        Mquery = {}
      }

      if (page < 0 || page === 0) {
        res.json({message: "page shoudn't be 0"})
      }else {
        await Subers.find(Mquery)
                  .sort(querySort)
                  .limit(size)
                  .skip(size * (page - 1))
                  .exec(function(err, events) {
                    if(err) {
                      res.json(res.status(400).json(`Error : ${err}`))
                    }
                    Subers.countDocuments().exec(function(err, count) {
                      res.json({
                          events: events,
                          page: page,
                          pages: Math.ceil( count / size)
                      })
                  })
                })
      }
}));


router.get('/id/:id', asyncHandler(async (req, res) => {
  const user =  await Subers.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Error : ${err}`));
}))

router.post('/new', asyncHandler( async (req, res) => {
  const user = {
          username :  req.body.username,
          email : req.body.email,
          dob : req.body.dob,
          news : req.body.news,
          gender : req.body.gender,
          photo : req.body.photo,
        };
  const newUser =  new Subers(user);
  await newUser.save()
    .then(() => res.json('Subscriber Add!'))
    .catch(err => res.status(400).json(`Error : ${err}`));
}));

router.put('/:id', asyncHandler(async (req, res) => {
  await Subers.findById(req.params.id)
    .then(async user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.dob = req.body.dob;
      user.news = req.body.news;
      user.gender = req.body.gender;
      user.photo = req.body.photo;
      await user.save()
        .then(() => res.json('Subscriber updated!'))
        .catch(err => res.status(400).json(`Error : ${err}`))
    }).catch(err => res.status(400).json(`Error : ${err}`))
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  await Subers.findByIdAndDelete(req.params.id)
    .then(() => res.json('Subscriber Deleted'))
    .catch(err => res.status(400).json(`Error : ${err}`))
}))


module.exports = router;