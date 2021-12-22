import express from 'express';

import uniqid from 'uniqid';
import Review from './reviewModel'

import asyncHandler from 'express-async-handler';

const router = express.Router(); 



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


//Post a movie review
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