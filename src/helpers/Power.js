import React, { useState, useEffect} from 'react'
import BenchCard from '../core/BenchCard'
import SquatCard from '../core/SquatCard'
import DeadliftCard from '../core/DeadliftCard'
import { FaWeight, FaFemale, FaMale } from 'react-icons/fa'
import bench from '../assets/images/exercises/bench.svg'
import deadlift from '../assets/images/exercises/deadlift.svg'
import squat from '../assets/images/exercises/bw_squat.svg'

const Power = ({ athlete_weight, personalRecords, handlePRUpdate, sex}) => {
        const [values, setValues] = useState({
            weight: athlete_weight,
            benchPR: 185,
            squatPR: 295,
            deadliftPR: 340,
            benchArray: [],
            squatArray: [],
            deadliftArray: [],
            sex: sex
        })

        //come back and add the record.sex === sex line
        useEffect(() => {
            personalRecords.forEach(record => {
                if(record.id === weight && record.sex === sex) {
                    setValues({...values, benchArray: record.bench,
                        squatArray: record.squat,
                    deadliftArray: record.deadlift})
                }
            });
        }, [])

        const { weight, benchArray, squatArray, deadliftArray } = values


    return (
                <section>
                    <div className="stats-title-container">
                        <h1>POWERLIFTING</h1>
                        <p>"Think about it this way: If you break a max by 5 pounds a month, that's 60 pounds a year. If you keep doing that, you're going to be a bad dude." - Louie Simmons</p>
                    </div>
                    <div className="stats-container">
                        <h2>Current Weight Class {<FaWeight className="scale-icon"/>}: {weight} lbs</h2>
                        <h2>Gender {<FaFemale className='female-icon'/>} / {<FaMale className='male-icon'/>}: {sex}</h2>
                    </div>
                    <br />
                    <br />
                    <div className="sbd-title-container">
                        <img alt='bench' className='sbd-logo' src={bench} />
                        <h3>Bench (in lbs)</h3>
                    </div>

                    <div className="real-card-container">
                        {
                            benchArray ? 
                            benchArray.map((benchWeights, index) => {
                                return <BenchCard key={index} benchWeights={benchWeights}
                                personalRecords={personalRecords} handlePRUpdate={handlePRUpdate}
                                weight={weight} benchArray={benchArray} index={index}/>                        
                            }) :
                            <h1>Loading...</h1>
                        }
                    </div>
                    <div className="sbd-title-container">
                        <img alt='squat' className='sbd-logo' src={squat} />
                        <h3>Squat (in lbs)</h3>
                    </div>
                    <div className="real-card-container">
                        {
                            squatArray ? 
                            squatArray.map((squatWeights, index) => {
                                return <SquatCard key={index} squatWeights={squatWeights}
                                personalRecords={personalRecords} handlePRUpdate={handlePRUpdate}
                                weight={weight} squatArray={squatArray} index={index}/>                        
                            }) :
                            <h1>Loading...</h1>
                        }
                    </div>
                    <div className="sbd-title-container">
                        <img alt='deadlift' className='sbd-logo' src={deadlift} />
                        <h3>Deadlift (in lbs)</h3>
                    </div>
                    <div className="real-card-container">
                        {
                            deadliftArray ? 
                            deadliftArray.map((deadliftWeights, index) => {
                                return <DeadliftCard key={index} deadliftWeights={deadliftWeights}
                                personalRecords={personalRecords} handlePRUpdate={handlePRUpdate}
                                weight={weight} deadliftArray={deadliftArray} index={index}/>                        
                            }) :
                            <h1>Loading...</h1>
                        }
                    </div>
                </section>

)}

export default Power