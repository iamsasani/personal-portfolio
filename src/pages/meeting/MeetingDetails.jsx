import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const MeetingDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!selectedDate || !selectedTime) {
      navigate("/meeting/date", { replace: true });
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const meetingDetails = {
      name: name.trim(),
      email: email.trim(),
      topic: topic.trim(),
      notes: notes.trim(),
      timezone,
    };

    // Store personal details temporarily
    sessionStorage.setItem(
      "meetingDetails",
      JSON.stringify(meetingDetails)
    );

    navigate(
      `/meeting/confirm?date=${selectedDate}&time=${selectedTime}`
    );
  };

  const formattedDate = selectedDate
    ? new Date(
        `${selectedDate}T00:00:00`
      ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const formattedTime = selectedTime
    ? (() => {
        const [hours, minutes] = selectedTime.split(":");
        const hour = Number(hours);
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour =
          hour % 12 === 0 ? 12 : hour % 12;

        return `${displayHour}:${minutes} ${period}`;
      })()
    : "";

  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 text-[#222222]">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#999999]">
            Meeting / Step 03
          </p>

          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Your Details
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#666666] md:text-lg">
            Tell me a little about yourself and what
            you'd like to talk about.
          </p>
        </div>

        {/* Selected Date & Time */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#999999]">
              Date
            </p>

            <p className="mt-2 text-sm font-medium text-[#333333]">
              {formattedDate || "Not selected"}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#999999]">
              Time
            </p>

            <p className="mt-2 text-sm font-medium text-[#333333]">
              {formattedTime || "Not selected"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black/10 bg-[#fafafa] p-6 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-2">

            {/* Name */}
            <div>
              <label
                htmlFor="meeting-name"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#777777]"
              >
                Name *
              </label>

              <input
                id="meeting-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-[#222222] outline-none transition placeholder:text-[#aaaaaa] focus:border-black/30"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="meeting-email"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#777777]"
              >
                Email *
              </label>

              <input
                id="meeting-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-[#222222] outline-none transition placeholder:text-[#aaaaaa] focus:border-black/30"
              />
            </div>

            {/* Topic */}
            <div className="md:col-span-2">
              <label
                htmlFor="meeting-topic"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#777777]"
              >
                Meeting Topic
              </label>

              <input
                id="meeting-topic"
                type="text"
                value={topic}
                onChange={(event) =>
                  setTopic(event.target.value)
                }
                placeholder="What would you like to discuss?"
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-[#222222] outline-none transition placeholder:text-[#aaaaaa] focus:border-black/30"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label
                htmlFor="meeting-notes"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#777777]"
              >
                Additional Notes
              </label>

              <textarea
                id="meeting-notes"
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Anything you'd like me to know before the meeting..."
                rows={5}
                className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-7 text-[#222222] outline-none transition placeholder:text-[#aaaaaa] focus:border-black/30"
              />
            </div>

            {/* Timezone */}
            <div className="md:col-span-2">
              <label
                htmlFor="meeting-timezone"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#777777]"
              >
                Timezone
              </label>

              <input
                id="meeting-timezone"
                type="text"
                value={timezone}
                onChange={(event) =>
                  setTimezone(event.target.value)
                }
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm text-[#222222] outline-none transition focus:border-black/30"
              />

              <p className="mt-2 text-xs text-[#999999]">
                Your timezone was detected automatically. You
                can change it if needed.
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 flex flex-col-reverse gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/meeting/time?date=${selectedDate}`
                )
              }
              className="rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-[0.12em] text-[#555555] transition hover:border-black/30 hover:text-[#222222]"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="rounded-full bg-[#222222] px-7 py-3 text-sm uppercase tracking-[0.12em] text-white transition hover:bg-black"
            >
              Continue →
            </button>

          </div>
        </form>

        {/* Step */}
        <div className="mt-8 border-t border-black/10 pt-6">
          <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
            Step 3 of 4
          </span>
        </div>

      </div>
    </main>
  );
};

export default MeetingDetails;