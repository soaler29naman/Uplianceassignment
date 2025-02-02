import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import Editor from './components/Editor';

export default function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">Counter</Button>
          <Button component={Link} to="/form" color="inherit">Form</Button>
          <Button component={Link} to="/editor" color="inherit">Editor</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}