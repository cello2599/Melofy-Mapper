import React from 'react';
import './App.css';
import MusicGenreDetection from './components/MusicGenreDetection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <h1>Melody Mapper</h1>
          <nav>
            <ul>
              <li>Music Genre Detection</li> 
              <li>Teams</li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <MusicGenreDetection />
      </main>
    </div>
  );
}

export default App;
