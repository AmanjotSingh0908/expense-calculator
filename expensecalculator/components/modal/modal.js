import React, { useState } from 'react';
import styles from '@/styles/modal.module.css'; 
import axios from 'axios';
import { useRouter } from 'next/router'; 
import { toastMessage } from '@/utils/toasts/toasts';

const hardcodedOTP = '123456'; //Hardcoded OTP

const Modal = ({ showModal, handleClose }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if(otp != hardcodedOTP){
      setError('Invalid OTP');
      toastMessage.error("Invalid OTP");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/users/expense/${userId}`, {
        params: {password, otp},
      });
      const userData = response.data;

      router.push({
        pathname: `/user/${userId}`,
        query: { userData: JSON.stringify(userData) },
      });
      
    } catch (error) {
      console.error('Error fetching user data: ', error);
      setError('Error fetching user data');
      toastMessage.error("Some Error occured. Please Try Again");
    }
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Enter Your Details</h2>
        <input type="text" placeholder="User ID" className={styles.input} value={userId} onChange={(e) => setUserId(e.target.value)}/>
        <input type="password" placeholder="Password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" placeholder="OTP" className={styles.input} value={otp} onChange={(e) => setOtp(e.target.value)}/>
        {error && <div className={styles.error}>{error}</div>}
        <br></br>
        <button onClick={handleSubmit } className={styles.submitButton}>Submit</button>
        <button onClick={handleClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
