import React from "react";
import { ExternalLink } from "lucide-react";

export const SASHAKTI_URL = "https://www.sashakti.org/";

interface SashaktiLinkProps {
  text: string;
  linkClassName?: string;
  showIcon?: boolean;
}

export function renderWithSashaktiLink(
  text: string,
  linkClassName: string = "text-rose-600 hover:text-rose-700 underline font-semibold transition-colors inline-flex items-center gap-0.5",
  showIcon: boolean = true
): React.ReactNode {
  if (!text) return text;

  // Match Sashakti Foundation, Shashakti Foundation, Sashakti, or Hindi equivalent
  const splitRegex = /(Shashakti Foundation|Sashakti Foundation|Sashakti|सशक्त फाउंडेशन \(Sashakti Foundation\)|सशक्त फाउंडेशन)/g;
  const matchRegex = /^(Shashakti Foundation|Sashakti Foundation|Sashakti|सशक्त फाउंडेशन \(Sashakti Foundation\)|सशक्त फाउंडेशन)$/i;

  const parts = text.split(splitRegex);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, index) => {
        if (matchRegex.test(part)) {
          return (
            <a
              key={index}
              href={SASHAKTI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
              title="Visit Sashakti Foundation Website (opens in a new tab)"
            >
              {part}
              {showIcon && <ExternalLink className="w-3.5 h-3.5 inline shrink-0 ml-0.5 opacity-85" />}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}

export function SashaktiText({ text, linkClassName, showIcon }: SashaktiLinkProps) {
  return <>{renderWithSashaktiLink(text, linkClassName, showIcon)}</>;
}
