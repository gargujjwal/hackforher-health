import {Toaster} from "react-hot-toast";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import ProtectedRoute from "./components/protected-route";
import Root from "./components/root";
import DashboardLayout from "./layouts/dashboard";
import IndexPage from "./pages";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import DoctorDashboard from "./pages/dashboard/doctor";
import MedicalCasePage from "./pages/dashboard/patient/medical-case";
import PatientDashboard from "./pages/dashboard/patient";
import NotFoundPage from "./pages/not-found";
import CreateMedicalCasePage from "./pages/dashboard/patient/medical-case/create.index";
import MedicalCaseDetailPage from "./pages/dashboard/patient/medical-case/detail";
import QuestionnaireIndexPage from "./components/questionnaire";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <IndexPage/>
            </ProtectedRoute>
          ),
        },
        {
          path: "auth",
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
          ],
        },
        {path: "questionnaire", element: <QuestionnaireIndexPage/>},
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "patient", element: <PatientDashboard /> },
            { path: "patient/medical-case", element: <MedicalCasePage /> },
            {
              path: "patient/medical-case/:medicalCaseId",
              element: <MedicalCaseDetailPage/>,
            },
            {
              path: "patient/medical-case/create",
              element: <CreateMedicalCasePage />,
            },
            { path: "doctor", element: <DoctorDashboard /> },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={router} />
    </>
  );
}
