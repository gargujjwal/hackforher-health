import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/protected-route";
import Root from "./components/root";
import DashboardLayout from "./layouts/dashboard";
import LoginPage from "./pages/auth/login.index";
import SignupPage from "./pages/auth/signup.index";
import DoctorDashboard from "./pages/dashboard/doctor";
import PatientDashboard from "./pages/dashboard/patient";
import NotFoundPage from "./pages/not-found";
import CreateMedicalCasePage from "./pages/dashboard/patient/medical-case/create.index";
import MedicalCaseDetailPage from "./pages/dashboard/patient/medical-case/[medicalCaseId].index";
import BadRequestPage from "./pages/bad-request";
import CurrentMedicalCasePage from "./pages/dashboard/patient/current.index";
import QuestionnaireIndexPage from "./pages/questionnaire.index";
import QuestionnaireSubmissionViewPage from "./pages/dashboard/patient/questionnaire-submission/view.index";
import QuestionnaireRespondPage from "./pages/dashboard/patient/questionnaire/respond.index";
import AuthencticatedPatientProfilePage from "./pages/dashboard/patient/profile";
import PatientEditFormPage from "./pages/dashboard/patient/profile/edit.index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "auth",
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
          ],
        },
        { path: "questionnaire", element: <QuestionnaireIndexPage /> },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "patient", element: <PatientDashboard /> },
            {
              path: "patient/profile",
              element: <AuthencticatedPatientProfilePage />,
            },
            { path: "patient/profile/edit", element: <PatientEditFormPage /> },
            {
              path: "patient/medical-case/current",
              element: <CurrentMedicalCasePage />,
            },
            {
              path: "patient/medical-case/:medicalCaseId",
              element: <MedicalCaseDetailPage />,
            },
            {
              path: "patient/medical-case/create",
              element: <CreateMedicalCasePage />,
            },
            {
              path: "patient/questionnaire/respond",
              element: <QuestionnaireRespondPage />,
            },
            {
              path: "patient/questionnaire/submission/:questionnaireSubmissionId",
              element: <QuestionnaireSubmissionViewPage />,
            },
            { path: "doctor", element: <DoctorDashboard /> },
          ],
        },
        { path: "400", element: <BadRequestPage /> },
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

export default App;
