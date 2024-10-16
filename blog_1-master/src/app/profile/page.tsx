"use client";

import React, { useEffect, useState } from 'react';
import { db, auth } from '../_components/firebaseConfig'; // Firebase 설정 임포트
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './profile.css'; // CSS 파일 임포트

interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

const UserProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatPhoneNumber = (phoneNumber: string): string => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // 숫자만 남기기
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/); // 3-4-4 패턴

    if (match) {
      return `${match[1]} - ${match[2]} - ${match[3]}`; // 포맷팅된 전화번호 리턴
    }

    return phoneNumber; // 포맷이 맞지 않으면 원래 전화번호 리턴
  };

  useEffect(() => {
    const fetchUserData = async (userEmail: string) => {
      try {
        const userDocRef = doc(db, 'users', userEmail); // Firestore에서 사용자 문서 참조
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserInfo(userDoc.data() as User); // 사용자 정보 설정
        } else {
          setError('사용자 정보를 찾을 수 없습니다.');
        }
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.email!); // 현재 사용자 이메일로 데이터 가져오기
      } else {
        setError('로그인이 필요합니다.');
      }
    });

    return () => unsubscribe(); // 언구독하여 메모리 누수 방지
  }, []);

  return (
    <div className="profileContainer">
      <h2 className="title">내 정보</h2> {/* 타이틀 클래스 추가 */}
      {error ? (
        <p className="error">{error}</p>
      ) : userInfo ? (
        <div className="profileDetail">
          <p><strong>이름:</strong> {userInfo.name}</p>
          <p><strong>이메일:</strong> {userInfo.email}</p>
          <p><strong>전화번호:</strong> {formatPhoneNumber(userInfo.phoneNumber)}</p>
        </div>
      ) : (
        <p>사용자 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default UserProfile;
