import express, { request, response } from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
const router = express.Router(); // eslint-disable-line
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';
import { mongo, Mongoose, set, Types } from 'mongoose';
import validator from 'validator';
import morgan from 'morgan';
import Speakeasy from 'speakeasy'
import dotenv from 'dotenv'
import { use } from 'passport';

dotenv.config();

let jwtOptions = {};
jwtOptions.secretOrKey = process.env.SECRET;
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
   * /api/users?action=register:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: body
   *        name: username
   *        type: string
   *        description: Registering
   *        schema:
   *          type: string
   *          required: 
   *            - username
   *          properties:
   *            username:
   *              type: string
   *              default: user123
   *            password:
   *              type: string
   *              default: password123
   *              minimum: 5
   *    responses:
   *      '201':
   *         description: 'Created'
   *
   *
   *
   *
   * 
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

  router.put('/passwordReset/:username',asyncHandler( async (req, res, next) => {
    if ( !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
    }
    var password = ""
    const user =await  User.findByUserName(req.params.username)
        
        if((/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(req.body.password)) ){
        
        await user.updateOne(req.body)
            await User.updateOne({
              username:req.params.username,
            }, req.body)
            
            res.status(201).json({code: 201, msg: 'Password reset'});
          }
            
        else{
            res.status(401).json({code: 401,msg: 'Password is too weak'});
        }
     
  
  }));
  //update user
router.put('/:username', async (req, res) => {
    //if (req.body.username) delete req.body.username;
    const result = await User.updateOne({
        username: req.params.username,
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

  // get user by username
  router.get('/:userName', asyncHandler(async (req, res) => {
   
    const userName = req.params.userName;
 
    const user = await User.findByUserName(userName);

    await user.save(); 
    res.status(201).json(user); 
  }));


  router.post("/totp-secret",(request,response,next) =>{
    var secret = Speakeasy.generateSecret({length:20});
    response.send({"secret":secret.base32})
  })

  router.post("/totp-generate",(request,response,next) =>{
    response.send({
      "token":Speakeasy.totp({
        secret: request.body.secret,
        encoding: "base32"
      }),
      "remaining":(30 - Math.floor((new Date().getTime()/1000.0 %30)))
    })
  })

  router.post("/totp-validate",(request,response,next) =>{
    response.send({
      "valid": Speakeasy.totp.verify({
        secret:request.body.secret,
        encoding:"base32",
        token:request.body.token,
        window:0
      })
    })
  })

  
 /**
   * @swagger
   * /api/users/{username}/favourites:
   *   get:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: username
   *        type: string
   *        default: k123@gmail.com
   *        description: getting all the favourites from a user
   *    responses:
   *      '201':
   *        description: Returning all movies that the user likes
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

 /**
   * @swagger
   * /api/users/{userName}/favourites:
   *   delete:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: path
   *        name: userName
   *        default: k123@gmail.com
   *      - in: body
   *        name: id
   *        type: string
   *        description: Deleting from Favourites
   *        schema:
   *          type: string
   *          required: 
   *            - id
   *          properties:
   *            id:
   *              type: string
   *              default: 568124
   *    responses:
   *      '201':
   *         description: 'Favourite has been deleted'  
  
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


  // Reset Password 

  router.post('/forgot-password', asyncHandler( async (req, res) => {
    const email = req.body.email;
    const user = await User.findByUserName(email);
    const secret=jwt.secret+user.password
    const payload={
      email:email,
      id:user._id

    }

    const token = jwt.sign(payload,secret,{expiresIn:'15m'})
    //const link = `http://localhost:3000/api/users/reset-password/${user._id}/${token}`
 
    res.status(201).json(token);
  }));


  router.get('/reset-password/:username/:token', asyncHandler( async (req, res) => {
 //user id
  const{username,token} = req.params;
  const user = await User.findByUserName(username);
  const secret = jwt.secret+user.password
  try {
    const payload = jwt.verify(token,secret)
    res.status(201).json({email:user.username});
  } catch (error) {
    res.status(404).json(error.message);
  }
  
  }));







export default router;