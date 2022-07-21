import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


// state of formfields
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields); 
  const { displayName, email, password, confirmPassword } = formFields; // passed the values to formFields
  
  // event for reentre the formfields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
   // event to enter the words in the submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if the password and confirmpassword no correct correspond send the alert message
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    // si the password and confirmpassword are correct correspond, send the pwd and cpwd to createAuthuserwithemailandpassword
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // show the name of user
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };
 // event to enter the words in the formfields
  const handleChange = (event) => {
    const { name, value } = event.target;
    // attribut la valeur du champ name et actualiser
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;