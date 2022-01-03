# Assignment 2 - Web API.

Name: Dominik Wawak - 20089042 

## Brief.
This app uses my own api design based of the web app development labs and adds to it in many ways. This app also builds on my first react movie app assignment that adds some features that I wanted to implement such as making the app more social by adding users and seeing their watchlists, favourites and reviews.

## Features and Extra Featurees

 + Feature 1 - modified the user schema to also have the watchlist and friends arrays as reflected on in assignment 1.
 + Feature 2 - Login/Signup message error handling displaying messages when incorrect email or password is entered to inform the user that the site did not crash. 
+ Feature 3 - two factor authentication with a passcode, reset password with token almost complete.
 + Feature 4 - added a review schema for user reviews to store in mongo.
 + Feature 5 - middleware added such as helmet to hide some headers for security purposes and morgan for logging of the api in the console with custom options.
 + Feature 6 - API documentation with swagger, not fully covers the whole api.
+ Feature 7 - Recomendation algorithm almost complete, not fully tested no output to user.
+ Feature 8 - Movies are first fetched from tmdb and then saved to my mongo where theyre queried.



## Installation Requirements

node version : Node.js v17.2.0
npm version : npm@8.1.4
MongoDB shell version v5.0.2 

extra modules:  
For movie api:  
├──babel-cli@6.26.0  
├── babel-eslint@10.1.0  
├── babel-preset-env@1.7.0  
├── bcrypt-nodejs@0.0.3  
├── dotenv@10.0.0  
├── eslint@8.2.0  
├── express-async-handler@1.2.0  
├── express-session@1.17.2  
├── express@4.17.1  
├── helmet@4.6.0  
├── jsonwebtoken@8.5.1  
├── mongoose@6.0.13  
├── morgan@1.10.0  
├── node-fetch@2.6.6  
├── nodemon@2.0.15  
├── passport-jwt@4.0.0  
├── passport@0.5.0  
├── speakeasy@2.0.0  
├── swagger-jsdoc@6.1.0  
├── swagger-ui-express@4.3.0  
├── uniqid@5.4.0  
├── unqid@1.0.1  
└── validator@13.7.0  




Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/DominikWawak/MovieAppW-api.git
```

followed by installation in the project directory of the movie api and the react app

```bat
npm install
```



## API Configuration
You will need to create .env files in the api folder like so:  

```bat
NODE_ENV=development
PORT=8080
HOST=127.0.0.1 
mongoDB=YourMongoURL like mongodb://127.0.0.1:27017/movies_db  
seedDb=false - depends whether you want the database to have default data at start, the data is in the seed folder.  
secret=YourJWTSecret
TMDB_KEY=<*your tmdb key* > 
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/tmdb/newMovies/:noPages |Gets a list of movies from tmdb and stores in my mongo database | N/A | N/A | N/A
| /api/users |Gets a list of users | logs in or creates a user | N/A | N/A
| /api/users/passwordReset/:username |N/A| N/A | changes the user password if the user forgets it|N/A
| /api/users/:username |N/A | N/A | updates a user | N/A
| /api/users/totp-secret |N/A | creates a secret token for user for two factor authentication | N/A | N/A
| /api/users/totp-validate |N/A | checks the secret token agains the code for two factor authentication | N/A | N/A
| /api/users/:userName/favourites/:id |N/A | N/A | N/A | Deletes the specified favaurite from the favourite array in the user document
| /api/users/:userName/watchlist |gets the watchlist of the specified user| N/A | N/A | N/A
| /api/users/forgot-password |N/A | generates a token with jwt for a user | N/A | N/A
| /api/users/reset-password/:username/:token' |verifies the specified token for secure password reset| N/A | N/A | N/A
| /api/reviews |gets reviews | adds a review| N/A | N/A
| /api/reviews/:username |gest all the reviews for a specific user| N/A | N/A | N/A
| /api/reviews/:id |N/A | N/A | updates a review mainly used for the likes feature | N/A


My swagger documentation is on my localhost however it is demonstrated in the video.


## Security and Authentication


My authentication builds on the basic authentication given to us from the labs by introducing what is becoming more and more popular in modern applications that is two factor authentication.   
This app upon registration gives the user a unique token with which the user can authenticate by using an app such as google authenticator.

The app has a dashboard what can only be seen once logged in, and the favourites,review,updateprofile pages are all private preventing the user from accesing them if theyre not registered.

Helmet middleware is added to add security to prevent people from seeing athe apps headers such as the fact that this app is using express.

## Integrating with React App

The React app is in this repo 

This is my changes movies method that fetches movies from tmdb and the stores them in mongo
~~~Javascript
// Changed to get the movies and save in mongo 
router.get('/tmdb/newMovies/:noPages', asyncHandler( async(req, res) => {
    const numPages = parseInt(req.params.noPages);
    const oldMovies = await movieModel.find()
    var allNewMovies=[]
    for (let i = 1; i < numPages+1; i++) {
        const newMovies = await getNewMovies();
        
        allNewMovies.push.apply(allNewMovies,newMovies.results)
      }

    await movieModel.insertMany(allNewMovies)
    
    res.status(200).json(allNewMovies);
  }));

  // in react
export const getMovies = (currentPage,limit) => {
    return fetch(
        `/api/movies/?page=${currentPage}&limit=${limit}`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };

 

~~~
The like feature is added by creating a new review schema
~~~Javascript
  const ReviewSchema = new Schema({
    MovieId: { type: Number,  unique: true, required: true},
    MovieTitle: {type: String },
    Author: {type: String, required: true },
    content:{type: String, required: true },
    rating:{type: String, required: true },
    likes: {type: Number},
    created_at:{type: String},
    updated_at:{type: String},
    

  });

//in react
export const updateReview = (id,likeCount) => {
    return fetch(`/api/reviews/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({ likes:likeCount})
    }).then(res => res.json())
};

~~~


More features are in the video demo
## Extra features

All the features are mentioned at the start, in react new features included are the options to view other users and see what the like and their watchlist as well as their reviews. The user reviews can also be liked. 


## Room for improvement

One area of improvement is adding a news feed of some sort to the app that would make this app more social.   
Finishing the features by adding a email service such as emailJS or nodeMailer.
Improving the over all aesthetics of the app.
Adding a more in depth and complex recommendation algorithm.

## Independent learning


In this project I learned more about jwt tokend with the password reset validation.
Also I learned how to integrate two factor authentication with the app.
I researched a lot of differernt node packages some that I havent used like the email services because of time constraints.  
I researched more middleware to improve security and add logs to the app.
I found how to add neat documentation with swagger ui.
