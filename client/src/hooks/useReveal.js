import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useRevealGroup() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;

    if (!container) return;

    const items = container.querySelectorAll(
      ".animate-reveal, .animate-reveal-left",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
