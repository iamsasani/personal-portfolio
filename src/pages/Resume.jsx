import Navbar from "../components/header/navbar";

const Resume = () => {
  const skills = {
    frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Tailwind CSS",
    ],
    tools: [
      "Git",
      "GitHub",
      "Figma",
    ],
    other: [
      "REST API",
      "Context API",
      "Responsive Design",
    ],
  };

  const project = {
    number: "01",
    title: "WEB MOVIE",
    description:
      "A responsive movie discovery platform built with React, featuring movie and TV show browsing, detailed content pages, search, genres, authentication, user profiles and API integration.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "REST API",
    ],
    liveUrl:
      "https://popcorndb.workwithsasan.workers.dev/",
    githubUrl:
      "https://github.com/iamsasani",
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 lg:px-16">

        {/* Page Header */}
        <section className="border-b border-black/10 pb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#888888]">
            03 / Resume
          </p>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
                MOHAMMAD
                <br />
                MEHDI
                <br />
                <span className="text-[#777777]">SASANIAN</span>
              </h1>

              <p className="mt-8 text-sm uppercase tracking-[0.22em] text-[#666666] md:text-base">
                Frontend Developer
              </p>
            </div>

            {/* Download Button */}
            <a
              href="/resume.pdf"
              download
              className="group inline-flex w-fit items-center gap-4 border border-[#222222] px-6 py-3 text-sm uppercase tracking-[0.15em] transition duration-300 hover:bg-[#222222] hover:text-white"
            >
              Download Resume
              <span className="text-lg transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </div>
        </section>

        {/* Profile */}
        <section className="grid gap-8 border-b border-black/10 py-16 md:py-20 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
              01 / Profile
            </p>
          </div>

          <div>
            <p className="max-w-4xl text-lg leading-8 text-[#555555] md:text-2xl md:leading-10">
              I’m a frontend developer focused on building modern,
              responsive and user-friendly web experiences. I work with
              React, JavaScript, HTML, CSS and Tailwind CSS, and I enjoy
              turning ideas into clean and interactive interfaces while
              continuously improving my development and UI/UX skills.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="grid gap-8 border-b border-black/10 py-16 md:py-20 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
              02 / Skills
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">

            {/* Frontend */}
            <div>
              <h2 className="mb-5 text-sm uppercase tracking-[0.15em] text-[#555555]">
                Frontend
              </h2>

              <div className="space-y-3">
                {skills.frontend.map((skill) => (
                  <p
                    key={skill}
                    className="border-b border-black/10 pb-3 text-base text-[#666666]"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h2 className="mb-5 text-sm uppercase tracking-[0.15em] text-[#555555]">
                Tools
              </h2>

              <div className="space-y-3">
                {skills.tools.map((skill) => (
                  <p
                    key={skill}
                    className="border-b border-black/10 pb-3 text-base text-[#666666]"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            {/* Other */}
            <div>
              <h2 className="mb-5 text-sm uppercase tracking-[0.15em] text-[#555555]">
                Other
              </h2>

              <div className="space-y-3">
                {skills.other.map((skill) => (
                  <p
                    key={skill}
                    className="border-b border-black/10 pb-3 text-base text-[#666666]"
                  >
                    {skill}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Experience */}
        <section className="grid gap-8 border-b border-black/10 py-16 md:py-20 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
              03 / Experience
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Frontend Development
              </h2>

              <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                2026 — Present
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#666666] md:text-lg">
              Building modern web applications with React and JavaScript,
              while developing practical skills in component architecture,
              API integration, state management, responsive UI and
              Git/GitHub workflows.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="grid gap-8 border-b border-black/10 py-16 md:py-20 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
              04 / Education
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                  Bachelor of Computer Engineering
                </h2>

                <p className="mt-3 text-base text-[#666666] md:text-lg">
                  Software Engineering
                </p>

                <p className="mt-2 text-base text-[#777777]">
                  Islamic Azad University, Marvdasht Branch
                </p>
              </div>

              <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                Bachelor’s Degree
              </span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="grid gap-8 border-b border-black/10 py-16 md:py-20 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
              05 / Project
            </p>
          </div>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {project.title}
              </h2>

              <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                {project.number}
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#666666] md:text-lg">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-widest text-[#555555]"
                >
                  {technology}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-6">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase tracking-[0.12em] text-[#444444] transition hover:text-black"
              >
                Live Website ↗
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase tracking-[0.12em] text-[#444444] transition hover:text-black"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="grid gap-8 py-16 md:py-20 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
              06 / Contact
            </p>
          </div>

          <div>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tighter md:text-6xl">
              LET&apos;S WORK
              <br />
              <span className="text-[#777777]">TOGETHER.</span>
            </h2>

            <div className="mt-10 flex flex-wrap gap-6">
              <a
                href="https://github.com/iamsasani"
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase tracking-[0.12em] text-[#555555] transition hover:text-black"
              >
                GitHub ↗
              </a>

              <a
                href="https://t.me/m_sasanian"
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase tracking-[0.12em] text-[#555555] transition hover:text-black"
              >
                Telegram ↗
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Resume;

