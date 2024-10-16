"use client"; 

import { useState, useEffect } from 'react';
import { db, auth } from '../_components/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './inquiry.css'; 

const InquiryPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      alert('로그인을 먼저 진행해주세요.');
      return;
    }

    try {
      await addDoc(collection(db, 'inquiries'), {
        name,
        email,
        inquiryType,
        message,
        timestamp: new Date(),
      });
      alert('문의가 제출되었습니다!');
      setName('');
      setEmail('');
      setInquiryType('');
      setMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('문의 제출에 실패했습니다.');
    }
  };

  return (
    <div className="formContainer">
      <h1 className="inquiry-title">문의</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputField"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="inputField"
          placeholder="이메일 (답변은 이메일로 전송됩니다)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="selectField"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
          required
        >
          <option value="" disabled>문의 종류 선택</option>
          <option value="general">일반 문의</option>
          <option value="technical">기술적 문제</option>
          <option value="billing">청구 관련</option>
        </select>
        <textarea
          className="textareaField"
          placeholder="문의 내용"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="submitButton">제출</button>
      </form>
    </div>
  );
};

export default InquiryPage;
