import {
  Activity,
  BarChart3,
  Brain,
  CalendarCheck2,
  Camera,
  Dumbbell,
  Flame,
  Moon,
  Sparkles,
  TimerReset,
} from "lucide-react";

export const screenshots = [
  {
    src: "/screens/1.png",
    title: "Smart workout generator",
    eyebrow: "Create",
    copy: "Build editable sessions from goals, target muscles, available gear, and workout style.",
  },
  {
    src: "/screens/5.png",
    title: "Focused workout player",
    eyebrow: "Train",
    copy: "Move through sets with previous performance, timers, rest, and next-up context in view.",
  },
  {
    src: "/screens/3.png",
    title: "AI performance analysis",
    eyebrow: "Analyze",
    copy: "Turn completed workouts into clear takeaways about volume, set quality, and progression.",
  },
  {
    src: "/screens/2.png",
    title: "Streaks and calendar",
    eyebrow: "Consistency",
    copy: "See activity, missed days, rest, and planned work in one calendar-driven profile view.",
  },
  {
    src: "/screens/4.png",
    title: "Exercise preview and stats",
    eyebrow: "Catalog",
    copy: "Review movement details, targets, equipment, tracking type, and exercise history.",
  },
  {
    src: "/screens/8.png",
    title: "Progress check-ins",
    eyebrow: "Progress",
    copy: "Track photos, measurements, bodyweight, and trend lines without leaving the app.",
  },
  {
    src: "/screens/6.png",
    title: "Stunning dark mode",
    eyebrow: "Comfort",
    copy: "A low-glare training dashboard for night sessions, early mornings, and focused review.",
  },
];

export const pillars = [
  {
    icon: Sparkles,
    label: "Generate",
    title: "Plans built around your constraints",
    copy: "Beat It starts from the gear, time, muscles, and difficulty you actually want to train.",
    color: "bg-punch text-white",
  },
  {
    icon: TimerReset,
    label: "Execute",
    title: "A workout player that keeps pace",
    copy: "Timers, previous sets, next exercises, and input fields stay close to the work.",
    color: "bg-cyan-500 text-white",
  },
  {
    icon: BarChart3,
    label: "Analyze",
    title: "Progress without spreadsheet brain",
    copy: "Review trends, completed sets, body metrics, and coach-style analysis after each session.",
    color: "bg-emerald-500 text-white",
  },
  {
    icon: Flame,
    label: "Return",
    title: "Consistency you can see",
    copy: "Streaks and calendar states make your training rhythm obvious at a glance.",
    color: "bg-amber-500 text-white",
  },
];

export const featureSections = [
  {
    icon: Brain,
    badge: "AI Generator",
    headline: "Start with a workout that already fits.",
    body: "Create a complete, editable plan from goal, equipment, target muscles, structure, and difficulty. It feels quick enough for the gym floor, but structured enough for real progression.",
    points: ["Editable blocks", "Equipment-aware planning", "Warm-up and cooldown support"],
    image: "/screens/2.png",
  },
  {
    icon: Dumbbell,
    badge: "Workout Player",
    headline: "Stay locked into the current set.",
    body: "The player keeps the active exercise, previous results, timer, next movement, and set completion status in one dense training surface.",
    points: ["Previous set memory", "Rest-aware flow", "Clear next-set context"],
    image: "/screens/4.png",
    reverse: true,
  },
  {
    icon: Activity,
    badge: "Coach Report",
    headline: "Know what improved after the session.",
    body: "Workout analysis translates raw set data into the kind of feedback you can act on next time: volume, completion, fatigue, and set quality.",
    points: ["Volume trends", "Set quality signals", "Plain-language takeaways"],
    image: "/screens/3.png",
  },
  {
    icon: CalendarCheck2,
    badge: "Consistency",
    headline: "Turn training into a visible rhythm.",
    body: "The calendar and streak views make it easy to understand planned work, logged activity, rest days, and where the week is heading.",
    points: ["Streak safety", "Calendar activity", "Weekly targets"],
    image: "/screens/7.png",
    reverse: true,
  },
  {
    icon: Camera,
    badge: "Check-ins",
    headline: "Track progress beyond the bar.",
    body: "Progress photos and measurements keep physique, bodyweight, and training history connected so changes do not get lost between workouts.",
    points: ["Photo timeline", "Measurement trends", "Weight history"],
    image: "/screens/5.png",
  },
  {
    icon: Moon,
    badge: "Dark Mode",
    headline: "Looks sharp when the lights go down.",
    body: "Beat It carries the same high-contrast workout UI into dark mode, with strong red actions and quiet training stats.",
    points: ["Low-glare dashboard", "Readable stats", "Red action accents"],
    image: "/screens/8.png",
    reverse: true,
  },
];
