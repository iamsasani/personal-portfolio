const ExperienceSection = () => {
  const experiences = [
    {
      number: "01",
      title: "Frontend Development",
      date: "2026 — Present",
      description:
        "Learning and building modern web applications with React and JavaScript, while focusing on responsive design, reusable components and user experience.",
      technologies: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Git / GitHub",
        "REST API",
      ],
    },
  ];
  return (
    <section
      id="experiences"
      className="scroll-mt-24 bg-white px-6 py-24 text-[#222222] md:px-10 md:py-32 lg:px-16"
    >
      {" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        {/* Section Header */}{" "}
        <div className="mb-16 border-b border-black/10 pb-6">
          {" "}
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#888888]">
            {" "}
            02 / Experience{" "}
          </p>{" "}
          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            {" "}
            Experiences{" "}
          </h2>{" "}
        </div>{" "}
        {/* Experience List */}{" "}
        <div className="space-y-12">
          {" "}
          {experiences.map((experience) => (
            <article
              key={experience.number}
              className="grid gap-8 border-b border-black/10 pb-12 lg:grid-cols-[120px_1fr]"
            >
              {" "}
              {/* Number */}{" "}
              <div>
                {" "}
                <span className="text-sm tracking-[0.2em] text-[#999999]">
                  {" "}
                  {experience.number}{" "}
                </span>{" "}
              </div>{" "}
              {/* Content */}{" "}
              <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                {" "}
                {/* Main Info */}{" "}
                <div>
                  {" "}
                  <div className="flex flex-wrap items-center gap-4">
                    {" "}
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                      {" "}
                      {experience.title}{" "}
                    </h3>{" "}
                    <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                      {" "}
                      {experience.date}{" "}
                    </span>{" "}
                  </div>{" "}
                  <p className="mt-5 max-w-xl text-base leading-8 text-[#666666] md:text-lg">
                    {" "}
                    {experience.description}{" "}
                  </p>{" "}
                </div>{" "}
                {/* Technologies */}{" "}
                <div>
                  {" "}
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#999999]">
                    {" "}
                    Focus{" "}
                  </p>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-widest] text-[#555555]"
                      >
                        {" "}
                        {technology}{" "}
                      </span>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </article>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default ExperienceSection;
