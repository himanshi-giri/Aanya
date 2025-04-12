import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeachMeTopic.css';

function TeachMeTopic() {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [teachingContent, setTeachingContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  // Add state for chat messages
  const [chatMessages, setChatMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Fetch all subjects when component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:8000/api/teach/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        // Fallback subjects if API fails
        setSubjects([
          { id: 1, name: 'Mathematics' },
          { id: 2, name: 'Science' },
          { id: 3, name: 'English' }
        ]);
      }
    };
    
    fetchSubjects();
  }, []);

  // Fetch topics when a subject is selected
  const handleSubjectChange = async (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    
    if (subject) {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:8000/api/teach/topics/${subject}`);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        // Fallback topics if API fails
        switch (subject) {
          case 'Mathematics':
            setTopics([
              { id: 1, name: 'Trigonometry' },
              { id: 2, name: 'Algebra' },
              { id: 3, name: 'Geometry' }
            ]);
            break;
          case 'Science':
            setTopics([
              { id: 1, name: 'Physics' },
              { id: 2, name: 'Chemistry' },
              { id: 3, name: 'Biology' }
            ]);
            break;
          default:
            setTopics([]);
        }
      }
    } else {
      setTopics([]);
    }
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleStart = async () => {
    if (selectedSubject && selectedTopic) {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await axios.post('http://localhost:8000/api/teach/teachtopic', {
          subject: selectedSubject,
          topic: selectedTopic
        });
        setTeachingContent(response.data.content);
      } catch (error) {
        console.error('Error getting teaching content:', error);
        // Fallback content if API fails
        setTeachingContent(`<p>Here's where the AI-generated lesson about ${selectedTopic} in ${selectedSubject} would appear. 
        Currently, the backend connection is not established.</p>`);
      } finally {
        setLoading(false);
      }
    }
  };

  // const handleSendResponse = () => {
  //   if (userResponse.trim()) {
  //     // Handle user response - can be implemented to send to backend
  //     console.log("User response:", userResponse);
  //     setUserResponse('');
  //   }
  // };
  const handleSendResponse = async () => {
    if (userResponse.trim() && !isSubmitting) {
      const userQuestion = userResponse.trim();
      setUserResponse(''); // Clear input field
      setIsSubmitting(true);
      
      // Add user message to chat
      setChatMessages(prevMessages => [
        ...prevMessages, 
        { 
          sender: 'user', 
          content: userQuestion,
          timestamp: new Date()
        }
      ]);
      
      try {
        // Call your backend API to get the answer
        const response = await axios.post('http://localhost:8000/api/teach/question', {
          subject: selectedSubject,
          topic: selectedTopic,
          question: userQuestion
        });
        
        // Add AI response to chat
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'ai', 
            content: response.data.answer,
            timestamp: new Date()
          }
        ]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Add error message to chat
        setChatMessages(prevMessages => [
          ...prevMessages, 
          { 
            sender: 'ai', 
            content: 'Sorry, I couldn\'t process your question. Please try again.',
            timestamp: new Date()
          }
        ]);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle Enter key in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendResponse();
    }
  };

  return (
    <div className="teach-container">
      <div className="teach-content">
        <div className="selection-group">
          <div className="select-wrapper">
            <select 
              value={selectedSubject} 
              onChange={handleSubjectChange}
              className="form-select"
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id || subject.name} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="select-wrapper">
            <select 
              value={selectedTopic} 
              onChange={handleTopicChange}
              className="form-select"
              disabled={!selectedSubject}
            >
              <option value="" disabled>Select Topic</option>
              {topics.map(topic => (
                <option key={topic.id || topic.name} value={topic.name}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="start-button"
            onClick={handleStart}
            disabled={!selectedSubject || !selectedTopic || loading}
          >
            {loading ? 'Loading...' : 'Start'}
          </button>
        </div>
        
        <div className="description-section">
          {teachingContent ? (
            <div dangerouslySetInnerHTML={{ __html: teachingContent }} />
          ) : (
            <>
              <p className="main-description">
                Select a subject and topic above, then click "Start" to begin your personalized lesson.
                Aanya will provide you with a comprehensive tutorial on your chosen topic.
              </p>
              <p className="sub-description">
                You can interact with Aanya by typing questions or responses in the field below.
              </p>
            </>
          )}
        </div>
        
        {/* newly added */}
        {/* Chat messages section */}
        {teachingContent && (
          <div className="chat-container" id="chat-container">
            {chatMessages.map((message, index) => (
              <div 
                key={index}
                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            {isSubmitting && (
              <div className="chat-message ai-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="response-section">
          <div className="response-input">
            <input
              type="text"
              placeholder="Enter Your Response"
              className="response-field"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="input-actions">
              <button className="mic-button">🎤</button>
              <button className="camera-button">📷</button>
              <button 
                className="send-button" 
                onClick={handleSendResponse}
              >
                ➡️
              </button>
            </div>
          </div>
          <button className="voice-toggle">
            <span className="voice-icon">🔊</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeachMeTopic;