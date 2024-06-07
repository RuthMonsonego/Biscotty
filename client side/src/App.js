import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './final-project/features/user/logIn';
import NavBarUser from './final-project/features/user/navBarUser';
import NavBarManager from './final-project/features/user/navBarManager';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/navbaruser/" element={<NavBarUser />} />
                <Route path="/navbarmanager" element={<NavBarManager />} />
            </Routes>
        </Router>
    );
}

export default App;
