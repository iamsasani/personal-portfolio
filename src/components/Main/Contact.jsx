import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setIsLoading(true);

    try {
      const response = await fetch(
         "https://portfolio-api.workwithsasan.workers.dev/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message:
          "Unable to send your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-white px-6 py-24 text-[#222222] md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-16 border-b border-black/10 pb-6">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#888888]">
            04 / Contact
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Get in Touch
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">

          {/* Left */}
          <div>
            <h3 className="max-w-md text-4xl font-semibold tracking-tighter md:text-5xl">
              LET&apos;S WORK
              <br />
              <span className="text-[#777777]">
                TOGETHER.
              </span>
            </h3>

            <p className="mt-6 max-w-md text-base leading-8 text-[#666666]">
              Have a project, opportunity or question?
              Send me a message and I&apos;ll get back to you.
            </p>

            {/* Contact Links */}
            <div className="mt-10 space-y-4">
              <a
                href="https://github.com/iamsasani"
                target="_blank"
                rel="noreferrer"
                className="block text-sm uppercase tracking-[0.12em] text-[#666666] transition hover:text-black"
              >
                GitHub ↗
              </a>

              <a
                href="https://t.me/m_sasanian"
                target="_blank"
                rel="noreferrer"
                className="block text-sm uppercase tracking-[0.12em] text-[#666666] transition hover:text-black"
              >
                Telegram ↗
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#888888]"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b border-black/15 bg-transparent px-0 py-3 text-base text-[#222222] outline-none transition-colors placeholder:text-[#aaaaaa] focus:border-[#222222]"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#888888]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-black/15 bg-transparent px-0 py-3 text-base text-[#222222] outline-none transition-colors placeholder:text-[#aaaaaa] focus:border-[#222222]"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#888888]"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border-b border-black/15 bg-transparent px-0 py-3 text-base text-[#222222] outline-none transition-colors placeholder:text-[#aaaaaa] focus:border-[#222222]"
                placeholder="What is this about?"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#888888]"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full resize-none border-b border-black/15 bg-transparent px-0 py-3 text-base text-[#222222] outline-none transition-colors placeholder:text-[#aaaaaa] focus:border-[#222222]"
                placeholder="Write your message..."
              />
            </div>

            {/* Status */}
            {status.message && (
              <p
                className={`text-sm ${
                  status.type === "success"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {status.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group inline-flex items-center gap-4 border border-[#222222] px-6 py-3 text-sm uppercase tracking-[0.15em] transition duration-300 hover:bg-[#222222] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}

              {!isLoading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;