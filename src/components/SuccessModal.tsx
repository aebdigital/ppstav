"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectDelay?: number;
}

export default function SuccessModal({
  isOpen,
  onClose,
  redirectDelay = 3000,
}: SuccessModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        router.push("/");
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, redirectDelay, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => {
          onClose();
          router.push("/");
        }}
      />

      {/* Modal */}
      <div className="relative bg-white p-8 md:p-12 shadow-2xl max-w-md mx-4 text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
          Ďakujeme
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          Ozveme sa Vám čo najskôr.
        </p>

        <div className="text-sm text-gray-400">
          Presmerujeme vás na hlavnú stránku...
        </div>
      </div>
    </div>
  );
}
