import classes from './Support.module.css'
import emailjs from 'emailjs-com'
import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'

const Support = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messageSent, setMessageSent] = useState("")
    const [isLoadingData, setIsLoadingData] = useState(false)
  
    const submitEmailHandler = (ev) => {
        setIsLoadingData(true)
        ev.preventDefault()
        emailjs.sendForm(
            "service_w4z2933", "template_uvwmb25", ev.target, "user_wqLTfWBPG7HMvi09wZKcs"
        ).then(response => {
            setIsLoadingData(false)

            setMessageSent("The message was successfully sent!")
            console.log(response)}).catch(err => console.log(err))
        setName("")
        setEmail("")
        setMessage("")
    }

    return <>
        <div className={classes.supportAreaWrapper}>
            <h2 className={classes.supportTitle}>Support Area</h2>
            <p className={classes.supportText}>Using the Voting Sysytem application is very straightforward.
                All you have to do is register and if you have the voting age permission you can vote your prefered party.
                Of course, you can vote only once and after doing that the application will offer you a short voting statistic.
                Our team thanks you and awaits for furter support solutions.
            </p>
            <h3 className={classes.contactUsTitle}>Contact us!</h3>
            <form onSubmit={submitEmailHandler} className={classes.contactFormWrapper}>
                <div className={classes.contactNameWrapper}>
                    <label>Your name : </label>
                    <input type="text" name="name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)} />
                </div>
                <div className={classes.contactEmailWrapper}>
                    <label >Your email : </label>
                    <input type="email" name="user_email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)} />
                </div>
                <textarea name="message" cols="50" rows="5"
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}></textarea>
                <button className={classes.sendMessageBtn}>Send message</button>
               <h5 className={classes.messageSent}> {messageSent}</h5>
               {isLoadingData && <div className={classes.spinnerWrapper}><LoadingSpinner/></div>}
            </form>
        </div>


    </>
}

export default Support;