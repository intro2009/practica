import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, setErrorInUser } from '../../redux/userReducer';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { reset } from 'redux-form';


const SignIn = props => {
    let { setErrorInUser, error, isLogin, login} = props;

    const onSubmit = (formData, dispatch) => {
        login(formData.login, formData.password);
        dispatch(reset("signin"));
    }

    if (isLogin) {
        return <Redirect to="/profile" />
    }

    const clearError = () => {
        setErrorInUser(null);
    }

    return (
        <div>
            <SignInForm 
                onSubmit={onSubmit}
                errorSignUp={error}
                clearError={clearError}
            />
        </div>
    )
}

SignIn.propTypes = {
    isLogin: PropTypes.bool,
    error: PropTypes.string
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
    error: state.user.error,
})

export default connect(mapStateToProps, {
    setErrorInUser, login
})(SignIn) 