import {
 BrowserRouter,
 Routes,
 Route
}
from
"react-router-dom";

import {
 AuthProvider
}
from
"./context/authContext";

import Login
from "./pages/login";

import Register
from "./pages/Register";

import Dashboard
from "./pages/Dashboard";

import NotFound
from "./pages/NotFound";

import ProtectedRoute
from "./routes/ProtectedRoute";
import CreateResume from "./pages/CreateResume";
import EditResume from "./pages/EditResume";
import ResumeDetails from "./pages/ResumeDetails";
import PublicResume from './pages/PublicResume'; // or wherever the file actually lives

import {
 ToastContainer
}
from
"react-toastify";

import
"react-toastify/dist/ReactToastify.css";

function App(){

 return(

  <AuthProvider>

   <BrowserRouter>

    <ToastContainer />

    <Routes>
     <Route path="/" element={<Login />} />

     <Route
      path="/login"
      element={<Login />}
     />

     <Route
      path="/register"
      element={<Register />}
     />

     <Route
      path="/dashboard"
      element={

       <ProtectedRoute>

        <Dashboard />

       </ProtectedRoute>

      }
     />
     <Route
 path="/resume/create"
 element={
 <ProtectedRoute>
  <CreateResume />
 </ProtectedRoute>
 }
/>

<Route
 path="/resume/edit/:id"
 element={
 <ProtectedRoute>
  <EditResume />
 </ProtectedRoute>
 }
/>

<Route
 path="/resume/:id"
 element={
 <ProtectedRoute>
  <ResumeDetails />
 </ProtectedRoute>
 }
/>
<Route

 path="/resume/public/:id"

 element={
 // eslint-disable-next-line no-undef
 <PublicResume />
 }

/>
     

     <Route
      path="*"
      element={<NotFound />}
     />

    </Routes>

   </BrowserRouter>

  </AuthProvider>

 );

}

export default App;
