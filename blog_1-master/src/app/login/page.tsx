"use client"; 

import React, { useState, useEffect } from 'react';
import { auth, db } from '../_components/firebaseConfig'; // Firebase 설정을 임포트
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [nameRegister, setNameRegister] = useState(''); // 이름 상태 추가
  const [phoneNumberRegister, setPhoneNumberRegister] = useState(''); // 전화번호 상태 추가
  const [activeForm, setActiveForm] = useState('login');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailLogin, passwordLogin);
      setMessage('로그인 완료!');
      setIsError(false);
      setShowAlert(true);

      const token = 'your_auth_token'; // 실제 토큰으로 교체
      localStorage.setItem('token', token);

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      setMessage('로그인 실패! 다시 시도해 주세요.');
      setIsError(true);
      setShowAlert(true);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Firebase Auth로 사용자 등록
      await createUserWithEmailAndPassword(auth, emailRegister, passwordRegister);

      // Firestore에 사용자 정보 추가
      const newUser = {
        email: emailRegister,
        name: nameRegister,
        phoneNumber: phoneNumberRegister
      };
      const userDocRef = doc(db, 'users', emailRegister); // 이메일을 문서 ID로 사용
      await setDoc(userDocRef, newUser); // Firestore에 데이터 추가

      setMessage('회원가입 완료! 로그인해주세요.');
      setIsError(false);
      setShowAlert(true);
    } catch (error) {
      setMessage('회원가입 실패! 다시 시도해 주세요.');
      setIsError(true);
      setShowAlert(true);
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    setActiveForm('login'); // 로그인 폼으로 이동
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAlertConfirm();
    }
  };

  useEffect(() => {
    if (showAlert) {
      const modal = document.getElementById('alert-modal');
      modal?.focus();
    }
  }, [showAlert]);

  return (
    <div className="container">
      <div className="tabs">
        <button 
          className={`tab-button ${activeForm === 'login' ? 'active' : ''}`} 
          onClick={() => setActiveForm('login')}
        >
          로그인
        </button>
        <button 
          className={`tab-button ${activeForm === 'register' ? 'active' : ''}`} 
          onClick={() => setActiveForm('register')}
        >
          회원가입
        </button>
      </div>

      {activeForm === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="form">
          <div className="form-group">
            <label htmlFor="emailLogin">이메일</label>
            <input
              type="email"
              id="emailLogin"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordLogin">비밀번호</label>
            <input
              type="password"
              id="passwordLogin"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">로그인</button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="form">
          <div className="form-group">
            <label htmlFor="nameRegister">이름</label>
            <input
              type="text"
              id="nameRegister"
              value={nameRegister}
              onChange={(e) => setNameRegister(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumberRegister">전화번호</label>
            <input
              type="tel"
              id="phoneNumberRegister"
              value={phoneNumberRegister}
              onChange={(e) => setPhoneNumberRegister(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailRegister">이메일</label>
            <input
              type="email"
              id="emailRegister"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordRegister">비밀번호</label>
            <input
              type="password"
              id="passwordRegister"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">회원가입</button>
        </form>
      )}

      {showAlert && (
        <div 
          id="alert-modal" 
          className="alert-modal" 
          onKeyDown={handleKeyDown} 
          tabIndex={0}
        >
          <div className="alert-content" style={{ minHeight: '120px' }}>
            <p>{message}</p>
            <button className="confirm-button" onClick={handleAlertConfirm}>확인</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 100px auto;
          padding: 40px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .tabs {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .tab-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 10px;
        }

        .tab-button.active {
          border-bottom: 2px solid #0070f3;
          font-weight: bold;
        }

        .form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          margin-bottom: 5px;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .submit-button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 15px;
        }

        .submit-button:hover {
          background-color: #005bb5;
        }

        .alert-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .alert-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          position: relative;
          min-height: 120px;
        }

        .confirm-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 15px;
        }

        .confirm-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default Login;
