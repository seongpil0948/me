"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

type ErrorDict = {
  title: string;
  tryAgain: string;
};

const errorTranslations: Record<string, ErrorDict> = {
  ko: {
    title: "문제가 발생했습니다!",
    tryAgain: "다시 시도",
  },
  en: {
    title: "Something went wrong!",
    tryAgain: "Try again",
  },
  zh: {
    title: "出现问题!",
    tryAgain: "重试",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as string) || "ko";
  const dict = errorTranslations[locale] || errorTranslations.ko;

  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-2xl font-bold mb-4">{dict.title}</h2>
      <button
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        onClick={() => reset()}
      >
        {dict.tryAgain}
      </button>
    </div>
  );
}
