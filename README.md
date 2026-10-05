# 🏋️‍♂️ FitLog — Workout Library & Planning App

FitLog is a dark, no-nonsense gym companion and workout planning web application. Browse lifts, review instructions and specs, lock workouts into today's plan, and track daily gym routines seamlessly.

---

## 🔗 Live Preview & Repository
- **Live Demo:** [ https://fitlog-weld.vercel.app ]
- **GitHub Repository:** [  ]

---

## 🛠️ Technologies Used
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## ✨ Key Features
1. **Interactive Workout Library:** Fetches and displays 12 major lifts in a responsive 3x4 grid with category tags, equipment info, duration, calories burned, and ratings.
2. **Dynamic Details View (`/workout/:id`):** Two-column layout showcasing high-resolution visuals, equipment requirements, difficulty, sets/reps, and a 4-step instruction guide.
3. **Daily Planner & Cap of 5:** Add exercises to Today's Plan with an enforced 5-lift cap to prevent overtraining, plus a dedicated "Save for Later" collection.
4. **Live Metrics Summary:** Dynamic tracking cards calculating total exercises, combined duration (minutes), and total calories burned in real time.
5. **Sorting & Filtering (Challenge C1):** Real-time sorting dropdown allowing users to sort lifts by Duration, Calories, or Rating.
6. **Task Actions (Challenge C3):** Dedicated "Mark as Done" action with visual strikethrough state and quick remove buttons with instant toast feedback.
7. **LocalStorage Persistence:** Plans and saved workouts persist across browser reloads so progress is never lost.
8. **Fully Responsive & Custom 404:** Polished dark UI designed for mobile, tablet, and desktop viewports, with a custom 404 page for invalid routes.

---

## 🚀 Getting Started Locally

1. Clone the repository:
```bash
git clone [ https://github.com/sabbir84552-web/Fit-log-next.js-project.git ]
