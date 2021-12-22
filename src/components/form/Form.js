import React , {useState,useEffect}from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch , useSelector} from "react-redux";
import { createPost, updatePost } from "../../actions/posts";



//logic for  updatePost in server side(constroller)
//  get the id of the post we have cliked on
const Form = ({currentId, setCurrentId}) => {    //accept ids current and setCurrentId as props
//set initial state for the form used to create a post,the values in this postData object
    //should mimic the postSchema, because we will be sending it to the db
    
    const [postData, setPostData] = useState({//push values of setPostData into object postData(global state)
        title: '',
        message: '',
        creator: '',
        tags: '',
        selectedFile: '',
    });

    //fetch posts from (post folder), loop through all available posts in state, filter out currentId 
    //if current id matches any id in posts, return the id else do nothing
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) :  null)
    const dispatch = useDispatch(); //for disaptvhing actions
    const classes = useStyles();

/**
 * !FUNCTION DEFINITIONS START HERE
 */

    const clear = () => {
        setCurrentId(null); //set id to null
        //reset the form fields  (isn't there a form.clear thing in js?)
        setPostData({
            title: '',
            message: '',
            creator: '',
            tags: '',
            selectedFile: ''
        });
}


    //the way useEffect works, the first param is the callback function that will be called
    //when anything passed in the second param changes,in this case the value of post changes
    // function will be executed
    useEffect(() => {
        if(post) setPostData(post)  //if post exist, update the values with values in setPostData()
    },[post])

    //logic for posting data to db
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {    //when the form registers a submit event, check if the postData has an id
            dispatch(updatePost(currentId,postData));//dispatch update if postdata's payload has id, this means we clicked on an already existing post and edited it
        } else {
            dispatch(createPost(postData)); // dispatch and pass in createPost functiom from actions 
        }

        clear();
    }

    /**
     * !FUNCTION DEFINITIONS END HERE
     */

    return (
       
        <Paper className={ classes.paper }>
            <form autoComplete="off" noValidate className={ `${classes.root} ${classes.form}` } onSubmit={ handleSubmit } >
                {/**dynamic form text heading, when edit button is clicked, change the form heading */}
                <Typography variant="h6" >{currentId ? 'Editing' : 'Creating' } a Memory</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth
                    value={ postData.title }   //values of this inputfield will be saved in the state(global)state has a postData object, and a key creator (postData.title : 'Kc')
                    onChange={(e)=>setPostData({...postData, title:e.target.value})} //...postData(spread the object, se we don't wipe existing data(this is basically push for objects)), specify we only want to change the  creator key in the postData obj with the values in the e(event)
                />
                <TextField name="message" variant="outlined" label="Message" fullWidth
                    value={ postData.message }   //values of this inputfield will be saved in the state(global)state has a postData object, and a key creator (postData.title : 'Kc')
                    onChange={(e)=>setPostData({...postData, message:e.target.value})} //...postData(spread the object, se we don't wipe existing data(this is basically push for objects)), specify we only want to change the  creator key in the postData obj with the values in the e(event)
                />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth
                    value={ postData.tags }   //values of this inputfield will be saved in the state(global)state has a postData object, and a key creator (postData.creator : 'Kc')
                    onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})} //...postData(spread the object, se we don't wipe existing data(this is basically push for objects)), specify we only want to change the  tags key in the postData obj with the values in the e(event)
                />
                <TextField name="creator" variant="outlined" label="Creator" fullWidth
                    value={ postData.creator }   //values of this inputfield will be saved in the state(global)state has a postData object, and a key creator (postData.creator : 'Kc')
                    onChange={ (e) => setPostData({ ...postData, creator: e.target.value }) } //...postData(spread the object, se we don't wipe existing data(this is basically push for objects)), specify we only want to change the  creator key in the postData obj with the values in the e(event)
                />
               
                { /** use filebase from react-file-base64 as a component */ }
                <div className={classes.fileInput} >
                    <FileBase
                        type='file' //specify the type of the upload
                        multiple={ false }    //we are uploading only one file
                        onDone={ ({ base64 }) =>    //use base64 to properly convert uploaded file 
                            setPostData({   //to an image,then call setPostData 
                        ...postData, selectedFile:base64 //set selectedFile key to the upload
                    })}/>
                </div>
                 <Button className ={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                 <Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth >Clear</Button>
            </form>

        </Paper>

    )
}

export default Form;