import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseCatalog from "./pages/CourseCatalog";
import CreateCourse from "./pages/CreateCourse";
import PrivateRoute from "./components/PrivateRoute";
import NavigationBar from "./components/NavigationBar";
import CourseDetails from "./pages/CourseDetails";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "Instructor" ? (
                <Navigate to="/create-course" />
              ) : (
                <Navigate to="/courses" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <CourseCatalog />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <PrivateRoute allowedRoles={["Instructor"]}>
              <CreateCourse />
            </PrivateRoute>
          }
        />
        <Route path="/courses/:courseId" element={
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
};

export default App;