import { Link } from "react-router-dom";

const MeetingSuccess = () => {
  const storedBooking =
    sessionStorage.getItem("meetingBooking");

  let booking = null;

  try {
    booking = storedBooking
      ? JSON.parse(storedBooking)
      : null;
  } catch {
    booking = null;
  }

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <p className="text-sm text-[#777777]">
            No booking information found.
          </p>

          <Link
            to="/meeting/date"
            className="mt-6 inline-block rounded-full bg-[#222222] px-6 py-3 text-sm uppercase tracking-[0.12em] text-white"
          >
            Book a Meeting
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    `${booking.meetingDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = (() => {
    const [hours, minutes] =
      booking.meetingTime.split(":");

    const hour = Number(hours);
    const period = hour >= 12 ? "PM" : "AM";

    const displayHour =
      hour % 12 === 0 ? 12 : hour % 12;

    return `${displayHour}:${minutes} ${period}`;
  })();

  return (
    <main className="flex min-h-screen items-center bg-white px-6 py-32 text-[#222222]">
      <div className="mx-auto w-full max-w-3xl">

        <div className="rounded-3xl border border-black/10 bg-[#fafafa] p-8 text-center md:p-14">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#222222] text-2xl text-white">
            ✓
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-[#999999]">
            Meeting Scheduled
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl">
            You're all set.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#666666]">
            Your meeting has been successfully scheduled.
          </p>

          <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-black/10 bg-white p-6 text-left">

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                Date
              </p>

              <p className="mt-2 text-sm font-medium">
                {formattedDate}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                Time
              </p>

              <p className="mt-2 text-sm font-medium">
                {formattedTime}
              </p>

              <p className="mt-1 text-xs text-[#999999]">
                {booking.timezone}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-[#999999]">
                Name
              </p>

              <p className="mt-2 text-sm font-medium">
                {booking.name}
              </p>
            </div>

          </div>

          <Link
            to="/"
            className="mt-10 inline-flex rounded-full bg-[#222222] px-7 py-3 text-sm uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            Back to Portfolio
          </Link>

        </div>

      </div>
    </main>
  );
};

export default MeetingSuccess;