import Header from "../components/header/Header";
import Navbar from "../components/header/navbar";
import Contact from "../components/Main/Contact";
import ProjectCard from "../components/Main/ProjectCard";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import ExperienceSection from "../components/Main/ExperienceSection";
import Experiences from "./Experiences";
import Resume from "./Resume";

function Home() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Header />
                <main className="mx-auto max-w-7xl px-6 py-24">
                  <ProjectCard />
                  <ExperienceSection/>
                  <Contact />
                </main>
              </>
            }
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </Router>
    </>
  );
}

export default Home;
