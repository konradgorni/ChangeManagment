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
import ManagerBoardPage from './Pages/ManagerBoard/ManagerBoardPage';
import Nav from './components/Nav/Nav';
import SettingsPage from './Pages/Settings/SettingsPage';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth);
  const isLogged = user.value?.aud === 'authenticated';
  const { isManager, isAdmin } = user;
  return (
    <Router>
      <div>
        <GlobalStyless />
        {isLogged && (
          <Nav isLogged={isLogged} isManager={isManager} isAdmin={isAdmin} />
        )}
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
          <Route element={<Protected path="/" is={isLogged} />}>
            <Route path="/start" element={<HomePage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route element={<Protected path="/managerboard" is={isManager} />}>
              <Route path="/managerboard" element={<ManagerBoardPage />} />
            </Route>
            <Route element={<Protected path="/settings" is={isAdmin} />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
