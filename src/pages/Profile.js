import { useDispatch, useSelector } from "react-redux"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import classes from './Profile.module.css'
import { useState, useEffect, useReducer } from "react"
import { useRef } from "react"
import tmpImage from "../assets/images/tmp.jpg"
import vwpImage from "../assets/images/vwp.jpg"
import mepImage from "../assets/images/mep.jpg"
import Age from '../components/Age'
import LoadingSpinner from '../components/LoadingSpinner'

const partyReducer = (state, action) => {
    switch (action.type) {
        case "voted":
            return state.map(party => {
                if (party.id === action.payload) {
                    return {
                        ...party,
                        votes: party.votes + 1
                    }
                }
                return party
            })
            default:
                return state
            }
        }
        
        const parties = [
            {
                id: 1,
                abrev: "T.M.P.",
                name: "Tranquility and Manners Party",
                motto: "Tune calm",
                logo: tmpImage,
                coor: "blue"
                
            },
            {
                id: 2,
                abrev: "V.W.P.",
                name: "Vengeance Wrap Party",
                motto: "Get back what's yours!",
                logo: vwpImage,
                coor: "red"
                
            },
            {
                id: 3,
                abrev: "M.E.P.",
                name: "Moon Exploration Party",
                motto: "Now Not Soon",
                logo: mepImage,
                coor: "black"
                
            }
        ]
        
        const Profile = (props) => {
            
            const [firstName, setFirstName] = useState("")
            const [lastName, setLastName] = useState("")
            const [regionOfResidence, setRegionOfResidence] = useState("")
            const [email, setEmail] = useState("")
            const [dateOfBirth, setDateOfBirth] = useState(null)
            const [age, setAge] = useState()
            const [hasVoted, setHasVoted] = useState(false)
            const [isLoadingData, setIsLoadingData] = useState(false)
    const [state, dispatchVote] = useReducer(partyReducer, parties)
    const [totalVotes, setTotalVotes] = useState(0)


    useEffect(() => {
        getProfileHandler()
        getParties()

    }, [state])

    const db = firebase.firestore()
    const localId = useSelector(state => state.localId)

    const getProfileHandler = () => {
setIsLoadingData(true)
        db.collection('users').doc(localId).get().then((doc) => {
            setFirstName(doc.data().firstName)
            setLastName(doc.data().lastName)
            setDateOfBirth(doc.data().dateOfBirth)
            setRegionOfResidence(doc.data().regionOfResidence)
            setEmail(doc.data().email)
            setHasVoted(doc.data().hasVoted)
            setIsLoadingData(false)
        })
    }

    const vote = (partyId) => {
        db.collection('users').doc(localId).update({
            'hasVoted': true,
            'votedParty': partyId
        })
        setHasVoted(true)
        updateVote(partyId)
    }

    const updateVote = (partyId) => {
        state.map(party => {
            if (party.id === partyId) {
                party.votes++;

                db.collection('parties').doc(party.remoteId).update({
                    'votes': party.votes
                })
            }
            return party;
        })
    }

    const getParties = () => {
        db.collection('parties').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    state.map((party) => {
                        if (party.id === doc.data().id) {
                            party.votes = doc.data().votes;
                            party.remoteId = doc.id;
                        }
                    })
                })
            })
    }

    const ageHandler = (age) => {
        setAge(age)
    }
    props.onSaveFirstName(firstName)

    const getTotalVotes = () => {

        db.collection('parties').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let allVotes = 0
                    state.map((party) => {
                        allVotes += party.votes
                        setTotalVotes(allVotes)

                    })
                })
            })
    }

    getTotalVotes()
    return <>
        <div className={classes.formContainer}>
            <form >
                <h1 className={classes.profileTitle}>Your Account Data</h1>
                <div className={classes.formData}>
                    <div className={classes.profileFieldData}>
                        <label>First name : </label><span className={classes.retrievedData}>{firstName}</span>
                    </div>
                    <div className={classes.profileFieldData}>
                        <label>Last name : </label><span className={classes.retrievedData}>{lastName}</span>
                    </div>
                    <div className={classes.profileFieldData}>
                        <label>Date of Birth : </label> <span className={classes.retrievedData}>{dateOfBirth}</span>
                    </div>
                    <div className={classes.profileFieldData}>
                        <label>Region of Residence : </label><span className={classes.retrievedData}>{regionOfResidence}</span>
                    </div>
                    <div className={classes.profileFieldData}>
                        <label>Email : </label><span className={classes.retrievedData}>{email}</span>
                    </div>
                    <div className={classes.profileFieldData}>
                        <label>Did vote : </label><span className={classes.retrievedData}>{hasVoted ? "Yes" : "No"}</span>
                    </div>
                    <div className={classes.profileFieldData}>
                        <label>Age : </label><span className={classes.retrievedData}>
                            <Age dateOfBirth={dateOfBirth} onSaveAge={ageHandler} />
                        </span>
                    </div>
                    {isLoadingData && <LoadingSpinner/>}
                </div>
            </form>
        </div>
        <div className={classes.votCabine}>
            {state.map(party => <div key={party.id}>

                <img src={party.logo} alt="logo" />
                <p className={classes.partyAbrev}>{party.abrev}</p>
                <p className={classes.partyName}>{party.name}</p>
                <q className={classes.partyMotto}>{party.motto}</q>
                <div className={classes.rectangleWrapper}>
                    <div className={classes.voteRectangle}
                        style={{ height: party.votes / totalVotes * 100 }}>
                    </div>
                </div>
                <p className={classes.voteProcentage}>{(party.votes / totalVotes * 100).toFixed(2)}%</p>


                {age >= 18 &&
                    <button
                        className={classes.voteBtn}
                        title={hasVoted ? "You already voted" : "You can vote"}
                        disabled={hasVoted}
                        onClick={() => {
                            if (hasVoted) {
                                return
                            }
                            vote(party.id)
                        }}
                    >Vote!
                    </button>
                }
            </div>)}
        </div>
    </>
}

export default Profile;