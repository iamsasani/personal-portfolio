
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Experiences", href: "#experiences" },
    { title: "Projects", href: "#projects" },
    { title: "Resume", href: "#resume" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">

        {/* Profile + Name */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/profile.jpg"
            alt="Mohammad Mehdi Sasanian"
            className="h-10 w-10 rounded-full object-cover "
          />

          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#222222]">
            SASAN
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 md:flex">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group relative text-sm uppercase tracking-[0.12em] text-[#444444] transition-colors duration-300 hover:text-black"
            >
              {item.title}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#222222] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
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
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="border-b border-black/10 py-4 text-sm uppercase tracking-[0.12em] text-[#444444] transition-colors duration-300 hover:text-black"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

