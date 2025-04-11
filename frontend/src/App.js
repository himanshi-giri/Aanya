import React, { useState } from 'react';
import './App.css';
import Assessment from './components/Assessment';
import PracticeQuestions from './components/PracticeQuestions';
import TeachMeTopic from './components/TeachMeTopic';
import ProfileMenu from './components/ProfileMenu';
import Profile from './components/Profile';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [showProfile, setShowProfile] = useState(false);

  const renderContent = () => {
    if (showProfile) {
      return <Profile />;
    }

    switch (currentTab) {
      case 'assessment':
        return <Assessment />;
      case 'practice':
        return <PracticeQuestions />;
      case 'teach':
        return <TeachMeTopic />;
      case 'home':
      default:
        return (
          <>
            <h1>Good Morning!</h1>
            <h2>How Can I Help You Today?</h2>
            <div className="search-box">
              <input 
                type="text" 
                placeholder="What do you want to ask?"
              />
              <button className="mic-button">🎤</button>
              <button className="camera-button">📷</button>
              <button className="send-button">➡️</button>
            </div>
            <div className="quick-actions">
              <button className="action-button">
                <span>📚</span>
                Homework Help
              </button>
              <button className="action-button">
                <span>❓</span>
                Ask Your Doubt
              </button>
              <button className="action-button">
                <span>📖</span>
                Step by Step Guidance
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">
          <h2>Aanya Tutor</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="nav-item">
              <span className="icon">⏱️</span>
              View History
            </li>
            <li className="nav-item">
              <span className="icon">❓</span>
              Get Help
            </li>
            <li className="nav-item">
              <span className="icon">📝</span>
              Assessments
            </li>
            <li className="nav-item">
              <span className="icon">✏️</span>
              Practice Questions
            </li>
            <li className="nav-item">
              <span className="icon">🆕</span>
              New Topics
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="top-nav">
          <nav>
            <ul>
              <li 
                className={currentTab === 'home' ? 'active' : ''} 
                onClick={() => {
                  setCurrentTab('home');
                  setShowProfile(false);
                }}
              >
                Home
              </li>
              <li 
                className={currentTab === 'assessment' ? 'active' : ''} 
                onClick={() => {
                  setCurrentTab('assessment');
                  setShowProfile(false);
                }}
              >
                Assessment
              </li>
              <li 
                className={currentTab === 'practice' ? 'active' : ''} 
                onClick={() => {
                  setCurrentTab('practice');
                  setShowProfile(false);
                }}
              >
                Practice Questions
              </li>
              <li 
                className={currentTab === 'teach' ? 'active' : ''} 
                onClick={() => {
                  setCurrentTab('teach');
                  setShowProfile(false);
                }}
              >
                Teach Me a Topic
              </li>
            </ul>
          </nav>
          <ProfileMenu onViewProfile={() => setShowProfile(true)} />
        </header>
        <div className="content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
