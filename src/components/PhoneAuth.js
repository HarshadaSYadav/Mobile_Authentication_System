import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import './PhoneAuth.css';
import phoneIcon from './assets/icons8-phone.svg';
import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../firebase';

const PhoneAuth = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Initialize reCAPTCHA on mount
  useEffect(() => {
    if (!window.recaptchaVerifier && document.getElementById('recaptcha-container')) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log('reCAPTCHA verified'),
        'expired-callback': () => console.warn('reCAPTCHA expired. Please try again.'),
      });
    }
  }, []);

  // ✅ Validate Indian Phone Number Format
  const isValidIndianPhoneNumber = (number) => {
    const indianPhoneRegex = /^\+91\d{10}$/;
    return indianPhoneRegex.test(number);
  };

  // ✅ Handle Send OTP
  const handleSendOTP = async () => {
    setError('');
    if (!isValidIndianPhoneNumber(phoneNumber)) {
      setError('Please enter a valid Indian phone number (e.g., +919876543210).');
      return;
    }

    try {
      setLoading(true);

      if (!window.recaptchaVerifier) {
        setError('reCAPTCHA not initialized. Please refresh the page.');
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setVerificationId(confirmationResult.verificationId);
      setOtp('');
      setStep('otp');
      alert('OTP sent to your Phone successfully!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Verify OTP
  const handleVerifyOTP = async () => {
    setError('');
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      setLoading(true);

      if (!window.confirmationResult) {
        setError('OTP not sent. Please request a new OTP.');
        return;
      }

      const credential = await window.confirmationResult.confirm(otp);
      console.log('User:', credential.user);
      alert('OTP Verified Successfully!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Retry phone number step
  const handleRetryPhone = () => {
    setOtp('');
    setPhoneNumber('');
    setStep('phone');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* ✅ Header Section */}
        <div className="auth-header">
          <img src={phoneIcon} alt="Mobile Icon" className="mobile-icon" />
          <h2>Verify Your Phone Number</h2>
        </div>
        <p>We will send you a six digit one-time password</p>
        {error && <p className="error-message">{error}</p>}

        {/* ✅ Phone Number Input Step */}
        {step === 'phone' && (
          <>
            <input
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div id="recaptcha-container"></div>
            <button id="send-otp-button" onClick={handleSendOTP} disabled={loading}>
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </>
        )}

        {/* ✅ OTP Input Step */}
        {step === 'otp' && (
          <>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: '2.5rem',
                height: '2.5rem',
                margin: '0.5rem',
                fontSize: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(0,0,0,0.3)',
                borderRadius: '4px',
              }}
            />
            <button onClick={handleVerifyOTP} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button onClick={handleRetryPhone} className="retry-button">Retry Phone Number</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneAuth;
