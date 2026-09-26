import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.PROD
  ? "https://portfolio-api.workwithsasan.workers.dev"
  : "http://localhost:8787";

const MeetingConfirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  const storedDetails =
    sessionStorage.getItem("meetingDetails");

  let details = null;

  try {
    details = storedDetails
      ? JSON.parse(storedDetails)
      : null;
  } catch {
    details = null;
  }

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!selectedDate || !selectedTime || !details) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="text-sm text-[#777777]">
            Your meeting information is incomplete.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/meeting/date")
            }
            className="mt-6 rounded-full bg-[#222222] px-6 py-3 text-sm uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            Start Again
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = (() => {
    const [hours, minutes] = selectedTime.split(":");

    const hour = Number(hours);
    const period = hour >= 12 ? "PM" : "AM";

    const displayHour =
      hour % 12 === 0 ? 12 : hour % 12;

    return `${displayHour}:${minutes} ${period}`;
  })();

  const handleConfirm = async () => {
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/meetings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meetingDate: selectedDate,
            meetingTime: selectedTime,
            name: details.name,
            email: details.email,
            topic: details.topic,
            notes: details.notes,
            timezone: details.timezone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to schedule the meeting."
        );
      }

      // Store booking result for success page
      sessionStorage.setItem(
        "meetingBooking",
        JSON.stringify({
          id: data.id,
          meetingDate: selectedDate,
          meetingTime: selectedTime,
          name: details.name,
          email: details.email,
          topic: details.topic,
          timezone: details.timezone,
        })
      );

      // Remove temporary form data
      sessionStorage.removeItem("meetingDetails");

      navigate("/meeting/success");
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Something went wrong while scheduling your meeting."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 text-[#222222]">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#999999]">
            Meeting / Step 04
          </p>

          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Review & Confirm
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#666666] md:text-lg">
            Review your meeting details before confirming
            your booking.
          </p>
        </div>

        {/* Date & Time */}
        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[#999999]">
              Date
            </p>

            <p className="mt-3 text-base font-medium text-[#333333]">
              {formattedDate}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fafafa] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[#999999]">
              Time
            </p>

            <p className="mt-3 text-base font-medium text-[#333333]">
              {formattedTime}
            </p>

            <p className="mt-1 text-xs text-[#999999]">
              {details.timezone}
            </p>
          </div>

        </div>

        {/* Details */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-[#fafafa] p-6 md:p-8">

          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#999999]">
            Your Details
          </p>

          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#aaaaaa]">
                Name
              </p>

              <p className="mt-2 text-sm font-medium text-[#333333]">
                {details.name}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#aaaaaa]">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-medium text-[#333333]">
                {details.email}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.15em] text-[#aaaaaa]">
                Meeting Topic
              </p>

              <p className="mt-2 text-sm font-medium text-[#333333]">
                {details.topic || "Not specified"}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.15em] text-[#aaaaaa]">
                Additional Notes
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#555555]">
                {details.notes || "No additional notes"}
              </p>
            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <button
            type="button"
            disabled={submitting}
            onClick={() =>
              navigate(
                `/meeting/details?date=${selectedDate}&time=${selectedTime}`
              )
            }
            className="rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-[0.12em] text-[#555555] transition hover:border-black/30 hover:text-[#222222] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Edit Details
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="rounded-full bg-[#222222] px-7 py-3 text-sm uppercase tracking-[0.12em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Scheduling..."
              : "Confirm Meeting →"}
          </button>

        </div>

        <div className="mt-8 border-t border-black/10 pt-6">
          <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
            Step 4 of 4
          </span>
        </div>

      </div>
    </main>
  );
};

export default MeetingConfirm;