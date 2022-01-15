import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import GlobalStyless from './styles/global';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage from './Pages/Register/RegisterPage';
import { RootState } from './store/store';
import HomePage from './Pages/Home/HomePage';
import Protected from './Pages/Protected';
import SchedulePage from './Pages/Schedule/SchedulePage';
import DataPicker from './Pages/DataPicker/DataPickerr';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.value);
  const isLogged = user?.aud === 'authenticated';
  console.log(user, 'czymjest');
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
            element={
              isLogged ? <Navigate to="/start" /> : <Navigate to="/login" />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login/:createdAccount" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Protected is={isLogged} />}>
            <Route path="/start" element={<HomePage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/datepicker" element={<DataPicker />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
