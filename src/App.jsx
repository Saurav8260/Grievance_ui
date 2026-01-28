import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import AddAgent from "./pages/AddAgent";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetails";
import MainLayout from "./MainLayout";
import GrievanceDetails from "./pages/GrievanceDetails";
import EditGrievance from "./pages/EditGrievance";
import GrievanceList from "./pages/GrievanceList";
import AllGrievances from "./pages/AllGrievances";

// simple auth guard
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/grievance/:id" element={<GrievanceDetails />} />
        <Route path="/grievance/edit/:id" element={<EditGrievance />} />
        <Route path="/grievances" element={<GrievanceList />} />
        {/* <Route path="/allgrievances" element={<AllGrievances />} /> */}


        {/* Protected Layout */}
        <Route element={<MainLayout />}>
        
        <Route
          path="/allgrievances"
          element={
            <PrivateRoute>
              <AllGrievances />
            </PrivateRoute>
          }
        />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/AddAgent"
            element={
              <PrivateRoute>
                <AddAgent />
              </PrivateRoute>
            }
          /> */}

          <Route
            path="/userdetails"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/grievances/:id"
            element={
              <PrivateRoute>
                <GrievanceDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/grievances/edit/:id"
            element={
              <PrivateRoute>
                <EditGrievance />
              </PrivateRoute>
            }
          />

          <Route
            path="/grievances"
            element={
              <PrivateRoute>
                <GrievanceList />
              </PrivateRoute>
            }
          />
        </Route>


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
