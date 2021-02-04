import { TextField, Button, Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Field, reduxForm } from 'redux-form';



const useStyles = makeStyles(theme => ({
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    form: {
        marginBottom: theme.spacing(3)
    },
    button: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    }
}))


const TextArea = ({input, meta, ...props}) => {
    return (
        <div>
            <TextField {...input} {...props} 
                margin="normal" 
                variant="outlined" 
                rows={2}
                multiline
                required
                fullWidth 
            />
        </div>
    )
}

const Input = ({input, meta, ...props}) => {
    return (
        <div>
            <TextField {...input} {...props} 
                margin="normal"
                required 
                variant="outlined" 
                fullWidth 
            />
        </div> 
    )
}

const TodoForm = (props) => {
    const classes = useStyles();
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <Field 
                component={Input}
                name="about"
                label={"Введите тему заметки"}
            />
            <Field 
                component={TextArea}
                name="message"
                label="Введиет содержания заметки"
            />
            <Box className={classes.buttonWrapper}>
                <Button 
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    size="large"
                    color="secondary"        
                >Добавить</Button>
            </Box>
        </form>
    )
}



export default reduxForm({
    form: "todoform"
})(TodoForm);