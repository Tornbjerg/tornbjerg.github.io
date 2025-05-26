import React from 'react';
import './styles/App.scss';
import Header from './components/layout/Header';
import ProjectShowcase from './components/projects/ProjectShowcase';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ProjectShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default App;
