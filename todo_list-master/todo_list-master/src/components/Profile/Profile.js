import { Paper, Grid, Container, Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getStats } from '../../redux/todosReducer';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


const useStyles = theme => ({
    root: {
        marginTop: theme.spacing(3),
        height: 300
    },
    itemWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        marginLeft: theme.spacing(1)
    },
    paper: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2)
    }, 
    profile: {
        marginBottom: theme.spacing(3)
    }
})




class Profile extends React.Component { 

    componentDidMount() {
        this.props.getStats(this.props.id);
    }

    render() {
        const { classes } = this.props;

        if (!this.props.isLogin) {
            return <Redirect to="/login" />
        }

        return (
            <div className={classes.root}>
                <Typography align="center" variant="h4" className={classes.profile}>Профиль</Typography>
                <Container maxWidth="sm">
                    <Grid container justify="center" alignItems="center" spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <Paper className={classes.paper}>
                                <Box className={classes.itemWrapper}>
                                    <Typography variant="body2">Имя:</Typography>
                                    <Typography className={classes.text}>{this.props.login}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Paper className={classes.paper}>
                                <Box className={classes.itemWrapper}>
                                    <Typography variant="body2">Количество записей:</Typography>
                                    <Typography className={classes.text}>{this.props.countTodos}</Typography>
                                </Box>
                                <Box className={classes.itemWrapper}>
                                    <Typography variant="body2">Последняя запись:</Typography>
                                    <Typography className={classes.text}>{this.props.dateLastTodo}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid> 
                </Container>  
            </div>
        )
    }
}

Profile.propTypes = {
    isLogin: PropTypes.bool,
    login: PropTypes.string,
    countTodos: PropTypes.number,
    id: PropTypes.number,
    dateLastTodo: PropTypes.string
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
    login: state.user.login,
    countTodos: state.todos.count,
    dateLastTodo: state.todos.dateLastTodo,
    id: state.user.id
})


export default compose(
    connect(mapStateToProps, { getStats }),
    withStyles(useStyles)
)(Profile);