import classes from './Homepage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'
import votingHand from '../assets/images/votingHand.jpg'
import walkingPeople from '../assets/images/walkingPeople.jpg'
import Quotes from '../components/Quotes'
import Animation from '../components/Animation'

const Homepage = () => {


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return <>
        
        <div className={classes.topTextWrapper}>
            <h1>YOU CAN</h1>
            <span className={classes.changeYour}>CHANGE YOUR</span>
            
            <div className={classes.horizontalLine}></div>
            <Animation/>
        </div>
    
        <div className={classes.walkingPeopleWrapper}>
        <img src={walkingPeople} alt="walking people" />
        <div className={classes.centralBannerWrapper}>
            <div className={classes.voteMsg1}>
                <h1>REGISTER AND VOTE</h1>
            </div>
            <div className={classes.votingHandWrapper}>
                <img src={votingHand} alt="votingHand" />
            </div>
            <div className={classes.voteMsg2}>
                <h1>YOUR VOTE IS YOUR VOICE</h1>
            </div>
        </div>
        </div>

        <Quotes/>
        <h2 className={classes.bottomText}>
        In a democracy, a government is chosen by voting in an election:
         a way for an electorate to elect, i.e., choose, among several candidates for
          rule. In a representative democracy voting is the method by which the 
          electorate appoints its representatives to government, and by which the 
          elected representatives make decisions. In a direct democracy, voting is the method by which the electorate directly make decisions, turn bills into laws, etc. 
          A majority vote is a formal expression of an individual's choice for or against 
          some motion (for example, a proposed resolution); for or against some ballot
           question; or for a certain candidate, selection of candidates, or political party. 
           A preferential vote may allow the voter and/or elected representative to cast one, 
           some or many preferences. In elections, many countries use a secret ballot, 
           a practice to prevent voters from being intimidated and to protect their 
           political privacy.
        </h2>
        <button onClick={scrollToTop} className={classes.scrlTopBtn}>
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </button>

    </>
}

export default Homepage;