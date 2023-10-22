import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

// imported files
import RootLayout from '../components/sidebar/RootLayout';
import Home from '../pages/home/Home';
import ManagementCommittee from '../pages/managementCommittee/ManagementCommittee';
import Teachers from '../pages/teachers/Teachers';
import ClassRoutine from '../pages/classRoutine/ClassRoutine';
import ExamRoutine from '../pages/examRoutine/ExamRoutine';
import Notice from '../pages/notice/Notice';
import Syllabus from '../pages/syllabus/Syllabus';
import Calendar from '../pages/calendar/Calendar';
import AdmissionNotice from '../pages/admissionNotice/AdmissionNotice';
import AdmissionExamSyllabus from '../pages/admissionExamSyllabus/AdmissionExamSyllabus';
import SeekingAdmission from '../pages/seekingAdmission/SeekingAdmission';
import WaitingAdmission from '../pages/waitingAdmission/WaitingAdmission';
import SchoolResult from '../pages/schoolResult/SchoolResult';
import Events from '../pages/events/Events';

export const reactRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />}>
    <Route path='/' element={<Home />} />
    <Route path='/management-committee' element={<ManagementCommittee />} />
    <Route path='/teachers' element={<Teachers />} />
    <Route path='/teachers' element={<Teachers />} />
    <Route path='/class-routine' element={<ClassRoutine />} />
    <Route path='/exam-routine' element={<ExamRoutine />} />
    <Route path='/notice' element={<Notice />} />
    <Route path='/syllabus' element={<Syllabus />} />
    <Route path='/calendar' element={<Calendar />} />
    <Route path='/admission-notice' element={<AdmissionNotice />} />
    <Route path='/admission-exam-syllabus' element={<AdmissionExamSyllabus />} />
    <Route path='/list-of-selected-students-seeking-admission' element={<SeekingAdmission />} />
    <Route path='/list-of-selected-students-waiting-admission' element={<WaitingAdmission />} />
    <Route path='/school-result' element={<SchoolResult />} />
    <Route path='/events' element={<Events />} />
  </Route>
));