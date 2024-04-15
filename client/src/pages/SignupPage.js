import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import { ADD_USER } from '../graphql/mutations';

/*
*Author: Wenjie Zhou
*/

//user sign up page
const SignupPage = () => {

    // State variables to manage form input and warning message
    const [roleId, setRoleId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');

    // Query hook to get user data by email
    const { loading: userLoading, error: userError, data: userData, refetch: refetchUser } = useQuery(GET_USER_BY_EMAIL, { variables: { email } });

    // Mutation hook to add a new user
    const [addUser] = useMutation(ADD_USER);

    // Function to handle form submission
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {

            // Refetch user data
            await refetchUser();
            console.log(userLoading);
            console.log(userError);

            // If the input email does not exist in the database, add a new user based on the provided user inputs
            // If the input email exists in the database, display a warning message
            if (userData.userByEmail == null) {
                await addUser({ variables: { roleId: roleId, firstName: firstName, lastName: lastName, email: email, password: password } });
                setWarning('Successful');
                setRoleId('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                refetchUser();
            }
            else if (userData.userByEmail != null) {
                setWarning('The email has been used');
                setEmail('');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className='container'>
            <div className="form-signin w-50 m-auto">
                <form onSubmit={handleAddUser}>
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
                    <h1 className="h3 mb-3 fw-normal" style={{ color: "red" }}>{warning}</h1>
                    <div className="form-floating">
                        <select className="form-control" id="roleId" value={roleId} onChange={e => setRoleId(e.target.value)} required >
                            <option value={''}>Select Role</option>
                            <option value={'1'}>Nurse</option>
                            <option value={'2'}>Patient</option>
                        </select>
                        <label htmlFor="roleId">Role</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="fName" className="form-control" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        <label htmlFor="fName">First Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" id="lName" className="form-control" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        <label htmlFor="lName">Last Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" id="email" className="form-control" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" id="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
                    <button className="btn btn-secondary w-100 py-2" type="reset" onClick={() => { setRoleId(''); setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setWarning(''); }}>Reset</button>
                    <Link className="btn btn-warning w-100 py-2" to="/">Back to Homepage</Link>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
