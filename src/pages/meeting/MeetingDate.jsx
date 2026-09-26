import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MeetingDate = () => {
  const navigate = useNavigate();

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const days = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [year, month]);

  const isPastDate = (day) => {
    if (!day) return true;

    const selectedDate = new Date(
      year,
      month,
      day
    );

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return selectedDate < todayStart;
  };

  const handleDateSelect = (day) => {
    if (!day || isPastDate(day)) {
      return;
    }

    const selectedDate = new Date(
      year,
      month,
      day
    );

    const formattedDate =
      `${selectedDate.getFullYear()}-` +
      `${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-` +
      `${String(
        selectedDate.getDate()
      ).padStart(2, "0")}`;

    navigate(
      `/meeting/time?date=${formattedDate}`
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const isCurrentMonth =
    year === today.getFullYear() &&
    month === today.getMonth();

  return (
    <main className="min-h-screen bg-white px-6 pb-24 pt-32 text-[#222222]">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#999999]">
            Meeting / Step 01
          </p>

          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Choose a Date
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#666666]">
            Select a date that works for you and
            continue to choose an available time.
          </p>
        </div>

        {/* Calendar */}
        <div className="rounded-3xl border border-black/10 bg-[#fafafa] p-6 md:p-10">

          {/* Month Header */}
          <div className="mb-8 flex items-center justify-between">

            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={isCurrentMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg transition hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous month"
            >
              ←
            </button>

            <h2 className="text-xl font-semibold">
              {monthNames[month]} {year}
            </h2>

            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg transition hover:border-black/20"
              aria-label="Next month"
            >
              →
            </button>

          </div>

          {/* Week Days */}
          <div className="mb-3 grid grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-medium uppercase tracking-wider text-[#999999]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2">

            {calendarDays.map((day, index) => {
              const disabled =
                !day || isPastDate(day);

              const isToday =
                day &&
                year === today.getFullYear() &&
                month === today.getMonth() &&
                day === today.getDate();

              return (
                <button
                  key={`${day}-${index}`}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    handleDateSelect(day)
                  }
                  className={`
                    aspect-square rounded-xl text-sm
                    transition

                    ${
                      !day
                        ? "cursor-default"
                        : ""
                    }

                    ${
                      disabled && day
                        ? "cursor-not-allowed text-[#cccccc]"
                        : ""
                    }

                    ${
                      !disabled && day
                        ? "text-[#333333] hover:bg-[#222222] hover:text-white"
                        : ""
                    }

                    ${
                      isToday
                        ? "border border-[#222222] font-semibold"
                        : ""
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}

          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">

          <span className="text-xs uppercase tracking-[0.15em] text-[#999999]">
            Step 1 of 4
          </span>

          <span className="text-sm text-[#777777]">
            Select a date to continue
          </span>

        </div>

      </div>
    </main>
  );
};

export default MeetingDate;