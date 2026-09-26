import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.PROD
  ? "https://portfolio-api.workwithsasan.workers.dev"
  : "http://localhost:8787";

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");

  const hour = Number(hours);

  const period = hour >= 12 ? "PM" : "AM";

  const displayHour =
    hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${minutes} ${period}`;
};

const MeetingTime = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedDate = searchParams.get("date");

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedDate) {
      navigate("/meeting/date", { replace: true });
      return;
    }

    const fetchAvailableTimes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/meetings/availability?date=${selectedDate}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load available times."
          );
        }

        setAvailableTimes(data.availableTimes || []);
      } catch (error) {
        console.error(error);
        setError(
          error.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTimes();
  }, [selectedDate, navigate]);

  const handleContinue = () => {
    if (!selectedTime) {
      return;
    }

    navigate(
      `/meeting/details?date=${selectedDate}&time=${selectedTime}`
    );
  };

  const formattedDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "";

  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 text-[#222222]">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#999999]">
            Meeting / Step 02
          </p>

          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Choose a Time
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#666666]">
            Select an available time that works for you.
          </p>

          {formattedDate && (
            <div className="mt-6 inline-flex rounded-full border border-black/10 bg-[#fafafa] px-5 py-3 text-sm text-[#555555]">
              {formattedDate}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="rounded-3xl border border-black/10 bg-[#fafafa] p-6 md:p-10">

          {loading ? (
            <div className="py-16 text-center">
              <p className="text-sm text-[#777777]">
                Loading available times...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          ) : availableTimes.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-[#333333]">
                No available times
              </p>

              <p className="mt-2 text-sm text-[#777777]">
                There are no available meeting slots for this date.
              </p>

              <button
                type="button"
                onClick={() => navigate("/meeting/date")}
                className="mt-6 rounded-full border border-[#222222] px-6 py-3 text-sm uppercase tracking-[0.12em] transition hover:bg-[#222222] hover:text-white"
              >
                Choose Another Date
              </button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#999999]">
                Available Times
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {availableTimes.map((time) => {
                  const isSelected =
                    selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`
                        rounded-xl border px-4 py-4 text-sm
                        transition duration-200

                        ${
                          isSelected
                            ? "border-[#222222] bg-[#222222] text-white"
                            : "border-black/10 bg-white text-[#333333] hover:border-black/30"
                        }
                      `}
                    >
                      {formatTime(time)}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
            Step 2 of 4
          </span>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedTime}
            className="rounded-full bg-[#222222] px-7 py-3 text-sm uppercase tracking-[0.12em] text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continue →
          </button>

        </div>

      </div>
    </main>
  );
};

export default MeetingTime;