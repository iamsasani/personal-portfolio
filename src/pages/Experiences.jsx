import Navbar from "../components/header/navbar";
const Experiences = () => {
  const experiences = [
    {
      number: "01",
      title: "Frontend Development",
      date: "2026 — Present",
      description:
        "Learning and building modern web applications with React and JavaScript, with a focus on responsive interfaces, reusable components, API integration and user experience.",
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
    <div className="min-h-screen bg-white text-[#222222]">
      {" "}
      <Navbar />{" "}
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 lg:px-16">
        {" "}
        {/* Page Header */}{" "}
        <div className="mb-16 border-b border-black/10 pb-8">
          {" "}
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#888888]">
            {" "}
            02 / Experience{" "}
          </p>{" "}
          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            {" "}
            Experiences{" "}
          </h1>{" "}
        </div>{" "}
        {/* Experience List */}{" "}
        <div className="space-y-16">
          {" "}
          {experiences.map((experience) => (
            <article
              key={experience.number}
              className="grid gap-8 border-b border-black/10 pb-16 lg:grid-cols-[120px_1fr]"
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
              <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
                {" "}
                <div>
                  {" "}
                  <div className="flex flex-col gap-3">
                    {" "}
                    <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                      {" "}
                      {experience.title}{" "}
                    </h2>{" "}
                    <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                      {" "}
                      {experience.date}{" "}
                    </span>{" "}
                  </div>{" "}
                  <p className="mt-6 max-w-xl text-base leading-8 text-[#666666] md:text-lg">
                    {" "}
                    {experience.description}{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#999999]">
                    {" "}
                    Skills & Technologies{" "}
                  </p>{" "}
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-widest text-[#555555]"
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
      </main>{" "}
    </div>
  );
};
export default Experiences;
