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

  const handleSendResponse = () => {
    if (userResponse.trim()) {
      // Handle user response - can be implemented to send to backend
      console.log("User response:", userResponse);
      setUserResponse('');
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