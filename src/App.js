import './App.css';
import { Route, Switch, Redirect } from 'react-router'
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Support from './pages/Support'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import PageNotFound from './pages/PageNotFound';
import Footer from './components/Footer'
import { useSelector } from 'react-redux';
import { useState } from 'react';


const App = () => {

    const isAuth = useSelector(state => state.token)
    const localId = useSelector(state =>state.localId)
    const [firstName, setFirstName] = useState()
  
    const firstNameHandler = (fn) => {
            setFirstName(fn)
    }



    return <>
        <Navigation firstName={firstName} />
        <Switch>
            <Route path="/" exact>
                <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
                <Homepage />
            </Route>
            {isAuth &&
                <Route path="/profile/:localId" exact>
                    <Profile  onSaveFirstName = {firstNameHandler}/>
                </Route>
            }


            <Route path="/support" exact>
                <Support />
            </Route>
            <Route path="/signup" exact>
                <Signup />
            </Route>
            <Route path="/signin" exact>
                <Signin />
            </Route>
            <Route path="*">
                <PageNotFound />
            </Route>

        </Switch>
        <Footer />
    </>
}

export default App;
