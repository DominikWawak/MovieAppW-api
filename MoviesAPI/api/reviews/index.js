import express from 'express';

import uniqid from 'uniqid';
import Review from './reviewModel'

import asyncHandler from 'express-async-handler';

const router = express.Router(); 

/**
 * @swagger 
 * definitions:
 *  review:
 *   type: object
 *   properties:
 *    MovieId:
 *     type: Number
 *     description: movie id from tmdb
 *     example: '671583'
 *    Author:
 *     type: string
 *     description: username of the user that created the review
 *     example: 'k123@gmail.com'
 *    content:
 *     type: string
 *     description: the review content
 *     example: 'Very good review'
 *    rating:
 *     type: string
 *     description: review on a scale from good to bad
 *     example: 'Average'
 *    likes:
 *     type: string
 *     description: number of users that like this review
 *     example: '8'
 */


 /**
   * @swagger
   * /api/reviews:
   *  get:
   *   description: get all the reviews
   *   responses:
   *     '200':
   *       description: all the reviews returned
   *  
   * 
   * 
   */

// Get movie reviews
router.get('/', async (req, res) => {
    
    const rev = await Review.find();
    res.status(200).json(rev);
    // find reviews in list

    // try  {
    //     res.status(200).json(movieReviews);
    // } exept{
    //     res.status(404).json({
    //         message: 'The resource you requested could not be found.',
    //         status_code: 404
    //     });
    // }
});

// get reviews for a user

 /**
   * @swagger
   * /api/reviews/{username}:
   *  get:
   *   consumes:
   *     - application/json
   *   parameters: 
   *      - in: path
   *        name: username
   *        type: string
   *        default: k123@gmail.com
   *        description: getting all the reviews from a user
   *   description: get all the reviews
   *   responses:
   *     '200':
   *       description: all the reviews returned
   *  
   * 
   * 
   */
router.get('/:username', async (req, res) => {
    const username= req.params.username;
    const reviews = await Review.findByUserName(username)
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    
    // find reviews in list

    // try  {
    //     res.status(200).json(movieReviews);
    // } exept{
    //     res.status(404).json({
    //         message: 'The resource you requested could not be found.',
    //         status_code: 404
    //     });
    // }
});

//Post a movie review
/**
   * @swagger
   * /api/reviews:
   *   post:
   *    consumes:
   *      - application/json
   *    parameters: 
   *      - in: body
   *        name: username
   *        type: string
   *        description: username
   *        schema:
   *          type: string
   *          required: 
   *            - Author
   *            - content
   *            - rating
   *            - movieId
   *          properties:
   *            Author:
   *              type: string
   *              default: k123@gmail.com
   *            content:
   *              type: string
   *              default: I really liked that movie it was fantastic   
   *            rating:
   *              type: string
   *              default: Very Good
   *            rating:
   *              type: Number
   *              default: 568124
   *              
   *    responses:
   *      '201':
   *         description: 'Created'
   *
 
   */
router.post('/', asyncHandler( async(req, res) => {
    // const id = parseInt(req.params.id);

    // if (movieReviews.id == id) {
    //     req.body.created_at = new Date();
    //     req.body.updated_at = new Date();
    //     req.body.id = uniqid();
    //     movieReviews.results.push(req.body); //push the new review onto the list
    //     res.status(201).json(req.body);
    // } else {
    //     res.status(404).json({
    //         message: 'The resource you requested could not be found.',
    //         status_code: 404
    //     });
    // }
    req.body.created_at = new Date();
    req.body.updated_at = new Date();
    req.body.likes = 0;
    req.body.id = uniqid();
    
    await Review.create(req.body)
    res.status(201).json(req.body);
    
    // if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(req.body.password)){
    //     await Review.create(req.body).catch(next);}
    // else{
    //     res.status(401).json({code: 401,msg: 'Authentication failed. Password to weak'});
    // }

}));


//Update revie ie add likes

router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Review.updateOne({
        id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'review Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update review' });
    }
});


export default router;