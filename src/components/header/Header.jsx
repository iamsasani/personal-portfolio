import { useEffect, useState } from "react";

const API_URL = "https://portfolio-api.workwithsasan.workers.dev";

const defaultProfile = {
  name: "Mohammad Mehdi Sasanian",
  title: "Frontend / React Developer",
  bio: "Frontend developer focused on building modern and responsive web applications with React and JavaScript.",
};

const Header = () => {
  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile`);

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await response.json();

        if (data?.profile) {
          setProfile({
            ...defaultProfile,
            ...data.profile,
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();

    const projectsSection = document.getElementById("projects");

    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScrollToExperiences = (e) => {
    e.preventDefault();

    const experiencesSection = document.getElementById("experiences");

    if (experiencesSection) {
      experiencesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const nameParts = profile.name.trim().toUpperCase().split(/\s+/);

  return (
    <header className="min-h-screen bg-white text-[#222222]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10 lg:px-16">
        {/* Top Info */}
        <div className="mb-10 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#777777]">
          <span>01 / Portfolio</span>
          <span>2026</span>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Text */}
          <div>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-[#666666]">
              {profile.title}
            </p>

            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
              {nameParts.map((part, index) => (
                <span key={`${part}-${index}`}>
                  {index > 0 && <br />}

                  <span
                    className={
                      index === nameParts.length - 1 ? "text-[#777777]" : ""
                    }
                  >
                    {part}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-10 max-w-xl">
              <p className="text-base leading-7 text-[#666666] md:text-lg">
                {profile.bio}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group inline-flex items-center gap-4 border border-[#222222] px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#222222] hover:text-white"
              >
                View Projects
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex items-center justify-between border-t border-[#e5e5e5] pt-5 text-xs uppercase tracking-[0.2em] text-[#888888]">
          <span>React / JavaScript / UI</span>

          <a
            href="#experiences"
            onClick={handleScrollToExperiences}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#888888] transition-colors duration-300 hover:text-[#222222]"
          >
            Scroll my Experiences
            <span className="transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
