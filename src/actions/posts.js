import * as api from '../api';
import { actions } from '../constants/actionTypes';


//call this inside updatePost and likePost, since they're very identical
// const updateAPost = async function (id, post, dispatch, actionType) {
//      try {
//         const {data} = await api.operationType(id, post);
//         dispatch({
//             type: 'UPDATE',
//             payload: data
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }


//create actions(Action creators)
export const getPosts = () => async (dispatch) => { //because getPosts action is making a call to a db we're using async 
    //to make sure we grab all the data we need, so =>async(dispatch) is made possible by thunk
try {
    const { data } = await api.fetchPosts();    //fetch data
    dispatch({  //call dispatch and provide 
        type: actions.FETCH_ALL,  // what type of action the reducer will take
        payload : data  //and also provide the data to the dispatch function, as payload
    })
} catch (error) {
    console.error(error)
}
}


//change post to newPost to keep conistency between actions, reducers and api?
export const createPost = (post) => async (dispatch) => {
    
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: actions.CREATE,
            payload : data
        })
    } catch (error) {
        console.error(error)
    }
}


//calls to update will take id(of post clicked on), and post(modified data)
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({
            type: actions.UPDATE,
            payload: data
        })
    } catch (error) {
        console.error(error);
    }

    // updateAPost(id, post, dispatch,updatePost);


}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({
            type: actions.DELETE,
            payload : id
        })
    } catch (error) {
     console.error(error)   
    }
}

export const likePost = (id) => async (dispatch) => {

    
    try {
        const { data } = await api.likePost(id);

        dispatch({
            type: actions.UPDATE,
            payload : data
        })
        
    } catch (error) {
        console.error(error)
    }

    // updateAPost(id, null, dispatch,likePost);

}