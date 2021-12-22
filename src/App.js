import React, {useEffect,useState} from 'react'; //useEffect, this is useful for initializing dispatch function
import { Container, AppBar, Typography, Grid, Grow } from '@material-ui/core';
import {useDispatch} from 'react-redux'
import memories from './images/memories.png';
import Posts from './components/posts/Posts';
import Form from './components/form/Form';
import useStyles from './styles';
import { getPosts } from './actions/posts';


const App = () => {
    //for currentId, setCurrId here we are retrieveing the state of the id of a Post(card) we clicked
    //on, in the Post when we click on it the id will be grabbed and saved in state,we sgahre it here (App)
    // because this component houses both the Form and Post Component, so we can click on a Post, share the state with App, and Form can ansl use the state for editing purposes
    const [currentId, setCurrentId] = useState(null);   //set value of id to null at the begining   
    const classes = useStyles();
    const dispatch = useDispatch(); //assign dispatch function to a variable, to enable calling actions

    useEffect(() => {//dispatch getPost() action, when values of currentId and dispatch has changed,
        dispatch(getPosts());    // the useEffect can be triggered in two ways, 1 on submit, of Form
    },[ currentId ,dispatch])  //and whe the clear function from Form is triggered(button click)
    return (
            <Container maxWidth='lg'>
                <AppBar className = {classes.appBar} position='static' color='inherit'>
                    <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                    <img className={classes.image} src={ memories } alt='memories' height='60' />
                </AppBar>
                <Grow in>
                    <Container >
                    <Grid container justify='space-between' alignItems='stretch' spacing={ 3 }>
                        <Grid item xs={12} sm={7} >
                            <Posts  setCurrentId={setCurrentId}  />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form currentId={ currentId }
                            setCurrentId={setCurrentId}
                            /> { /*share the state to Form component*/ }
                        </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        
    );
}
export default App;
