import { actions } from "../constants/actionTypes";


// eslint-disable-next-line import/no-anonymous-default-export
export default  (posts = [], action) => {
    
    switch (action.type) {
        case   actions.FETCH_ALL:
            return action.payload;  //immediately return the data by accessing the payload (posts)
        //keyvalue from the dispatch function in the action.payload in getPosts()
        case actions.CREATE:
            return [...posts, action.payload];
        
        case actions.UPDATE:  //using the same logic for liking and updating a post
            case actions.LIKE:  //if action type is UPDATE, this will mean we have an id
            return posts.map((post) => //loop through the posts and check if the id in db matches id in post we are updating(posts), idf id's in both db and post match update the post else return old post
                post._id === action.payload._id ? action.payload : post) 
        case actions.DELETE://loop through the posts and find post id not equal to action.payload
            return posts.filter((post) => post._id !== action.payload) 
        default:
           return posts;
    }

}

