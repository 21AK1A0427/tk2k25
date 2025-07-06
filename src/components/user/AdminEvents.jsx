import React, { useState } from 'react'; // Added useEffect
import '../../styles/user/AdminEvents.css'; // Import the CSS file

// Image Imports
import technicalCategoryImage from '../../assets/images/12979916_5079835.jpg';
import nonTechCategoryImage from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import roboticsCategoryImage from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import workshopsCategoryImage from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import guestLecturesCategoryImage from '../../assets/images/12979916_5079835.jpg';

import projectExpoImage from '../../assets/images/12979916_5079835.jpg';
import hackathonImage from '../../assets/images/12979916_5079835.jpg';
import nextCodeImage from '../../assets/images/12979916_5079835.jpg';
import rubeACubeImage from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import cookWithoutFireImage from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import overdriveImage from '../../assets/images/7a43990d-d691-4aa5-a7d6-5f9c9c5d530f.jpg';
import roboRaceImage from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import webDesignWorkshopImage from '../../assets/images/a346fb78-710f-4faa-b5b1-a87812e13510.jpg';
import githubWorkshopImage from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import iotLectureImage from '../../assets/images/Codeathon 2k25 Invitation.jpg';
import cyberSecurityLectureImage from '../../assets/images/Codeathon 2k25 Invitation.jpg';


// Updated placeholder data with image paths
const categoriesData = [
  { id: 'technical', name: 'Technical', image: technicalCategoryImage },
  { id: 'non-tech', name: 'Non-Tech', image: nonTechCategoryImage },
  { id: 'robotics', name: 'Robotics', image: roboticsCategoryImage },
  { id: 'workshops', name: 'Workshops', image: workshopsCategoryImage },
  { id: 'guest-lectures', name: 'Guest Lectures', image: guestLecturesCategoryImage },
];

const eventsData = {
  technical: [
    { id: 'proj-expo', name: 'Project Expo', description: 'Showcase your innovative projects.', date: '2025-08-15', image: projectExpoImage },
    { id: 'hackathon', name: 'Hackathon', description: 'A 24-hour coding marathon.', date: '2025-09-10', image: hackathonImage },
    { id: 'nextcode', name: 'NextCode', description: 'Competitive coding challenge.', date: '2025-09-20', image: nextCodeImage },
  ],
  'non-tech': [
    { id: 'rube-cube', name: 'Rube a Cube', description: "Solve the Rubik's cube challenge.", date: '2025-10-05', image: rubeACubeImage }, // Corrected escaped quote
    { id: 'cook-off', name: 'Cook Without Fire', description: 'Culinary skills without fire.', date: '2025-10-10', image: cookWithoutFireImage },
  ],
  robotics: [
    { id: 'overdrive', name: 'Overdrive', description: 'Robotic car racing.', date: '2025-11-01', image: overdriveImage },
    { id: 'robo-race', name: 'Robo Race', description: 'Autonomous robot race.', date: '2025-11-05', image: roboRaceImage },
  ],
  workshops: [
    { id: 'web-design', name: 'Web Design', description: 'Learn modern web design.', date: '2025-11-15', image: webDesignWorkshopImage },
    { id: 'github-ws', name: 'GitHub', description: 'Master Git and GitHub.', date: '2025-11-20', image: githubWorkshopImage },
  ],
  'guest-lectures': [
    { id: 'iot-lecture', name: 'IoT Insights', description: 'Exploring the Internet of Things.', date: '2025-12-01', image: iotLectureImage },
    { id: 'cyber-security-gl', name: 'Cyber Security', description: 'Talk on modern cyber threats.', date: '2025-12-05', image: cyberSecurityLectureImage },
  ],
};

const AdminEvents = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventCode, setEventCode] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState({ message: '', type: '' });
// State for animated heading
  // Full text for animation



  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep(2);
    setSelectedEvent(null);
    setSubmissionStatus({ message: '', type: '' });
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentStep(3);
    setEventCode('');
    setSubmissionStatus({ message: '', type: '' });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (eventCode) {
      console.log(`Code "${eventCode}" submitted for event "${selectedEvent?.name}"`);
      // Changed submission message
      setSubmissionStatus({ message: 'Navigating to event...', type: 'success' });
      setEventCode('');
      setTimeout(() => {
        goToEventPage();
      }, 2000);
    } else {
      setSubmissionStatus({ message: 'Please enter a code to submit.', type: 'error' });
    }
  };

  const goToEventPage = () => {
    alert(`Simulating navigation to the main page for ${selectedEvent?.name}`);
    // resetSelection(); // Optionally reset after navigation
  };
  
  // const resetSelection = () => { // Commented out as it's not used after removing the start over button
  //   setCurrentStep(1);
  //   setSelectedCategory(null);
  //   setSelectedEvent(null);
  //   setEventCode('');
  //   setSubmissionStatus({ message: '', type: '' });
  // };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: {
        return (
          <div className="step-content">
            <h3>Select an Event Category</h3>
            <div className="category-card-list">
              {categoriesData.map((cat) => (
                <div key={cat.id} className="category-card" onClick={() => handleCategorySelect(cat)}>
                  <img src={cat.image} alt={cat.name} className="card-image" />
                  <p className="card-name">{cat.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 2: {
        if (!selectedCategory) return <p className="error-message">No category selected. Please go back.</p>;
        const categoryEvents = eventsData[selectedCategory.id] || [];
        return (
          <div className="step-content">
            <h3>Events in {selectedCategory.name}</h3>
            <button onClick={() => setCurrentStep(1)} className="back-button sci-fi-button">Back to Categories</button>
            <div className="event-card-list">
              {categoryEvents.length > 0 ? (
                categoryEvents.map((event) => (
                  <div key={event.id} className="event-card" onClick={() => handleEventSelect(event)}>
                    <img src={event.image} alt={event.name} className="card-image" />
                    <p className="card-name">{event.name}</p>
                  </div>
                ))
              ) : (
                <p>No events found in this category.</p>
              )}
            </div>
          </div>
        );
      }
      case 3: {
        if (!selectedEvent) return <p className="error-message">No event selected. Please go back.</p>;
        return (
          <div className="step-content event-details">
            <h3>{selectedEvent.name}</h3>
            <button onClick={() => setCurrentStep(2)} className="back-button sci-fi-button">Back to Events in {selectedCategory?.name}</button>
            
            {/* Centered Event Actions Container */}
            <div className="event-actions-container">
              
              
              <form onSubmit={handleCodeSubmit} className="event-actions-form">
                {/* Removed the label for a cleaner look, placeholder is descriptive enough */}
                {/* <label htmlFor="eventCode" className="event-code-label">Submit Code for Event:</label> */}
                <div className="input-button-group"> {/* Changed class name for clarity */}
                  <textarea
                    id="eventCode"
                    value={eventCode}
                    onChange={(e) => setEventCode(e.target.value)}
                    placeholder="Enter Event Code Here..."
                    className="event-code-input"
                    rows={1} // Start with a single row, it can expand if needed or styled with height
                  />
                  <button type="submit" className="submit-button sci-fi-button event-action-button">Go to Event</button>
                </div>
              </form>
              {submissionStatus.message && 
                <p className={`submission-status ${submissionStatus.type}`}>
                  {submissionStatus.message}
                </p>
              }
            </div>
          </div>
        );
      }
      default:
        return <p className="error-message">Something went wrong. Please try again.</p>;
    }
  };

  return (
    <div className="admin-events-container">
      {/* Removed the h2 title from here as it's now in AdminDashboard header */}
      {/* Removed the Start Over button */}
      <div className="event-steps-container">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default AdminEvents;
