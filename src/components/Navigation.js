import { NavLink, useHistory } from 'react-router-dom'
import classes from './Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'

const Navigation = (props) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.token)
    const localId = useSelector(state => state.localId)

    const logOutHandler = () => {
        dispatch({ type: "logout" })
       
        history.replace("/home")
    }


    return <header>
        <nav className={classes.navbar}>
            <h3 className={classes.appTitle}>Voting System</h3>
            <ul>
                <div className={classes.navlinks}>
                    <li>
                        <NavLink to="/home" activeClassName={classes.activeLink}>
                            <span className={classes.linkIcon}>
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                            <span className={classes.linkText}>Home</span>
                        </NavLink>
                    </li>
                    {isAuth &&
                        <li>
                            <NavLink to={`/profile/${localId}`} activeClassName={classes.activeLink}>

                                <span className={classes.linkIcon}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span className={classes.linkText}>Profile</span>
                            </NavLink>
                        </li>

                    }
                    <li>
                        <NavLink to="/support" activeClassName={classes.activeLink}>
                            <span className={classes.linkIcon}>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <span className={classes.linkText}>Support</span>
                        </NavLink>
                    </li>



                </div>
                <div className={classes.navActions}>

                    {!isAuth &&
                        <>
                            <li><NavLink to="/signup" activeClassName={classes.activeLink}>
                                <span className={classes.linkText}>Sign up</span>
                            </NavLink>
                            </li>
                            <li><NavLink to="/signin" activeClassName={classes.activeLink}>
                                <span className={classes.linkText}>Sign in</span>
                            </NavLink>
                            </li>
                        </>
                    }
                    {isAuth && <>
                        <p className={classes.welcomeMsg}>Welcome, {props.firstName}</p>
                        <button onClick={logOutHandler} className={classes.signOutBtn}>Sign out</button>
                        </>
                    }
                </div>
            </ul>
        </nav>
    </header>
}

export default Navigation;