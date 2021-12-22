import axios from 'axios';

//functions in here must match the functions in the controllers in the server side

//url for connrcting to backend
const url = 'http://localhost:5000';
// const createPostUrl = "url for creating a post"

// function to return all posts in db
export const fetchPosts = () => axios.get(url);
//newPost will be the data we are sending, createPost takes the post we want to send, pass it to axios
// post method with the url for our backend, 
export const createPost = (newPost) => axios.post(url,newPost);

//url for updating a post, id will be the id of Post clicked on, updatedPost will be the payload
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id)=> axios.patch(`${url}/${id}/likepost`)



//functions in here should correspond to url links in the router files





//testing
// create this url in the server side and see if we can connect to it from the back end
//create a route for this url in the server side
// const displayAlertUrl = 'http://localhost:5000/alert';

// export const alertUser = (axios.get(displayAlertUrl));