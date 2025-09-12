"use client";
/**
  * Timeline Component (Professional Edition)
  * ------------------------------------------------------------------
  * Features:
  * - Accessible: semantic <ol>, aria labels, roving tabindex, keyboard navigation
  * - Scroll-linked progress spine (desktop) + floating progress bar
  * - Stats summary bar (dynamic range, total milestones, category distribution)
  * - Animated reveal with reduced-motion safe fallbacks
  * - Active & focused separation, hover + click activation
  * - Clean alternating layout (desktop) / linear (mobile)
  * - Tag chip system with staggered micro-animations
  * - Minimal external dependencies beyond framer-motion + existing constants
  *
  * NOTE: This file is self-contained. Styling assumes Tailwind + existing CSS vars:
  *   --color-primary-rgb, --color-secondary-rgb, --color-accent-rgb
  */

import {
  useRef,
  useState,
  useEffect,
  useId,
  useCallback,
  KeyboardEvent,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  Variants,
} from "framer-motion";
import { TimeLineData } from "@/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { HiOutlineCalendar } from "react-icons/hi";
import type { TimelineItemData } from "@/types";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
interface TimelineItemProps {
  data: TimelineItemData;
  index: number;
  total: number;
  isLeft: boolean;
  isActive: boolean;
  isFocused: boolean;
  onActivate: (i: number) => void;
  onFocus: (i: number) => void;
  reducedMotion: boolean;
}

/* -------------------------------------------------------------------------- */
/* Utility: Roving Focus Hook                                                 */
/* -------------------------------------------------------------------------- */
function useRovingFocus(count: number, initial = 0) {
  const [focusedIndex, setFocusedIndex] = useState(initial);
  const move = useCallback(
    (delta: number) => {
      setFocusedIndex((prev) => {
        const next = Math.min(Math.max(prev + delta, 0), count - 1);
        return next;
      });
    },
    [count],
  );
  const moveTo = useCallback(
    (pos: "start" | "end") => {
      setFocusedIndex(pos === "start" ? 0 : count - 1);
    },
    [count],
  );
  return { focusedIndex, setFocusedIndex, move, moveTo };
}

/* -------------------------------------------------------------------------- */
/* Motion Variants                                                            */
/* -------------------------------------------------------------------------- */
const itemVariants = (isLeft: boolean, reduced: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reduced ? 0 : 56,
    x: reduced ? 0 : isLeft ? -28 : 28,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: reduced ? 0 : 0.65,
      ease: [0.25, 0.85, 0.4, 1],
    },
  },
  active: {
    scale: reduced ? 1 : 1.02,
    transition: { type: "spring", stiffness: 180, damping: 22, mass: 0.6 },
  },
  idle: { scale: 1 },
});

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.05,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
};

/* -------------------------------------------------------------------------- */
/* Stats Generation                                                           */
/* -------------------------------------------------------------------------- */
function computeStats(data: TimelineItemData[]) {
  const numericYears = data
    .filter((d) => typeof d.year === "number")
    .map((d) => Number(d.year));
  const rangeStart = data.at(1)?.year ?? "";
  const rangeEnd = data.at(-2)?.year ?? "";
  const minYear = numericYears.length ? Math.min(...numericYears) : null;
  const maxYear = numericYears.length ? Math.max(...numericYears) : null;

  // Category frequency (using highlight tokens)
  const tagFrequency = new Map<string, number>();
  data.forEach((d) =>
    d.highlight?.forEach((h) =>
      tagFrequency.set(h, (tagFrequency.get(h) ?? 0) + 1),
    )
  );
  const topTags = Array.from(tagFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, v]) => ({ label: k, count: v }));

  return {
    total: data.length,
    rangeDisplay:
      rangeStart === rangeEnd
        ? `${rangeStart}`
        : `${rangeStart} → ${rangeEnd}`,
    minYear,
    maxYear,
    topTags,
  };
}

/* -------------------------------------------------------------------------- */
/* Timeline Component                                                         */
/* -------------------------------------------------------------------------- */
export default function Timeline() {
  const sectionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const stats = computeStats(TimeLineData);

  const [active, setActive] = useState(0);
  const { focusedIndex, setFocusedIndex, move, moveTo } = useRovingFocus(
    TimeLineData.length,
    0,
  );

  // Sync activation with focus (optional design)
  useEffect(() => {
    setActive(focusedIndex);
  }, [focusedIndex]);

  // Scroll progress (desktop vertical spine)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 25%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const spineHeight = useTransform(smooth, (v) => `${v * 100}%`);
  const spineOpacity = useTransform(smooth, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  /* -------------------------- Keyboard Navigation -------------------------- */
  const handleKeyNav = (e: KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End", " ", "Enter"].includes(e.key)) return;
    e.preventDefault();
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        move(1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        move(-1);
        break;
      case "Home":
        moveTo("start");
        break;
      case "End":
        moveTo("end");
        break;
      case " ":
      case "Enter":
        setActive(focusedIndex);
        break;
    }
  };

  return (
    <section
      id="timeline"
      aria-labelledby={`timeline-heading-${sectionId}`}
      className="relative py-24 overflow-hidden"
    >
      {/* Ambient Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 right-1/3 w-[38rem] h-[38rem] bg-primary/5 blur-[130px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/4 w-[34rem] h-[34rem] bg-secondary/5 blur-[130px] rounded-full animate-pulse-slow delay-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
        <SectionHeading
          id={`timeline-heading-${sectionId}`}
          title="Professional Timeline"
          subtitle={`Evolution across ${stats.rangeDisplay} with ${stats.total} key progression points`}
        />

        {/* Stats Bar */}
        {/*<div
          className="mt-10 grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-xs md:text-sm"
          role="group"
          aria-label="Timeline summary statistics"
        >
          <StatCard
            label="Milestones"
            value={stats.total.toString()}
            accent="from-primary/20 to-primary/5"
          />
          <StatCard
            label="Span"
            value={stats.rangeDisplay}
            accent="from-secondary/20 to-secondary/5"
          />
          {stats.minYear && stats.maxYear && (
            <StatCard
              label="Active Range"
              value={`${stats.minYear}–${stats.maxYear}`}
              accent="from-accent/20 to-accent/5"
            />
          )}
          {stats.topTags.map((t, i) => (
            <StatCard
              key={t.label}
              label={i === 0 ? "Top Themes" : "•"}
              value={`${t.label}${t.count > 1 ? ` (${t.count})` : ""}`}
              accent="from-primary/15 to-secondary/10"
            />
          ))}
        </div>*/}

        {/* Spine + List */}
        <div className="relative mt-16 md:mt-20">
          {/* Base vertical line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 translate-x-[5px] w-px h-full bg-gradient-to-b from-transparent via-gray-700/40 to-transparent"
          />
          {/* Animated fill */}
          <motion.div
            aria-hidden="true"
            style={{ height: spineHeight, opacity: spineOpacity }}
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 translate-x-[5px] w-[3px] bg-gradient-to-b from-primary via-secondary to-accent rounded-full shadow-[0_0_14px_-2px_rgba(var(--color-primary-rgb),0.6)] origin-top"
          />

          {/* Floating progress indicator (desktop) */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: spineOpacity }}
            className="hidden md:flex flex-col items-center gap-2 absolute -left-12 top-0"
          >
            <div className="w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_0_3px_rgba(var(--color-primary-rgb),0.35)]" />
            <div className="relative h-44 w-[5px] rounded-full bg-gray-700/25 overflow-hidden">
              <motion.div
                style={{ height: spineHeight }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
              />
            </div>
            <div className="w-2 h-2 rounded-full bg-secondary/70 shadow-[0_0_0_3px_rgba(var(--color-secondary-rgb),0.35)]" />
          </motion.div>

          <ol
            ref={listRef}
            role="list"
            aria-label="Career timeline milestones"
            className="relative space-y-14 md:space-y-24"
            onKeyDown={handleKeyNav}
          >
            {TimeLineData.map((entry, i) => (
              <TimelineItem
                key={`${entry.year}-${i}`}
                data={entry}
                index={i}
                total={TimeLineData.length}
                isLeft={i % 2 === 0}
                isActive={active === i}
                isFocused={focusedIndex === i}
                onActivate={setActive}
                onFocus={setFocusedIndex}
                reducedMotion={reducedMotion}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */
interface StatCardProps {
  label: string;
  value: string;
  accent?: string;
}

function StatCard({ label, value, accent = "from-primary/20 to-primary/5" }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-gray-700/40 bg-gray-900/40 px-4 py-3 backdrop-blur-sm
        shadow-[0_0_0_1px_rgba(255,255,255,0.03)]`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-50`}
      />
      <div className="relative flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
          {label}
        </span>
        <span className="font-semibold text-sm md:text-base text-gray-100">
          {value}
        </span>
      </div>
    </div>
  );
}

function TimelineItem({
  data,
  index,
  total,
  isLeft,
  isActive,
  isFocused,
  onActivate,
  onFocus,
  reducedMotion,
}: TimelineItemProps) {
  const isLast = index === total - 1;

  return (
    <motion.li
      variants={itemVariants(isLeft, reducedMotion)}
      initial="hidden"
      whileInView="show"
      animate={isActive ? "active" : "idle"}
      viewport={{ once: true, amount: 0.45 }}
      tabIndex={isFocused ? 0 : -1}
      aria-current={isActive ? "step" : undefined}
      aria-label={`Milestone ${index + 1} of ${total}: ${data.year}`}
      onFocus={() => onFocus(index)}
      onMouseEnter={() => onActivate(index)}
      onClick={() => onActivate(index)}
      className={`relative group outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md
        ${isLeft
          ? "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center"
          : "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center"
        }
        flex flex-col md:flex-none
      `}
    >
      {/* Mobile connector */}
      <div
        aria-hidden="true"
        className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700/35 rounded-full"
      >
        {index !== 0 && (
          <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-gray-600/25 to-gray-700/40" />
        )}
        {!isLast && (
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-gray-700/40 via-gray-600/25 to-transparent" />
        )}
      </div>

      {/* Mobile node */}
      <div
        aria-hidden="true"
        className="md:hidden absolute left-4 top-10 -translate-x-1/2"
      >
        <motion.div
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${isActive
            ? "bg-primary border-primary/70 shadow-[0_0_0_4px_rgba(var(--color-primary-rgb),0.25)]"
            : "bg-gray-600 border-gray-400"
            }`}
        >
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              animate={{
                scale: [1, 1.7, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Content column */}
      <div
        className={`w-full pt-6 md:pt-0 pl-12 md:pl-0 ${isLeft ? "md:col-start-1" : "md:col-start-3"}`}
      >
        <motion.div
          whileHover={{ y: reducedMotion ? 0 : -6 }}
          transition={{ type: "tween", duration: 0.25 }}
          className="h-full"
        >
          <div
            className={`relative h-full rounded-xl border backdrop-blur-lg transition-colors duration-300 min-h-[120px]
              ${isActive
                ? "border-primary/60 bg-gray-900/80 shadow-[0_0_0_1px_rgba(var(--color-primary-rgb),0.2),0_4px_30px_-6px_rgba(var(--color-primary-rgb),0.35)]"
                : "border-gray-700/40 bg-gray-900/55 hover:border-primary/40 hover:bg-gray-900/65"
              }`}
          >
            {/* Accent bar when active */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scaleY: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: "top" }}
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-l-lg"
            />
            <div className="relative p-6">
              {/* Year + Calendar */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2.5 rounded-lg border bg-gradient-to-br from-primary/10 to-secondary/10 transition-colors ${isActive
                    ? "border-primary/40"
                    : "border-primary/20 group-hover:border-primary/35"
                    }`}
                >
                  <HiOutlineCalendar
                    className={`w-5 h-5 transition-colors ${isActive
                      ? "text-primary"
                      : "text-primary/70 group-hover:text-primary"
                      }`}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className="text-xl font-semibold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent tracking-wide"
                  aria-label={`Year ${data.year}`}
                >
                  {data.year}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-300/85 group-hover:text-gray-200/95 transition-colors">
                {data.text}
              </p>

              {/* Highlights */}
              {data.highlight?.length ? (
                <motion.ul
                  role="list"
                  aria-label="Highlights"
                  className="mt-5 flex flex-wrap gap-2"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {data.highlight.map((h, i) => (
                    <motion.li key={`${h}-${i}`} custom={i} variants={tagVariants}>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide
                        bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10
                        border border-primary/15 hover:border-primary/35
                        text-primary/80 hover:text-primary
                        shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm transition-colors"
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-primary/70 shadow-[0_0_0_3px_rgba(var(--color-primary-rgb),0.25)]"
                        />
                        {h}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : null}

              {/* Hidden control overlay (for click target & keyboard activation) */}
              <button
                type="button"
                tabIndex={-1}
                aria-label={`Activate milestone for ${data.year}`}
                className="absolute inset-0 rounded-xl focus:outline-none"
                onClick={() => onActivate(index)}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop center node */}
      <div
        aria-hidden="true"
        className="hidden md:flex md:col-start-2 justify-center items-center "
      >
        <motion.div
          whileHover={{
            scale: reducedMotion ? 1 : 1.18,
            transition: { type: "spring", stiffness: 240, damping: 18 },
          }}
          animate={{
            scale: isActive ? 1.25 : 1,
            backgroundColor: isActive
              ? "var(--color-primary)"
              : "rgba(var(--color-secondary-rgb),0.75)",
            boxShadow: isActive
              ? "0 0 24px 6px rgba(var(--color-primary-rgb),0.35)"
              : "0 0 12px 4px rgba(var(--color-secondary-rgb),0.25)",
          }}
          className="cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center"
          onClick={() => onActivate(index)}
        >
          <motion.span
            animate={{
              scale: isActive ? 0.55 : 0.4,
              opacity: isActive ? 1 : 0.7,
            }}
            className="w-2 h-2 rounded-full bg-white/90"
          />
          {isActive && !reducedMotion && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-primary/70"
                animate={{ scale: [1, 1.7, 2.2], opacity: [0.75, 0.35, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-primary/40"
                animate={{ scale: [1, 1.9, 2.6], opacity: [0.5, 0.25, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.4,
                }}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Spacer for layout symmetry */}
      <div className={`hidden md:block ${isLeft ? "md:col-start-3" : "md:col-start-1"}`} />
    </motion.li>
  );
}
