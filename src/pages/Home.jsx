import Header from "../components/header/Header";
import Navbar from "../components/header/navbar";
import Contact from "../components/Main/Contact";
import ProjectCard from "../components/Main/ProjectCard";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import ExperienceSection from "../components/Main/ExperienceSection";
import Experiences from "./Experiences";
import Resume from "./Resume";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ScrollToTop from "../components/tools/ScrollToTop";

import MeetingDate from "./meeting/MeetingDate";
import MeetingTime from "./meeting/MeetingTime";
import Meeting from "./meeting/Meeting";
import MeetingDetails from "./meeting/MeetingDetails";
import MeetingConfirm from "./meeting/MeetingConfirm";
import MeetingSuccess from "./meeting/MeetingSuccess";

function Home() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Header />
                <main className="mx-auto max-w-7xl px-6 py-24">
                  <ProjectCard />
                  <ExperienceSection />
                  <Contact />
                </main>
              </>
            }
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/meeting/date" element={<MeetingDate />} />
          <Route path="/meeting/time" element={<MeetingTime />} />
          <Route path="/meeting/details" element={<MeetingDetails />} />
          <Route path="/meeting/confirm" element={<MeetingConfirm />} />
          <Route path="/meeting/success" element={<MeetingSuccess />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default Home;
