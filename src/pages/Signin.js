import classes from './Signin.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'


const Singnin = () => {

    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [isLoadingData, setIsLoadingData] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()


    const loginHandler = (ev) => {
        ev.preventDefault()
        setIsLoadingData(true)
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMZnlLlAdq-mXkdjeB4UwMBA63YIgRp7Q",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                })
            }
        ).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return res.json().then(data => {
                    setIsLoadingData(false)
                    let errorMessage = "Auth failed"
                    throw new Error(errorMessage)
                })
            }
        }).then(data => {
            setIsLoadingData(false)
            const myToken = data.idToken
            const myLocalId = data.localId
          
            dispatch({type:"login", payload:myToken, localId: myLocalId})
            
            history.replace(`/profile/${myLocalId}`)
           
            }).catch(err => {
                alert(err.message)
            })

    }
    return <>
        <div className={classes.formContainer}>
            <form onSubmit={loginHandler}>
                <h1 className={classes.signUpTitle}>Sign into Your Account</h1>

                <div className={classes.formData}>

                    <div>
                        <label>Email  </label>
                        <input type="email"
                            onChange={(ev) => setEnteredEmail(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password  </label>
                        <input type="password"
                            onChange={(ev) => setEnteredPassword(ev.target.value)}
                        />
                    </div>

                </div>
                <button className={classes.signUpBtn}>Login</button>
                {/* {errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : ""} */}
              {isLoadingData && <div className={classes.spinnerWrapper}><LoadingSpinner/></div>}
            </form>

        </div>


    </>
}

export default Singnin;