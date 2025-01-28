import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import MainPage from '../pages/MainPage/MainPage';
import AddNotebookPage from '../pages/AddNotebookPage/AddNotebookPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Layout будет отображаться для всех вложенных роутов */}
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="addNotebook" element={<AddNotebookPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
