import classes from './Signup.module.css'
import counties from '../counties.json'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { createUserDocument } from '../firebase'
import LoadingSpinner from '../components/LoadingSpinner'


const Signup = () => {
    const [enteredFirstName, setEnteredFirstName] = useState("")
    const [enteredLastName, setEnteredLastName] = useState("")
    const [enteredDateOfBirth, setEnteredDateOfBirth] = useState("")
    const [enteredRegionOfResidence, setEnteredRegionOfResidence] = useState("")
    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [enteredConfirmedPassword, setEnteredConfirmedPassword] = useState("")
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()


    const submithandeler = (ev) => {
        ev.preventDefault()
        if (!enteredFirstName ||
            !enteredLastName ||
            !enteredDateOfBirth ||
            !enteredRegionOfResidence ||
            !enteredEmail ||
            !enteredPassword ||
            !enteredConfirmedPassword) {
            setErrorMessage("All fields are required.")
            return
        }
        if (enteredPassword.trim().length < 6) {
            setErrorMessage("Password must be at least 6 digits long.")
            return
        }

        if (enteredPassword !== enteredConfirmedPassword) {
            setErrorMessage("The passwords don't match.")
            return
        }
        if (!enteredEmail.includes("@")) {
            setErrorMessage("Invalid e-mail address format.")
            return
        }
        const user = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            dateOfBirth: enteredDateOfBirth,
            regionOfResidence: enteredRegionOfResidence,
            email: enteredEmail,
            password: enteredPassword,
            hasVoted:false,
            votedParty:null
        }

setIsLoadingData(true)
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMZnlLlAdq-mXkdjeB4UwMBA63YIgRp7Q",
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
                return res.json().then(data => console.log(data))
            }
        }).then(data => {
            setIsLoadingData(false)
            createUserDocument(data, user)
            const myToken = data.idToken
            const myLocalId = data.localId
            dispatch({ type: "login", payload: myToken, localId: myLocalId })

            history.replace(`/profile/${myLocalId}`)
        }).catch(err => {
            alert(err.message)
        })
        setErrorMessage("")
}

return <>
        <div className={classes.formContainer}>
            <form onSubmit={submithandeler}>
                <h1 className={classes.signUpTitle}>Create New Account</h1>

                <div className={classes.formData}>
                    <div>
                        <label>First Name</label>
                        <input type="text"
                            value={enteredFirstName}
                            onChange={(ev) => setEnteredFirstName(ev.target.value)} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text"
                            value={enteredLastName}
                            onChange={(ev) => setEnteredLastName(ev.target.value)} />
                    </div>
                    <div>
                        <label>Date of Birth  </label>
                        <input type="date"
                            value={enteredDateOfBirth}
                            onChange={(ev) => setEnteredDateOfBirth(ev.target.value)} />
                    </div>
                    <div>
                        <label>Region of Residence</label>
                        <select
                            value={enteredRegionOfResidence}
                            onChange={(ev) => setEnteredRegionOfResidence(ev.target.value)}>
                            <option value="" disabled selected>Select region</option>
                            {counties.map(county => <option key={county.id} value={county.name}>{county.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Email  </label>
                        <input type="email"
                            value={enteredEmail}
                            onChange={(ev) => setEnteredEmail(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password  </label>
                        <input type="password"
                            value={enteredPassword}
                            onChange={(ev) => setEnteredPassword(ev.target.value)} />
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <input type="password"
                            value={enteredConfirmedPassword}
                            onChange={(ev) => setEnteredConfirmedPassword(ev.target.value)} />
                    </div>
                </div>
                <button className={classes.signUpBtn}>Sign up</button>
                {errorMessage ? <p className={classes.errorMessage}>{errorMessage}</p> : ""}
                    {isLoadingData && <div className={classes.spinnerWrapper}><LoadingSpinner/></div>}
            </form>

        </div>


    </>
}

export default Signup;