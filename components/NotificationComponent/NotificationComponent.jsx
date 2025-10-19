"use client";

import { useEffect, useCallback, useState } from "react";

/**
 * Notification Component - Toast notification with auto-dismiss
 *
 * @param {Object} props - Component props
 * @param {string} props.message - Notification message text
 * @param {string} [props.type="info"] - Notification type: "success", "error", "warning", or "info"
 * @param {boolean} props.isVisible - Whether notification is visible
 * @param {Function} props.onClose - Close handler function
 * @param {number} [props.duration=3000] - Auto-close duration in ms (0 to disable)
 * @returns {JSX.Element|null} Notification component or null if not visible
 *
 * @example
 * <NotificationComponent
 *   message="Contest created successfully"
 *   type="success"
 *   isVisible={showNotification}
 *   onClose={() => setShowNotification(false)}
 * />
 */
export default function NotificationComponent({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 3000,
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
      setIsExiting(false);
    }, 300); // Match animation duration
  }, [onClose]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, handleClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-600 border-green-500 text-white";
      case "error":
        return "bg-red-600 border-red-500 text-white";
      case "warning":
        return "bg-yellow-600 border-yellow-500 text-white";
      case "info":
      default:
        return "bg-blue-600 border-blue-500 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md w-full transition-all duration-300 ease-out ${
        isExiting ? "translate-x-[120%] opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      <div
        className={`border rounded-lg shadow-2xl p-4 relative overflow-hidden transform transition-all duration-200 ${getTypeStyles()}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {/* Progress bar */}
        {duration > 0 && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-white/50 rounded-full transition-all"
            style={{
              width: "100%",
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        )}

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="animate-in zoom-in duration-300 delay-100">
              {getIcon()}
            </div>
            <p className="font-medium animate-in fade-in slide-in-from-left-1 duration-300 delay-150">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition-all duration-200 hover:rotate-90 hover:scale-110 active:scale-95"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
