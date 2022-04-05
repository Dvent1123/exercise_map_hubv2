import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../auth/helpers'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Athlete_Type = ({ history}) => {
    const [values, setValues] = useState({
        sex: 'M',
        type: 'power',
        weight: 0, 
        role: '',
        name: '',
        email: '',
        password: '',
    })

    const token = getCookie('token')

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('profile values', res)
            const { role, name, email, sex, weight, typeOfAthlete: type } = res.data
            setValues({...values, role, name, email, sex, weight, type})
        })
        .catch(error => {
            console.log('profile loading error', error)
            if(error === 401) {
                signout(() => {
                    history.push('/')
                })
            }
        })
    }

    const { sex, type, weight } = values

    const handleChange = name => event => {
        if(name === 'weight') {
            setValues({...values, [name]: Number(event.target.value)})
        } else{
            setValues({...values, [name]: event.target.value})
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/athlete`,
            data:  { sex, weight, type } ,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            //Need to update personal record value here, upon submit
            isAuth() && isAuth.role === 'admin' ? history.push('/admin') : history.push('/home')
        })
        .catch(err => {
            console.log(err.response.data)
            toast.error(err.response.data.error)
        })
    }

    const athleteForm = () => {
        return (<form className='form2'>
            <div className='input-container'>
                <label>Sex</label>
                <label className='input-athlete'>
                    Male
                    <input onChange={handleChange('sex')} value='M' checked={sex === 'M'} type='radio'/>
                </label>
                <label className='input-athlete'>
                    Female
                    <input onChange={handleChange('sex')} value='F' checked={sex === 'F'} type='radio'/>
                </label>
            </div>
            <div className='input-container'>
                    <label>Athlete Type</label>
                    <label className='input-athlete'>
                        Powerlifter
                        <input onChange={handleChange('type')} value='power' checked={type === 'power'} type='radio'/>
                    </label>
                    {/* <label className='input-athlete'>
                        Olympic Lifter
                        <input onChange={handleChange('type')} value='oly' checked={type === 'oly'} type='radio'/>
                    </label> */}
                    <label className='input-athlete'>
                        Calisthenics
                        <input onChange={handleChange('type')} value='cali' checked={type === 'cali'} type='radio'/>
                    </label>
            </div>
            <div className="input-container">
                <label>Weight Class</label>
                {   
                    sex === 'M' ?
                    <select 
                        value={weight} 
                        onChange={handleChange('weight')}
                        className='input-athlete' 
                    >
                        <option value="114">114</option>
                        <option value="123">123</option>
                        <option value="132">132</option>
                        <option value="148">148</option>
                        <option value="165">165</option>
                        <option value="181">181</option>
                        <option value="198">198</option>
                        <option value="220">220</option>
                        <option value="242">242</option>
                        <option value="275">275</option>
                        <option value="319">319</option>
                        <option value="320">320+</option>
                    </select> :

                    <select 
                        value={weight} 
                        onChange={handleChange('weight')}
                        className='input-athlete'  
                        >
                        <option value="97">97</option>
                        <option value="105">105</option>
                        <option value="114">114</option>
                        <option value="123">123</option>
                        <option value="132">132</option>
                        <option value="148">148</option>
                        <option value="165">165</option>
                        <option value="181">181</option>
                        <option value="198">198</option>
                        <option value="199">199+</option>
                    </select>
                }
            </div>
            <div className='button-container'>
                <button className='submit' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </form>)
    }
    
    return (
        <Layout>
            <div className='signin-main'>
                <ToastContainer />
                <h1 className='signin'>Athlete Settings</h1>
                <h3>Athlete Update</h3>
                {athleteForm()}
            </div>
        </Layout>
    );
}

export default Athlete_Type