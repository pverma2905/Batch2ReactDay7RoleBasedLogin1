import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Layout from './components/Layout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AccountManagerDashboard from './pages/accountmanager/AccountManagerDashboard';
import EndUserDashboard from './pages/enduser/EndUserDashboard';
import ResellerDashboard from './pages/reseller/ResellerDashboard';


function App() {
  // const navigate = useNavigate();
  let role = JSON.parse(localStorage.getItem('userData')).role
  console.log("rrrrrrrrrr", role)
  if (!role) {
    return <Login />
  }
  // else {
  //   if (role === 'admin') {
  //     return <AdminDashboard />
  //   }
  //   if (role === 'enduser') {
  //     return <EndUserDashboard />
  //   }
  //   if (role === 'account_manager') {
  //     return <AccountManagerDashboard />
  //   }
  //   if (role === 'reseller') {
  //     return <ResellerDashboard />
  //   }
  // }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
            <Route path="/accountmangerDashboard" element={<AccountManagerDashboard />}></Route>
            <Route path="/enduserDashboard" element={<EndUserDashboard />}></Route>
            <Route path="/resellerDashboard" element={<ResellerDashboard />}></Route>

          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
