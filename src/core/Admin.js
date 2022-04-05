  
import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios'
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Admin = ({history}) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

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
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { role, name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, password }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form className='form2'>
            <div className='input-container'>
                <label>Role</label>
                <input className='input-disabled' defaultValue={role} type="text" disabled />
            </div>
            <div className='input-container'>
                <label>Name</label>
                <input className='input' onChange={handleChange('name')} value={name} type="text"/>
            </div>

            <div className='input-container'>
                <label>Email</label>
                <input className='input-disabled' defaultValue={email} type="email" disabled />
            </div>

            <div className='input-container'>
                <label>Password</label>
                <input className='input' onChange={handleChange('password')} value={password} type="password"/>
            </div>

            <div className='button-container'>
                <button className='submit' onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return ( 
        <Layout>
            <div>
                <ToastContainer />
                <h1>Admin Settings</h1>
                <h3>Profile update</h3>
                {updateForm()}
            </div>    
        </Layout>
);}

export default Admin;