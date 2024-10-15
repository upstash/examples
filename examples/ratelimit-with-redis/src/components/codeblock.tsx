"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";

export default function CodeBlock({ children, ...props }: React.ComponentProps<"pre">) {
  const ref = React.useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    Prism.highlightElement(ref.current);
  }, []);

  return (
    <pre className="w-full h-auto shrink-0 !m-0 !bg-stone-800 rounded-xl !p-6 !text-sm" {...props}>
      <code ref={ref} className="lang-js">
        {children}
      </code>
    </pre>
  );
}
