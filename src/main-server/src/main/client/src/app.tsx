import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import QuestionnairePatientPage from "./pages/dashboard/patient/questionnaire/questionnaire-patient-page.index";
import BadRequestPage from "./pages/bad-request";
import QuestionnaireSubmissionViewPage from "./pages/dashboard/patient/questionnaire/submission/view.index";
import CurrentMedicalCasePage from "./pages/dashboard/patient/medical-case/current.index";

export default function App() {
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
            { path: "patient/current", element: <CurrentMedicalCasePage /> },
            { path: "patient/medical-case", element: <MedicalCasePage /> },
            {
              path: "patient/medical-case/:medicalCaseId",
              element: <MedicalCaseDetailPage />,
            },
            {
              path: "patient/medical-case/create",
              element: <CreateMedicalCasePage />,
            },
            {
              path: "patient/questionnaire",
              element: <QuestionnairePatientPage />,
            },
            {
              path: "patient/questionnaire-submission/:questionnaireSubmissionId",
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
