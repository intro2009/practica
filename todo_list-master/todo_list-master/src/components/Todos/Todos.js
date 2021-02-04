import { Container, List, withStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getAllTodos, deleteTodo, addTodo } from '../../redux/todosReducer';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { compose } from 'redux';
import Preloader from '../common/Preloader/Preloader';
import TodoForm from './TodoForm';
import { reset } from 'redux-form'; 
import { Redirect } from 'react-router-dom';

const useStyles = theme => ({
    title: {
        marginTop: theme.spacing(3)
    },
    list: {
        minHeight: "25em",
        maxHeight: "25em",
        overflow: "auto",
        background: theme.palette.background.paper,
        marginTop: theme.spacing(3)
    }
})

class Todos extends React.Component {

    state = {
        isLoaded: false,
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
        this.props.getAllTodos(this.props.id);
        this.setState({ isLoaded: false });
    }

    addNewTodo = (formData, dispatch) => {
        this.props.addTodo(this.props.id, formData.message, formData.about);
        dispatch(reset("todoform"));
    }

    render() {
        const { classes } = this.props;

        if (!this.props.isLogin) {
            return <Redirect to="/login" />
        }

        if (this.state.isLoaded) {
            return (
                <div>
                    <Preloader />
                </div>
            )
        }

        return (
            <Container maxWidth="sm">
                <Typography className={classes.title} align="center" variant="h4">Список дел</Typography>
                <List className={classes.list} disablePadding>
                    {this.props.todos.map(todo => <TodoItem 
                        key={todo.id}
                        id={todo.id}
                        message={todo.message}
                        about={todo.about}
                        date={todo.messageDate}
                        deleteTodo={this.props.deleteTodo}
                    />)}
                </List>
                <TodoForm 
                    onSubmit={this.addNewTodo}
                />
            </Container>
        )
    }
}

Todos.propTypes = {
    id: PropTypes.number,
    isLogin: PropTypes.bool,
    getAllTodos: PropTypes.func,
    deleteTodo: PropTypes.func,
    addTodo: PropTypes.func,
}


const mapStateToProps = (state) => ({
    todos: state.todos.todos,
    id: state.user.id,
    isLogin: state.user.isLogin
})

export default compose(
    connect(mapStateToProps, { getAllTodos, deleteTodo, addTodo }),
    withStyles(useStyles)
)(Todos); 