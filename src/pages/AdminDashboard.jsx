import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.PROD
  ? "https://portfolio-api.workwithsasan.workers.dev"
  : "http://localhost:8787";

const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minutes} ${period}`;
};

const formatMeetingDate = (date) => {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("messages");

  const [messages, setMessages] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [actionId, setActionId] = useState(null);

  const [error, setError] = useState("");

  // --------------------------------
  // Check authentication
  // --------------------------------
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/me`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.authenticated) {
        navigate("/admin/login", {
          replace: true,
        });

        return false;
      }

      return true;
    } catch (error) {
      console.error(error);

      setError("Unable to connect to the server.");

      return false;
    }
  };

  // --------------------------------
  // Fetch messages
  // --------------------------------
  const fetchMessages = async () => {
    const response = await fetch(`${API_URL}/api/admin/messages`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 401) {
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to load messages.");
    }

    setMessages(data.messages || []);
  };

  // --------------------------------
  // Fetch meetings
  // --------------------------------
  const fetchMeetings = async () => {
    const response = await fetch(`${API_URL}/api/admin/meetings`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 401) {
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to load meetings.");
    }

    setMeetings(data.meetings || []);
  };

  // --------------------------------
  // Initial dashboard load
  // --------------------------------
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setError("");

        const authenticated = await checkAuth();

        if (!authenticated) {
          setLoading(false);
          return;
        }

        await Promise.all([fetchMessages(), fetchMeetings()]);
      } catch (error) {
        console.error(error);

        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  // --------------------------------
  // Refresh
  // --------------------------------
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");

      await Promise.all([fetchMessages(), fetchMeetings()]);
    } catch (error) {
      console.error(error);

      setError(error.message || "Failed to refresh dashboard.");
    } finally {
      setRefreshing(false);
    }
  };

  // --------------------------------
  // Mark as read
  // --------------------------------
  const handleMarkAsRead = async (id) => {
    try {
      setActionId(id);
      setError("");

      const response = await fetch(`${API_URL}/api/admin/messages/${id}/read`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to update message.");
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? {
                ...message,
                is_read: 1,
              }
            : message,
        ),
      );
    } catch (error) {
      console.error(error);

      setError(error.message || "Failed to update message.");
    } finally {
      setActionId(null);
    }
  };

  // --------------------------------
  // Delete message
  // --------------------------------
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    try {
      setActionId(id);
      setError("");

      const response = await fetch(`${API_URL}/api/admin/messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete message.");
      }

      setMessages((currentMessages) =>
        currentMessages.filter((message) => message.id !== id),
      );
    } catch (error) {
      console.error(error);

      setError(error.message || "Failed to delete message.");
    } finally {
      setActionId(null);
    }
  };

  // --------------------------------
  // Logout
  // --------------------------------
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await fetch(`${API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/admin/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError("Logout failed.");
      setLoggingOut(false);
    }
  };

  // --------------------------------
  // Stats
  // --------------------------------
  const unreadCount = useMemo(() => {
    return messages.filter((message) => message.is_read === 0).length;
  }, [messages]);

  const scheduledMeetings = useMemo(() => {
    return meetings.filter((meeting) => meeting.status === "scheduled").length;
  }, [meetings]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="text-sm text-gray-500">Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Administration
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#222222] md:text-5xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Manage messages and meetings received through your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#333333] transition hover:border-black/20 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl bg-[#222222] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
              Total Messages
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#222222]">
              {messages.length}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
              Unread Messages
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#222222]">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
              Total Meetings
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#222222]">
              {meetings.length}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
              Scheduled
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#222222]">
              {scheduledMeetings}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 rounded-2xl border border-black/10 bg-white p-2">
          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-medium transition sm:flex-none ${
              activeTab === "messages"
                ? "bg-[#222222] text-white"
                : "text-[#555555] hover:bg-gray-50"
            }`}
          >
            Messages
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("meetings")}
            className={`flex-1 rounded-xl px-5 py-3 text-sm font-medium transition sm:flex-none ${
              activeTab === "meetings"
                ? "bg-[#222222] text-white"
                : "text-[#555555] hover:bg-gray-50"
            }`}
          >
            Meetings
          </button>
        </div>

        {/* -------------------------
            Messages
        ------------------------- */}
        {activeTab === "messages" && (
          <section>
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
                <p className="text-lg font-medium text-[#333333]">
                  No messages yet
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Messages from your contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isUnread = message.is_read === 0;

                  const isProcessing = actionId === message.id;

                  return (
                    <article
                      key={message.id}
                      className={`rounded-2xl border bg-white p-6 ${
                        isUnread ? "border-black/20" : "border-black/10"
                      }`}
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
                              isUnread ? "bg-black" : "bg-gray-300"
                            }`}
                          />

                          <div>
                            <h2 className="text-lg font-semibold text-[#222222]">
                              {message.name}
                            </h2>

                            <a
                              href={`mailto:${message.email}`}
                              className="mt-1 block text-sm text-gray-500 hover:text-black"
                            >
                              {message.email}
                            </a>
                          </div>
                        </div>

                        <span className="text-xs text-gray-400">
                          {message.created_at}
                        </span>
                      </div>

                      {message.subject && (
                        <div className="mt-5">
                          <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                            Subject
                          </p>

                          <h3 className="mt-1 font-medium text-[#333333]">
                            {message.subject}
                          </h3>
                        </div>
                      )}

                      <div className="mt-5 border-t border-black/5 pt-5">
                        <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                          {message.message}
                        </p>
                      </div>

                      <div className="mt-6 flex gap-3 border-t border-black/5 pt-5">
                        {isUnread ? (
                          <button
                            type="button"
                            onClick={() => handleMarkAsRead(message.id)}
                            disabled={isProcessing}
                            className="rounded-lg bg-[#222222] px-4 py-2 text-xs font-medium text-white transition hover:bg-black disabled:opacity-50"
                          >
                            {isProcessing ? "Updating..." : "Mark as Read"}
                          </button>
                        ) : (
                          <span className="rounded-lg border border-black/10 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500">
                            Read
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(message.id)}
                          disabled={isProcessing}
                          className="rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {isProcessing ? "Processing..." : "Delete"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* -------------------------
            Meetings
        ------------------------- */}
        {activeTab === "meetings" && (
          <section>
            {meetings.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
                <p className="text-lg font-medium text-[#333333]">
                  No meetings yet
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Scheduled meetings will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <article
                    key={meeting.id}
                    className="rounded-2xl border border-black/10 bg-white p-6"
                  >
                    {/* Top */}
                    <div className="flex flex-col justify-between gap-5 md:flex-row">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Meeting
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-[#222222]">
                          {meeting.name}
                        </h2>

                        <a
                          href={`mailto:${meeting.email}`}
                          className="mt-1 block text-sm text-gray-500 hover:text-black"
                        >
                          {meeting.email}
                        </a>
                      </div>

                      <span
                        className={`self-start rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider ${
                          meeting.status === "scheduled"
                            ? "bg-gray-100 text-[#333333]"
                            : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {meeting.status}
                      </span>
                    </div>

                    {/* Date / Time */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-black/10 bg-[#fafafa] p-5">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Date
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#333333]">
                          {formatMeetingDate(meeting.meeting_date)}
                        </p>
                      </div>

                      <div className="rounded-xl border border-black/10 bg-[#fafafa] p-5">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Time
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#333333]">
                          {formatTime(meeting.meeting_time)}
                        </p>

                        {meeting.timezone && (
                          <p className="mt-1 text-xs text-gray-400">
                            {meeting.timezone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Topic */}
                    {meeting.topic && (
                      <div className="mt-6">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Topic
                        </p>

                        <p className="mt-2 text-sm font-medium text-[#333333]">
                          {meeting.topic}
                        </p>
                      </div>
                    )}

                    {/* Notes */}
                    {meeting.notes && (
                      <div className="mt-5 border-t border-black/5 pt-5">
                        <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                          Notes
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                          {meeting.notes}
                        </p>
                      </div>
                    )}

                    {/* Created */}
                    <div className="mt-6 border-t border-black/5 pt-5">
                      <p className="text-xs text-gray-400">
                        Created: {meeting.created_at}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
