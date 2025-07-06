import React from 'react';
import '../../styles/user/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-bg">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">TK</div>
        <nav className="sidebar-nav">
          <a className="sidebar-link active" href="#"><span className="sidebar-icon home"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon events"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon profile"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon notifications"></span></a>
          <a className="sidebar-link" href="#"><span className="sidebar-icon settings"></span></a>
        </nav>
      </aside>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="dashboard-logo">TRISHNA 2K25</div>
          <div className="dashboard-user">Welcome, User</div>
        </header>
        <main className="dashboard-main">
          <section className="dashboard-welcome">
            <h1>Welcome to your Dashboard</h1>
            <p>Track your registrations, events, and updates here. Explore all features and manage your profile easily.</p>
          </section>
          <section className="dashboard-cards">
            <div className="dashboard-card">
              <h2>My Events</h2>
              <p>View and manage your registered events.</p>
            </div>
            <div className="dashboard-card">
              <h2>Profile</h2>
              <p>Update your personal information and preferences.</p>
            </div>
            <div className="dashboard-card">
              <h2>Notifications</h2>
              <p>Stay up to date with the latest announcements.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
