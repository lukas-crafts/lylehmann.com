import { useEffect, useRef, useState } from "preact/hooks";

interface Item {
  title: string;
  subtitle?: string;
}

interface Props {
  items: Item[];
}

function Counter({
  target,
  duration = 1500,
}: {
  target: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    // Parse numeric value and suffix
    const match = target.match(/(\d+)(.*)/);
    if (!match) {
      setCount(parseInt(target, 10) || 0);
      return;
    }

    const targetValue = parseInt(match[1], 10);

    let start = 0;
    const increment = targetValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  const match = target.match(/(\d+)(.*)/);
  const suffix = match ? match[2] : "";

  return (
    <div ref={elementRef}>
      {count}
      {suffix}
    </div>
  );
}

export default function AnimatedStats({ items }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden border border-zinc-800 my-12 bg-zinc-900/20">
      {items.map((stat, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 border-zinc-800
            ${i % 2 !== 0 ? "border-l" : ""} 
            ${i >= 2 ? "border-t lg:border-t-0" : ""}
            ${i % 4 !== 0 ? "lg:border-l" : ""}
            ${i % 2 === 0 ? "bg-zinc-900/60" : "bg-zinc-900/30"}
          `}
        >
          <div className="text-3xl sm:text-4xl font-black tracking-tighter text-emerald-400 leading-none mb-2">
            <Counter target={stat.title} />
          </div>
          {stat.subtitle && (
            <div className="text-[10px] sm:text-xs text-zinc-500 font-black uppercase tracking-widest leading-tight">
              {stat.subtitle}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
