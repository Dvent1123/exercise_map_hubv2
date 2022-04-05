import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import Power from '../helpers/Power'
import Cali from '../helpers/Cali'
// import Oly from '../helpers/Oly'

const Athlete = props => {
    let { skills, athlete_type, weight, personalRecords, handlePRUpdate, sex, handleSkillUnlock } = props
    switch ( athlete_type ) {
        case "power":
            return <Power skills={skills} athlete_weight={weight} 
                handlePRUpdate={handlePRUpdate} personalRecords={personalRecords} sex={sex}/>
        case "cali":
            return <Cali handleSkillUnlock={handleSkillUnlock} skills={skills}/>
        // case "oly":
        //     return <Oly />
        default:
            break;
    }

}

export default Athlete