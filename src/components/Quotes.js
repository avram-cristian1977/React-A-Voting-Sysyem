import classes from './Quotes.module.css'
import kennedy from '../assets/images/kennedy800x600.jpg'
import roosevelt from '../assets/images/roosvelt800x600.jpg'
import lewis from '../assets/images/lewix800x600.jpg'
import moore from '../assets/images/moore800x600.jpg'
import sharon from '../assets/images/sharon800x600.jpg'
import obama from '../assets/images/obama800x600.jpg'
import nb from '../assets/images/nb.png'




const Quotes = () => {
    return <section>
        
        <div className={classes.personalityWrapper}>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
            <img src={kennedy} alt="kennedy" />
            <div className={classes.centralBannerWrapper}>
                <q className={classes.personalityQuote}>The ignorance of one voter in a democracy
                 impairs the security of all.</q>
                <h2 className={classes.personName}>John F. Kennedy</h2>
            </div>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
        </div>

        
        <div className={classes.personalityWrapper}>
        <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
            <img src={roosevelt} alt="roosvelt" />
            <div className={classes.centralBannerWrapper}>
                <q className={classes.personalityQuote}>Nobody will deprive the American people
                 of the right to vote except the American people themselves and the way they
                  could do this is by non voting.</q>
                  <h2 className={classes.personName}>Franklin D. Roosevelt</h2>
            </div>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
        </div>
        <div className={classes.personalityWrapper}>
        <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
            <img src={obama} alt="obama" />
            <div className={classes.centralBannerWrapper}>
                <q className={classes.personalityQuote}>There's no such things like vote doesnt matter.
                 It all matters..</q>
                  <h2 className={classes.personName}>Barack Obama</h2>
            </div>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
        </div>
        <div className={classes.personalityWrapper}>
        <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
            <img src={lewis} alt="lewis" />
            <div className={classes.centralBannerWrapper}>
                <q className={classes.personalityQuote}>The vote is precious. It is the most powerful 
                non-violent tool we have in a democratic society and we must use it.</q>
                  <h2 className={classes.personName}>John Lewis</h2>
            </div>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
        </div>
        <div className={classes.personalityWrapper}>
        <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
            <img src={sharon} alt="sharon" />
            <div className={classes.centralBannerWrapper}>
                <q className={classes.personalityQuote}>Voting is the expression 
                of our commitment to ourselves, one another, this country and this world.</q>
                  <h2 className={classes.personName}>Sharon Salzberg</h2>
            </div>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
        </div>
        <div className={classes.personalityWrapper}>
        <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
            <img src={moore} alt="moore" />
            <div className={classes.centralBannerWrapper}>
                <q className={classes.personalityQuote}>People should't be afraid of their 
                goverment.Goverments should be afraid of their people.</q>
                  <h2 className={classes.personName}>Alan Moore</h2>
            </div>
            <div className={classes.signWrapper}>
                <img src={nb} alt="nb" />
            </div>
        </div>




    </section>
}

export default Quotes;