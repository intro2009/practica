import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSignUp, signUp, setErrorInUser } from '../../redux/userReducer';
import { Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { reset } from 'redux-form';


const SignUp = props => {
    let { setSignUp, signUp, setErrorInUser, isSignUp, error} = props;

    const onSubmit = (formData, dispatch) => {
        signUp(formData.login, formData.password, formData.password2);
        dispatch(reset("signup"));
    }

    if (isSignUp) {
        setSignUp(false);
        setErrorInUser(null);
        return <Redirect to="/login" />
    }

    const clearError = () => {
        setErrorInUser(null);
    }

    return (
        <div>
            <SignUpForm 
                onSubmit={onSubmit}
                errorSignUp={error}
                clearError={clearError}
            />
        </div>
    )
}

SignUp.propTypes = {
    isLogin: PropTypes.bool,
    isSignUp: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin,
    isSignUp: state.user.isSignUp,
    error: state.user.error,
})

export default connect(mapStateToProps, {
    setSignUp, signUp, setErrorInUser
})(SignUp) 