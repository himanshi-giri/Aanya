import React from 'react';
import './PracticeQuestions.css';

function PracticeQuestions() {
  return (
    <div className="practice-container">
      <div className="practice-content">
        <div className="practice-form">
          <div className="form-group">
            <div className="select-wrapper">
              <select defaultValue="" className="form-select">
                <option value="" disabled>Math</option>
                <option value="math">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
              </select>
            </div>
            
            <div className="select-wrapper">
              <select defaultValue="" className="form-select">
                <option value="" disabled>Quadratic Equation</option>
                <option value="quadratic">Quadratic Equation</option>
                <option value="algebra">Algebra</option>
                <option value="geometry">Geometry</option>
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

export default PracticeQuestions; 