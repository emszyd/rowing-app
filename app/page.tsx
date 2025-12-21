import Image from "next/image";

export default function Home() {
  return (
    <main style={{ padding: "48px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: "40px", marginBottom: "12px" }}>
        Rowing App
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "700px", lineHeight: 1.6 }}>
        A Next.js + Vercel project for tracking rowing training, workouts, and team
        logistics. Built as a portfolio project and will evolve week-by-week.
      </p>

      <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
        <link
          href="/"
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            textDecoration: "none",
          }}
        >
          Home
        </link>

        <a
          href="https://github.com/emszyd/rowing-app"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            textDecoration: "none",
          }}
        >
          GitHub Repo
        </a>
      </div>

      <div style={{ marginTop: "36px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>This week</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Clean UI foundation (layout + navigation)</li>
          <li>Workout logging (simple form + list)</li>
          <li>Team calendar / practice info (static first, dynamic later)</li>
          <li>Deployments via GitHub → Vercel</li>
        </ul>
      </div>
    </main>
  );
}

