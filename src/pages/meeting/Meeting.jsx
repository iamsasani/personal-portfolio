import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-32 md:px-10 lg:px-16">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">

          {/* LEFT */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#999999]">
              Meeting / Let's Talk
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tighter md:text-7xl lg:text-8xl">
              Let's talk
              <span className="block text-[#999999]">
                about your idea.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#666666] md:text-lg">
              Have a project, idea, or opportunity you'd like
              to discuss? Choose a convenient date and time
              and let's have a conversation.
            </p>

            <button
              type="button"
              onClick={() => navigate("/meeting/date")}
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#222222] px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-black"
            >
              <span>Choose a Date</span>

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* RIGHT */}
          <div className="lg:justify-self-end">
            <div className="relative mx-auto aspect-square w-full max-w-md rounded-4xl border border-black/10 bg-[#f7f7f7] p-8">

              {/* Decorative circle */}
              <div className="absolute inset-8 rounded-full border border-black/10" />

              <div className="relative flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-white p-7">

                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#999999]">
                    Schedule
                  </span>

                  <span className="text-sm text-[#999999]">
                    01
                  </span>
                </div>

                <div>
                  <div className="mb-6 h-px w-16 bg-[#222222]" />

                  <h2 className="text-3xl font-semibold tracking-tight">
                    Find a time
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[#777777]">
                    Select a date that works for you,
                    then choose an available time slot.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-black/10 px-3 py-3 text-center text-xs text-[#777777]">
                    DATE
                  </div>

                  <div className="rounded-lg border border-black/10 px-3 py-3 text-center text-xs text-[#777777]">
                    TIME
                  </div>

                  <div className="rounded-lg border border-black/10 px-3 py-3 text-center text-xs text-[#777777]">
                    TALK
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Meeting;