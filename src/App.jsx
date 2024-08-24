import React from 'react';
import './App.css';
import Kanban from './component/todos';  // Correct path here
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <h1>My Todo App</h1>
        </header>
        <Kanban />
      </div>
    </ThemeProvider>
  );
}

export default App;
