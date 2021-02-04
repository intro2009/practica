import { Container, CssBaseline, makeStyles, Avatar, Typography, Button, TextField } from '@material-ui/core';
import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Field, reduxForm } from 'redux-form';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(18),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    isSignUp: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    signUp: {
        margin: theme.spacing(2, 0, 2),
    }
}))

export const Input = ({input, meta, ...props}) => {
    return (
        <div>
            <TextField {...input} {...props} 
            margin="normal" required variant="outlined" fullWidth />
        </div>
    )
}

const SignInForm = props => {
    const classes = useStyles();
    let { clearError } = props;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Вход</Typography>
                <form className={classes.form} onSubmit={props.handleSubmit}>
                    <Field onChange={clearError} autoFocus label={"Логин"} name={"login"} component={Input} />
                    <Field onChange={clearError} type="password" label={"Пароль"} name={"password"} component={Input} />    
                    <Button color="primary" fullWidth className={classes.submit} type="submit" variant="contained">Sign Up</Button>
                </form>
                <Typography color="error">{props.errorSignUp}</Typography>
            </div>
        </Container>
    )
}


export default reduxForm({
    form: "signin"
})(SignInForm);