import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.PROD
  ? "https://portfolio-api.workwithsasan.workers.dev"
  : "http://localhost:8787";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
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
        navigate("/admin/login", { replace: true });
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
    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/admin/messages`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load messages."
        );
      }

      setMessages(data.messages || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // --------------------------------
  // Initial load
  // --------------------------------
  useEffect(() => {
    const initializeDashboard = async () => {
      const authenticated = await checkAuth();

      if (authenticated) {
        await fetchMessages();
      }

      setLoading(false);
    };

    initializeDashboard();
  }, []);

  // --------------------------------
  // Refresh
  // --------------------------------
  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchMessages();

    setRefreshing(false);
  };

  // --------------------------------
  // Mark as read
  // --------------------------------
  const handleMarkAsRead = async (id) => {
    setActionId(id);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/messages/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update message."
        );
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === id
            ? { ...message, is_read: 1 }
            : message
        )
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setActionId(null);
    }
  };

  // --------------------------------
  // Delete message
  // --------------------------------
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    setActionId(id);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/messages/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete message."
        );
      }

      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setActionId(null);
    }
  };

  // --------------------------------
  // Logout
  // --------------------------------
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error(error);
      setError("Logout failed.");
      setLoggingOut(false);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <p className="text-sm text-gray-500">
          Loading dashboard...
        </p>
      </main>
    );
  }

  const unreadCount = messages.filter(
    (message) => message.is_read === 0
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Administration
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#222]">
              Messages
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage messages received from your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#333] transition hover:border-black/20 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl bg-[#222] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
              Total Messages
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#222]">
              {messages.length}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
              Unread Messages
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#222]">
              {unreadCount}
            </p>
          </div>
        </div>

        {/* Messages */}
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-12 text-center">
            <p className="text-lg font-medium text-[#333]">
              No messages yet
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Messages submitted through your contact form
              will appear here.
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
                  className={`rounded-2xl border bg-white p-6 transition ${
                    isUnread
                      ? "border-black/20"
                      : "border-black/10"
                  }`}
                >
                  {/* Top */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div className="flex items-start gap-3">

                      {/* Status */}
                      <span
                        className={`mt-1 h-2.5 w-2.5 rounded-full ${
                          isUnread
                            ? "bg-black"
                            : "bg-gray-300"
                        }`}
                      />

                      <div>
                        <h2 className="text-lg font-semibold text-[#222]">
                          {message.name}
                        </h2>

                        <a
                          href={`mailto:${message.email}`}
                          className="mt-1 block text-sm text-gray-500 transition hover:text-black"
                        >
                          {message.email}
                        </a>
                      </div>
                    </div>

                    <span className="text-xs text-gray-400">
                      {message.created_at}
                    </span>
                  </div>

                  {/* Subject */}
                  {message.subject && (
                    <div className="mt-5">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
                        Subject
                      </p>

                      <h3 className="mt-1 font-medium text-[#333]">
                        {message.subject}
                      </h3>
                    </div>
                  )}

                  {/* Message */}
                  <div className="mt-5 border-t border-black/5 pt-5">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                      {message.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/5 pt-5">

                    {isUnread ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleMarkAsRead(message.id)
                        }
                        disabled={isProcessing}
                        className="rounded-lg bg-[#222] px-4 py-2 text-xs font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isProcessing
                          ? "Updating..."
                          : "Mark as Read"}
                      </button>
                    ) : (
                      <span className="rounded-lg border border-black/10 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500">
                        Read
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(message.id)
                      }
                      disabled={isProcessing}
                      className="rounded-lg border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isProcessing ? "Deleting..." : "Delete"}
                    </button>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
};

export default AdminDashboard;