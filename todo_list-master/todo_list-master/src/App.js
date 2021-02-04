import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Redirect, Route, withRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import store from './redux/store';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
import Todos from './components/Todos/Todos';


const preloaderStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return (
        <div style={preloaderStyle}>
          <Preloader />
        </div>
      )
    }

    return (
      <div>
        <Redirect to="/login" />
        <Header />
        <Route path="/signup" render={() => <SignUp />} />
        <Route path="/login" render={() => <SignIn />} />
        <Route path="/profile" render={() => <Profile />} />
        <Route path="/todos" render={() => <Todos />} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(withRouter, 
  connect(mapStateToProps, { initializeApp }))(App);

const MainApp = props => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}



export default MainApp;
