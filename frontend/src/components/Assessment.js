import React from 'react';
import './Assessment.css';

function Assessment() {
  return (
    <div className="assessment-container">
      <div className="assessment-content">
        <div className="assessment-form">
          <div className="form-group">
            <div className="select-wrapper">
              <select defaultValue="" className="form-select">
                <option value="" disabled>Subject</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </select>
            </div>
            
            <div className="select-wrapper">
              <select defaultValue="" className="form-select">
                <option value="" disabled>Topics</option>
                <option value="algebra">Algebra</option>
                <option value="geometry">Geometry</option>
                <option value="calculus">Calculus</option>
              </select>
            </div>
            
            <div className="select-wrapper">
              <select defaultValue="" className="form-select">
                <option value="" disabled>Number of Questions</option>
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
                <option value="20">20 Questions</option>
              </select>
            </div>
          </div>
          
          <button className="launch-button">
            Launch Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Assessment; 