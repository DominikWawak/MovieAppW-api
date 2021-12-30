import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
const router = express.Router(); // eslint-disable-line
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';
import { mongo, Mongoose, set, Types } from 'mongoose';
import validator from 'validator';
import morgan from 'morgan';

/**
 * @swagger 
 * definitions:
 *  user:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: name of the user
 *     example: 'abc123@gmail.com'
 *    password:
 *     type: string
 *     description: password
 *     example: 'Secure123'
 */
 /**
   * @swagger
   * /api/users:
   *  get:
   *   description: get all the users
   *   responses:
   *     '200':
   *       description: all the users returned
   *  
   * 
   * 
   */
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
// router.post('/', asyncHandler(async (req, res) => {
//     if (req.query.action === 'register') {  //if action is 'register' then save to DB
//         await User(req.body).save()
//         res.status(201).json({
//             code: 201,
//             msg: 'Successful created new user.',
//         });
//     }
//     else {  //Must be authenticating the!!! Query the DB and check if there's a match
//         const user = await User.findByUserName(req.body.username);
//         if (user.comparePassword(req.body.password)) {
//             req.session.user = req.body.username;
//             req.session.authenticated = true;
//             res.status(200).json({
//                 success: true,
//                 token: "temporary-token"
//               });
//         } else {
//             res.status(401).json('authentication failed');
//         }
//     }
// }));
// Register OR authenticate a user

/**
 * @swagger
 * /api/users/?action=register:
 *  post:
 *   summary: add/register a users
 *   description: create or log in
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions'
 *   responses:
 *    200:
 *     description: created sucessfully
 *    
 */
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
    }
    if (req.query.action === 'register') {
        if((/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(req.body.password)) && validator.isEmail(req.body.username)){
            await User.create(req.body).catch(next);}
        else{
            res.status(401).json({code: 401,msg: 'Authentication failed. Password to weak or not a valid email'});
        }
      res.status(201).json({code: 201, msg: 'Successful created new user.'     });
    } else {
      const user = await User.findByUserName(req.body.username).catch(next);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({code: 401,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));

router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    //tempFav = awaituser.favourites
    //console.log(tempFav)
    //await user.favourites=Set(tempFav)
    
    if(!(await user.favourites.includes(movie._id))){
        await user.favourites.push(movie._id);
    }
    await user.save(); 
    res.status(201).json(user); 
  }));


  /**
   * @swagger
   * /api/{username}/favourite:
   *  post:
   *   summary: add a movie to favourites
   *   
   *   requestBody:
   *    required: true
   *    content:
   *      application/json:
   * 
   *   responses:
   *     '200':
   *       description: Favourite added
   *  
   * 
   * 
   */
  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    res.status(201).json(user.favourites);
  }));

  //Delete

  //
  /**
   * @swagger
   * /{userName}/favourites/{id}:
   *  delete:
   *   description: delete a favourited movie
   *   response:
   *   '200':
   *     description: deleted sucessfully
   * 
   */
  router.delete('/:userName/favourites/:id', asyncHandler(async (req, res) => {
    
    const userName = req.params.userName;
    const id = req.params.id;
    
    const user = await User.findByUserName(userName);
    const movie = await movieModel.findByMovieDBId(id);
   
    User.findOneAndUpdate({_id:user._id},{
      $pullAll:{favourites:[Types.ObjectId(movie._id)]}},
      {new:true},
      function(err, data) {} 

    )

    
  
    await user.save(); 
    res.status(201).json(user); 
  }));

  router.post('/:userName/watchlist', asyncHandler(async (req, res) => {
    const newMovie = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newMovie);
    const user = await User.findByUserName(userName);
    //tempFav = awaituser.favourites
    //console.log(tempFav)
    //await user.favourites=Set(tempFav)
    
    if(!(await user.watchlist.includes(movie._id))){
        await user.watchlist.push(movie._id);
    }
    await user.save(); 
    res.status(201).json(user); 
  }));

  router.get('/:userName/watchlist', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('watchlist');
    res.status(201).json(user.watchlist);
  }));
  router.post('/:userName/friends', asyncHandler(async (req, res) => {
    const newFriend = req.body.id;
    const userName = req.params.userName;
    const friend = await User.findByUserId(newFriend);
    const user = await User.findByUserName(userName);
    //tempFav = awaituser.favourites
    //console.log(tempFav)
    //await user.favourites=Set(tempFav)
    
    if(!(await user.friends.includes(friend._id))){
        await user.friends.push(friend._id);
    }
    await user.save(); 
    res.status(201).json(user); 
  }));

  router.get('/:userName/friends', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('friends');
    res.status(201).json(user.friends);
  }));


export default router;