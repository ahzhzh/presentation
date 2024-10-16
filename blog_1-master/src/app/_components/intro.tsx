"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './intro.css';

export function Intro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // 추가된 상태

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) { // 스크롤 위치
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowAlert(true);
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    window.location.href = '/'; // 확인 버튼 클릭 시 메인 페이지로 이동
  };

  return (
    <>
      <section className={`relative flex-col md:flex-row flex items-center justify-between mt-16 mb-16 fixed-menu ${isScrolled ? 'scrolled' : ''}`}>
        
        <div className="logo-container">
          <Link href="/" className="logo-text">
            <img src="/assets/blog/authors/main.png" alt='logo' width={300} height={90} />
          </Link>
        </div>

        <div className="button-container">
          <Link href="/guide" className="menu-button">가이드</Link>
          <Link href="/faq" className="menu-button">FAQ</Link>
          <Link href="/inquiry" className="menu-button">문의</Link>
          <Link href="/notification" className="menu-button">공지</Link>
          {isLoggedIn && (
            <Link href="/profile" className="menu-button">내 정보</Link>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">로그아웃</button>
          ) : (
            <Link href="/login" className="menu-button">로그인/회원가입</Link>
          )}
        </div>

              
       

        {showAlert && (
          <div className="alert-modal">
            <div className="alert-content">
              <p>로그아웃 되었습니다.</p>
              <button className="confirm-button" onClick={handleAlertConfirm}>확인</button>
            </div>
          </div>
        )}
      </section>

      {/* 메뉴바 아래 여백 추가 */}
      <div style={{ paddingTop: '108.5px' }}></div> {/* 메뉴바의 높이에 따라 조정 */}
    </>
  );
}
