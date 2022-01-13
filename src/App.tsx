import React, { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { User } from '@supabase/supabase-js';
import GlobalStyless from './styles/global';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import DataPickerr from './Pages/DataPicker/DataPickerr';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';
import { RootState } from './store/store';
import HomePage from './Pages/Home/HomePage';
import Protected from './Pages/Protected';
import SchedulePage from './Pages/Schedule/SchedulePage';

const App: React.FC = () => {
  const user: any = useSelector((state: RootState) => state.auth.value);
  const isLogged = user.aud === 'authenticated';
  return (
    <Router>
      <div>
        <GlobalStyless />
        <div>
          {isLogged && (
            <nav>
              <ul>
                <li>
                  <Link to="/schedule">Schedule</Link>
                </li>
                <li>
                  <Link to="/datepicker">DatePicker</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <Routes>
          <Route
            path="/"
            element={isLogged ? <Navigate to="/start" /> : <LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<Protected is={isLogged} />}>
            <Route path="/start" element={<HomePage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/datepicker" element={<DataPickerr />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
