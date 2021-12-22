import React from 'react';
import useStyles from './styles';
import {Card,CardActions, CardContent,CardMedia,Button,Typography} from'@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'; //for outputing things like created at : "5 minutes ago" etc
import { useDispatch } from 'react-redux';//for calling dispatch to dispatch asctions
import { deletePost, likePost} from '../../../actions/posts';    //import action to be dispatchd



const Post = ({post, setCurrentId}) => {    // props.post is same as {post} but here we are destructuring it to just return and pass post to the Post component
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={ classes.card }>
            <CardMedia className={ classes.media } image={ post.selectedFile } title={ post.title } />
            
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.creator}</Typography>
                <Typography variant='body2'>{ moment(post.createdAt).fromNow() }</Typography>
                     <Typography variant='h6'>{post.title}</Typography>
            </div>

       

            <div className={ classes.overlay2 }>
                <Button style={ { color: 'white' } } size='small' onClick={ () => {
                    //edit button(three dots on a post card)
                    //keep track of current id when the edit button is clicked on
                setCurrentId(post._id)
                }}>
                    <MoreHorizonIcon fontSize= 'default' />
                </Button>
            </div>

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'> { post.tags.map((tag) => 
                    `#${tag} `) }
                </Typography>
                </div>
                <CardContent>
                <Typography className={ classes.title } color='textSecondary' variant='body2' gutterBottom> { post.message} </Typography>
                </CardContent>

                <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={ () => {
                    dispatch(likePost(post._id))
                    }}>
                        <ThumbUpAltIcon fontSize = 'small'/>
                        Like
                        {post.likeCount}
                    </Button>
                    <Button size='small' color='primary' onClick={()=> {dispatch(deletePost(post._id))}}>
                        <DeleteIcon fontSize = 'small'/>
                        Delete
                    </Button>
            </CardActions>
        </Card>
    )
}

export default Post;