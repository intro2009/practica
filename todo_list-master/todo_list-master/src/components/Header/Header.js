import { AppBar, Container, makeStyles, Typography, Toolbar, Button, Tooltip } from '@material-ui/core';
import React from 'react';
import { logout } from '../../redux/userReducer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    signUp: {
        marginRight: theme.spacing(2)
    },
    login: {
        marginRight: theme.spacing(2)
    },
    linkTodos: {
        marginRight: theme.spacing(2)
    }
}))



const Header = (props) => {
    let { isLogin, login, logout, token } = props;
    const classes = useStyles();

    const logoutFormAcount = () => {
        logout(token);
    }

    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>Todo List</Typography>
                        {isLogin 
                        ?
                            <>
                                <Tooltip title="Перейти к списку дел">
                                    <Button
                                        size="small"
                                        color="inherit"
                                        className={classes.linkTodos}
                                        component={NavLink}
                                        to="/todos"
                                    >Список заметок</Button>
                                </Tooltip>
                                <Tooltip title="Перейти в профиль">
                                    <Button 
                                        size="small"
                                        component={NavLink} 
                                        color="inherit"
                                        className={classes.login} 
                                        to="/profile"
                                    >{login}</Button>
                                </Tooltip>
                                <Tooltip title="Выйти из аккаунта">
                                    <Button 
                                        size="small"
                                        variant="contained"
                                        onClick={logoutFormAcount}
                                    >Выход</Button>
                                </Tooltip>
                            </>
                        :
                            <>
                                <Button 
                                    size="small"
                                    component={NavLink}
                                    to="/login"
                                    className={classes.signUp} 
                                    variant="outlined" 
                                    color="inherit"
                                >Войти</Button>
                                <Button 
                                    size="small"
                                    to="/signup"
                                    color="secondary" 
                                    component={NavLink}
                                >Регистрация</Button>
                            </>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

Header.propTypes = {
    isLogin: PropTypes.bool,
    login: PropTypes.string,
    token: PropTypes.string
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
    login: state.user.login,
    token: state.user.token
})

export default connect(mapStateToProps, {
    logout
})(Header);
