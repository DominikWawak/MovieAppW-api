export const logIn = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getMovies = (currentPage,limit) => {
    return fetch(
        `/api/movies/?page=${currentPage}&limit=${limit}`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };

  export const getFavourites = (username) => {
    return fetch(
        `/api/users/${username}/favourites`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };

  export const addFavourite = (username,movieId,movieTitle) => {
    return fetch(`/api/users/${username}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ id: movieId, title:movieTitle })
    }).then((res) => res.json());
};

export const deleteFavourite = (username,movieId) => {
    return fetch(`/api/users/${username}/favourites/${movieId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'delete',
       // body: JSON.stringify({ id: movieId })
    }).then(res => res.json())
};

export const getWatchList = (username) => {
    return fetch(
        `/api/users/${username}/watchlist`,{headers: {
            'Content-Type': 'application/json',
         'Authorization': window.localStorage.getItem('token'),
        
      }
    }
    ).then((res) => res.json());
  };

  export const addToWatchlist = (username,movieId) => {
    return fetch(`/api/users/${username}/watchlist`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token'),
            
        },
        method: 'post',
        body: JSON.stringify({ id:movieId })
        
    }).then(res => res.json());
};


export const getReviews= () => {
    return fetch(
        `/api/reviews/`,{ headers: {
            'Content-Type': 'application/json'
        },
    }
    ).then((res) => res.json());
  };

  export const getReviewOfUser= (username) => {
    return fetch(
        `/api/reviews/${username}`,{ headers: {
            'Content-Type': 'application/json'
        },
    }
    ).then((res) => res.json());
  };


  export const addReview = (username,movieId,content,movieRating) => {
    return fetch(`/api/reviews/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ MovieId: movieId, content:content,Author:username,rating:movieRating})
    }).then(res => res.json())
};

export const updateReview = (id,likeCount) => {
    return fetch(`/api/reviews/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({ likes:likeCount})
    }).then(res => res.json())
};

export const getFriends = (username) => {
    return fetch(
        `/api/users/${username}/friends`,{headers: {
            'Content-Type': 'application/json',
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };

  export const addFriends = (username,userId) => {
    return fetch(`/api/users/${username}/friends`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ id:userId})
    }).then(res => res.json())
};
export const getUsers = () => {
    return fetch(
        `/api/users`,{headers: {
            'Content-Type': 'application/json'
      }
    }
    ).then((res) => res.json());
  };
