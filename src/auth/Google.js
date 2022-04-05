// import React from 'react';
// import axios from 'axios';
// import GoogleLogin from 'react-google-login'

// const Google = ({ informParent }) => {
//     const responseGoogle = (response) => {
//             axios({
//                 method: "POST",
//                 url: `${process.env.REACT_APP_API}/google-login`,
//                 data: {idToken: response.tokenId}
//             })
//             .then(response => {
//                 console.log('Google Signin Success', response)
//                 informParent(response)
//             })
//             .catch(error => {
//                 console.log('Google Signin Error', error.response)
//             })
//         }

//     return (
//         <div hidden>
//             <GoogleLogin
//                 clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
//                 buttonText="Login"
//                 onSuccess={responseGoogle}
//                 onFailure={responseGoogle}
//                 render={renderProps => (
//                     <button className='google-button' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
//                   )}
//                 cookiePolicy={'single_host_origin'}
//             />
//         </div>
//     )
// }

// export default Google