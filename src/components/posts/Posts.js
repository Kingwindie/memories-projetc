import React from "react";
import { Grid, CircularProgress } from '@material-ui/core'
import Post from "./post/post";
import useStyles from './styles';
import { useSelector } from 'react-redux';
const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts)   //state.posts is coming from the reducer folder's index.js file
    return (
        // !posts.length(if posts is 0)  
        !posts.length ? <CircularProgress /> :(//display progrees bar,
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                { posts.map((post) => (//if posts.lenght has a value(has posts) ,make a grid and display the post component in another grid(ln 15)
                <Grid key={ post._id } item xs={ 12 } sm={ 6 }> {/* post._id*/}
                        <Post post={ post } setCurrentId = {setCurrentId}/> {/**dislpay a  Post component and pass prop(post to it)  and current id, when it is clicked on*/}
                    </Grid>
                ))}
                </Grid>
            )
      
    )
}

export default Posts;