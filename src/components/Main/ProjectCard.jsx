import { Link } from "react-router-dom";

const ProjectCard = () => {
  return (
    <article
      id="projects"
      className="group overflow-hidden rounded-2xl border border-black/10 bg-white"
    >
      {/* Desktop: Left Image / Right Content */}
      <div className="grid lg:grid-cols-2">
        {/* LEFT - Image */}
        <div className="overflow-hidden bg-[#f1f1f1]">
          <div className="aspect-video h-full w-full lg:aspect-auto">
            <img
              src={`${import.meta.env.BASE_URL}popcorndb.png`}
              alt="Web Movie Project"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT - Content */}
        <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
          {/* Project Info */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#999999]">
              01 / Featured Project
            </p>

            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#222222] md:text-4xl">
              WEB MOVIE
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#666666] md:text-base">
              A responsive movie discovery platform built with React, featuring
              movie and TV show browsing, detailed content pages, search, genres
              and user authentication.
            </p>

            {/* Tech Stack */}
            <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#999999]">
                Tech Stack
              </p>

              <div className="flex flex-wrap gap-2">
                {["React", "Tailwind CSS", "JavaScript", "API"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-[#555555]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
            <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
              React Project
            </span>

            {/* More */}
            <Link
              to="/projects"
              className="group/more inline-flex items-center gap-3 rounded-full border border-[#222222] px-5 py-2.5 text-sm uppercase tracking-[0.15em] text-[#222222] transition-all duration-300 hover:bg-[#222222] hover:text-white"
            >
              More
              <span className="text-base transition-transform duration-300 group-hover/more:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
