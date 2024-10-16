"use client"; // 클라이언트 컴포넌트로 지정

import React, { useState } from 'react';
import Link from 'next/link'; // Link 컴포넌트 가져오기
import './faq.css'; // CSS 파일 가져오기

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  { question: '1. 서비스는 어떻게 이용하나요?', answer: '문의 및 전화 상담' },
  { question: '2. 서비스를 이용하기 위해 필요한 것은 무엇인가요?', answer: '이용 방법' },
  { question: '3. 이용 요금이 어떻게 되나요?', answer: '월 단위' },
  { question: '4. 서비스 사용 시 주의사항은 무엇인가요?', answer: '주의사항 설명' },
  { question: '5. 결제 방법은 어떤 것이 있나요?', answer: '결제 방법 설명' },
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="faq-background">
      <div className="faq-container">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="" className="logo-image" />
        </Link>
        <h1 className="faq-title">FAQ</h1>
        <hr className="divider" />
        <ul>
          {faqs.map((faq, index) => (
            <li key={index} className="faq-item" onClick={() => toggleAnswer(index)}>
              <h2 className="faq-question" aria-expanded={openIndex === index}>
                <span>{faq.question}</span>
                <i className={`fas fa-chevron-down icon ${openIndex === index ? 'rotate' : ''}`}></i>
              </h2>
              <div
                className={`faq-answer ${openIndex === index ? 'open' : ''}`}
                aria-hidden={openIndex !== index}
              >
                <p>{faq.answer}</p>
              </div>
              <span className={`arrow ${openIndex === index ? 'rotate' : ''}`}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
