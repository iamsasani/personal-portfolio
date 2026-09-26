import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Experiences", path: "/experiences" },
    { title: "Projects", path: "/projects" },
    { title: "Resume", path: "/resume" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/profile.jpg"
            alt="Mohammad Mehdi Sasanian"
            className="h-10 w-10 rounded-full object-cover"
          />

          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#222222]">
            SASAN
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">

          {/* Menu */}
          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group relative text-sm uppercase tracking-[0.12em] text-[#444444] transition-colors duration-300 hover:text-black"
              >
                {item.title}

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#222222] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Meeting CTA */}
          <Link
            to="/meeting"
            className="group inline-flex items-center gap-2 rounded-full bg-[#222222] px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-black hover:px-6"
          >
            <span>Book a Meeting</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="17"
                rx="2"
              />

              <path d="M16 2v4M8 2v4M3 9h18" />

              <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`h-0.5 w-6 bg-[#222222] transition-transform duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />

          <span
            className={`h-0.5 w-6 bg-[#222222] transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`h-0.5 w-6 bg-[#222222] transition-transform duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-black/10 bg-white transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4">

          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="border-b border-black/10 py-4 text-sm uppercase tracking-[0.12em] text-[#444444] transition-colors duration-300 hover:text-black"
            >
              {item.title}
            </Link>
          ))}

          {/* Mobile Meeting Button */}
          <Link
            to="/meeting"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#222222] px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-black"
          >
            <span>Book a Meeting</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="17"
                rx="2"
              />

              <path d="M16 2v4M8 2v4M3 9h18" />
            </svg>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;