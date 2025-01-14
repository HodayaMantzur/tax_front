import React from 'react';
import HomePage from './components/HomePage';
import LoginAdmin from './components/LoginAdmin';
import LoginClient from './components/LoginClient';
import ClientList from './components/ClientList';
import CreateInvoice from './components/CreateInvoice';
import RegisterClient from './components/RegisterClient'; 
import UserInvoices from "./components/UserInvoices";
import NavigationBar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <NavigationBar /> 
      <Routes>
        {/* מסך הבית */}
        <Route path="/" element={<HomePage />} />
        
        {/* כניסת מנהל */}
        <Route path="/admin-login" element={<LoginAdmin />} />
        {/* <Route path="/client-list" element={<ClientList />} /> */}

        {/* כניסת לקוח */}
        <Route path="/client-login" element={<LoginClient />} />
        <Route path="/client-list" element={<ClientList />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
        <Route path="/user-invoices" element={<UserInvoices />} />

       
        {/* יצירת חשבון לקוח */}
        <Route path="/register" element={<RegisterClient />} /> 

      </Routes>
    </Router>
  );
};

export default App;

