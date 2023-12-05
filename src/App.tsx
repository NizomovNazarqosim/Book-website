import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { HomePage } from './pages/book-page/home-page';
import { SignUp } from './pages/auth-page/sign-up/sign-up';
import { LoginForm } from './pages/auth-page/login/login-form';
import { NotFound } from './pages/not-found/not-found';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/books' element={<HomePage/>} />
        <Route path='/*' element={<NotFound/>} />

      </Routes>
    </>
  );
}

export default App;
