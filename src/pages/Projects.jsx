import Navbar from "../components/header/navbar";

const Projects = () => {
  const project = {
    title: "WEB MOVIE",

    description:
      "A responsive movie discovery platform built with React, featuring movie and TV show browsing, detailed content pages, search, genres, authentication, user profiles, and API integration.",

    features: [
      "Movie Discovery",
      "Movie & TV Details",
      "Search & Genres",
      "Actor Profiles",
      "Authentication",
      "User Profile",
      "API Integration",
      "Responsive UI",
      "Context API",
      "Reusable Components",
    ],

    technologies: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "API",
    ],

    image: `${import.meta.env.BASE_URL}popcorndb.png`,

    liveUrl:
      "https://popcorndb.workwithsasan.workers.dev/",

    githubUrl:
      "https://github.com/iamsasani",
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">

      {/* Navbar */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 lg:px-16">

        {/* Page Header */}
        <div className="mb-16 border-b border-black/10 pb-8">

          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#888888]">
            02 / Selected Project
          </p>

          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Projects
          </h1>

        </div>

        {/* Project */}
        <article>

          <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">

            {/* LEFT - Image */}
            <div className="overflow-hidden rounded-2xl bg-[#f1f1f1]">
              <div className="aspect-video w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT - Info */}
            <div>

              {/* Title */}
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#999999]">
                01 / Web Development
              </p>

              <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
                {project.title}
              </h2>

              {/* Description */}
              <p className="mt-6 text-base leading-8 text-[#666666] md:text-lg">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-10">

                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#999999]">
                  Tech Stack
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-widest text-[#555555]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

              {/* Features */}
              <div className="mt-12">

                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#999999]">
                  What I Built
                </p>

                <div className="divide-y divide-black/10 border-t border-black/10">

                  {project.features.map((feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center gap-4 py-3 text-sm text-[#555555]"
                    >
                      <span className="text-xs text-[#999999]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>{feature}</span>
                    </div>
                  ))}

                </div>

              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#222222] px-6 py-3 text-sm uppercase tracking-[0.12em] transition duration-300 hover:bg-[#222222] hover:text-white"
                >
                  Live Website ↗
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-[0.12em] text-[#555555] transition duration-300 hover:border-[#222222] hover:text-[#222222]"
                >
                  GitHub ↗
                </a>

              </div>

            </div>
          </div>
        </article>

      </main>
    </div>
  );
};

export default Projects;

