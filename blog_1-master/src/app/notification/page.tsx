"use client";
import { useState } from 'react';
import './notification.css'; // CSS 파일 import

interface NoticeProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

const notices = [
    { question: '10월 10일 ', answer: 'TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 TEST 12 .' },
    { question: '10월 11일 ', answer: 'TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 TEST 13 .' },
    { question: '10월 12일 ', answer: 'TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 TEST 14 .' },
    { question: '10월 13일 ', answer: 'TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 TEST 15 .' },
    { question: '10월 14일 ', answer: 'TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 TEST 16 .' },
    { question: '10월 15일 ', answer: 'TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 TEST 17 .' },
    { question: '10월 16일 ', answer: 'TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 TEST 18 .' },
];

const Notice: React.FC<NoticeProps> = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div>
            <div onClick={onToggle} className={`faq-question ${isOpen ? 'open' : ''}`}>
                <span>{question}</span>
                <span className={`toggle-icon ${isOpen ? 'rotated' : ''}`}>▼</span>
            </div>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                {answer}
            </div>
            <hr className="divider" />
        </div>
    );
};

const Home: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 공지사항 5개로 페이지 설정
    const totalPages = Math.ceil(notices.length / itemsPerPage);
    const [openNoticeIndex, setOpenNoticeIndex] = useState<number | null>(null);

    const sortedNotices = [...notices].reverse();
    const currentNotices = sortedNotices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleToggle = (index: number) => {
        setOpenNoticeIndex(openNoticeIndex === index ? null : index);
    };

    return (
        <div className="container">
            <h1 className="title">공지사항</h1>
            {currentNotices.map((notice, index) => (
                <Notice 
                    key={index} 
                    question={notice.question} 
                    answer={notice.answer} 
                    isOpen={openNoticeIndex === index} 
                    onToggle={() => handleToggle(index)} 
                />
            ))}
            
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setCurrentPage(index + 1)} 
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
