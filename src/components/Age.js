import classes from './Age.module.css'

const Age = (props) => {

    const getAge = (dateAsString) => {
        const today = new Date();
        const birthDate = new Date(dateAsString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age -= 1;
        }
        return age;
    }

    const age = getAge(props.dateOfBirth)

    props.onSaveAge(age)

    return <div>{age}
        {age < 18 ? <span className={classes.ageAlert}>You must be 18 to vote. </span> : ""}
    </div>;
}

export default Age;