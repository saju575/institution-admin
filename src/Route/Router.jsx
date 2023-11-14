import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// imported files
import RootLayout from "../components/sidebar/RootLayout";
import AboutUs from "../pages/aboutUs/AboutUs";
import AdmissionExamSyllabus from "../pages/admissionExamSyllabus/AdmissionExamSyllabus";
import AdmissionNotice from "../pages/admissionNotice/AdmissionNotice";
import AimAndObjective from "../pages/aimAndObjective/AimAndObjective";
import ClassRoutine from "../pages/classRoutine/ClassRoutine";
import Contact from "../pages/contact/Contact";
import DebateCompetition from "../pages/debateCompetition/DebateCompetition";
import DetailEvents from "../pages/detailEvents/DetailEvents";
import Events from "../pages/events/Events";
import ExamRoutine from "../pages/examRoutine/ExamRoutine";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ManagementCommittee from "../pages/managementCommittee/ManagementCommittee";
import News from "../pages/news/News";
import Notice from "../pages/notice/Notice";
import NoticeDetails from "../pages/noticeDetails/NoticeDetails";
import Play from "../pages/play/Play";
import PresidentMessage from "../pages/presidentMessage/PresidentMessage";
import PrincipalMessage from "../pages/principalMessage/PrincipalMessage";
import CheckResult from "../pages/schoolResult/checkResult/CheckResult";
import UploadResult from "../pages/schoolResult/uploadResult/UploadResult";
import ScoutGuide from "../pages/scoutGuide/ScoutGuide";
import SeekingAdmission from "../pages/seekingAdmission/SeekingAdmission";
import Syllabus from "../pages/syllabus/Syllabus";
import Teachers from "../pages/teachers/Teachers";
import WaitingAdmission from "../pages/waitingAdmission/WaitingAdmission";
import Workers from "../pages/workers/Workers";

export const reactRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Home />} />
      <Route path="/" element={<News />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/aim-objective" element={<AimAndObjective />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/scout-guide" element={<ScoutGuide />} />
      <Route path="/debate-competition" element={<DebateCompetition />} />
      <Route path="/play" element={<Play />} />
      <Route path="/management-committee" element={<ManagementCommittee />} />
      <Route path="/president-message" element={<PresidentMessage />} />
      <Route path="/principal-message" element={<PrincipalMessage />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/workers" element={<Workers />} />
      <Route path="/class-routine" element={<ClassRoutine />} />
      <Route path="/exam-routine" element={<ExamRoutine />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/syllabus" element={<Syllabus />} />
      <Route path="/admission-notice" element={<AdmissionNotice />} />
      <Route
        path="/admission-exam-syllabus"
        element={<AdmissionExamSyllabus />}
      />
      <Route
        path="/list-of-selected-students-seeking-admission"
        element={<SeekingAdmission />}
      />
      <Route
        path="/list-of-selected-students-waiting-admission"
        element={<WaitingAdmission />}
      />
      <Route path="/school-result" element={<UploadResult />} />
      <Route path="/check-school-result" element={<CheckResult />} />
      <Route path="/events" element={<Events />} />
      {/* Edit Next line */}
      <Route path="/detail-events" element={<DetailEvents />} />

      <Route path="/notice/:id" element={<NoticeDetails />} />
    </Route>
  )
);
