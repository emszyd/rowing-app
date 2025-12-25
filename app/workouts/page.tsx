"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type WorkoutType = "Erg" | "Berg" | "Run" | "Other";

type Workout = {
    id: string;
    date: string;
    type: WorkoutType;
    minutes: number;
    seconds: number;
    meters: number;
    split: number;
    watts: number;
    pace: number;
    stroke_rate: number;
    notes: string;
};

const STORAGE_KEY = "rowingApp.workouts.v1";

function loadWorkouts(): Workout[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as Workout[];
        return parsed;
    } catch {
        return [];
    }
    }

    function saveWorkouts(workouts: Workout[]): void{
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    }

    function todayYMD(): string {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    function makeId(): string {
        return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    export default function WorkoutsPage() {
        const [workouts, setWorkouts] = useState<Workout[]>(function() {
            return loadWorkouts();
        });
        const [date, setDate] = useState<string>(todayYMD());
        const [type, setType] = useState<WorkoutType>("Erg");
        const [minutes, setMinutes] = useState<string>("");
        const [seconds, setSeconds] = useState<string>("");
        const [meters, setMeters] = useState<string>("");
        const [watts, setWatts] = useState<string>("");
        const [pace, setPace] = useState<string>("");
        const [stroke_rate, setStrokeRate] = useState<string>("");
        const [notes, setNotes] = useState("");

        const totalMinutes = useMemo(function() {
            let sum = 0;
            for (let i = 0; i<workouts.length; i++) 
                {sum += workouts[i].minutes;
                return sum;
            }}, [workouts]);

            function addWorkout(e: React.FormEvent): void {
            e.preventDefault();

            const m = Number(minutes);
            if (!date) return;
            if (!Number.isFinite(m) || m <= 0) return;

            const newWorkout: Workout = {
                id: makeId(),
                date: date,
                type: type,
                minutes: Math.round(m),
                seconds: Number(seconds) || 0,
                meters: Number(meters) || 0,
                split: 0, // TODO: calculate split using concept2 formula
                watts: Number(watts) || 0,
                pace: Number(pace) || 0,
                stroke_rate: Number(stroke_rate) || 0,
                notes: notes,
            };

            const next = [newWorkout].concat(workouts);
            setWorkouts(next);
            saveWorkouts(next);
            setDate(todayYMD());
            setMinutes("");
            setSeconds("");
            setMeters("");
            setWatts("");
            setPace("");
            setStrokeRate("");
            setNotes("");
        }

        function deleteWorkout(id: string): void {
            const next = workouts.filter(function (w){
                return w.id !== id;
            });
            setWorkouts(next);
            saveWorkouts(next);
        }

        return (
            <main style={{ padding: "48px", fontFamily: "system-ui, sans-serif" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 style={{ fontSize: "34px", margin: 0}}> Workout Log</h1>
                    <Link href="/" style={{ textDecoration: "none", border: "1px solid #ddd", padding: "8px 12px", borderRadius: "10px" }}>
                        Back 
                    </Link>
                </div>
                <p style={{ marginTop: "10px", color: "#444" }}>
                    Save workouts to local storage. Total minutes logged: <b>{totalMinutes}</b>
                </p>
                <section style = {{ marginTop: "22px", border: "1px solid #eee", borderRadius: "16px", padding: "18px" }}>
                    <h2 style= {{ fontSize: "18px", marginTop: 0}}> Manually Add Workout</h2>
                    <form onSubmit={addWorkout} style={{ display: "grid", gap: "12px", maxWidth: "520px"}}>
                        <label style={{ display: 'grid', gap: '6px' }}>
                            <span>Date</span>
                            <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', backgroundColor: '#333' }}
                    />
                        </label>

                            <label style={{ display: 'grid', gap: '6px' }}>
                            <span>Workout Type</span>
                            <select
                            value={type}
                            onChange={(e) => setType(e.target.value as WorkoutType)}
                            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', backgroundColor: '#333' }}
                            >
                                <option value="Erg">Erg</option>
                                <option value="Berg">Berg</option>
                                <option value="Run">Run</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                        <label style={{ display: 'grid', gap: '6px' }}>
                            <span>Minutes</span>
                            <input
                            inputMode="numeric"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', backgroundColor: '#333' }}
                            />
                        </label>
                        <label style={{ display: 'grid', gap: '6px' }}>
                            <span>Notes</span>
                            <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', minHeight: '90px', backgroundColor: '#333' }}
                            />
                        </label>
                        <button type="submit" style={{ padding: '10px 14px', border: 'none', borderRadius: '10px', background: '#333', cursor: 'pointer', width: 'fit-content' }}>
                            Add Workout
                        </button>
                    </form>
                </section>
                
                <section style={{marginTop: "22px"}}>
                    <h2 style= {{fontSize: "18px"}}> Recent Workouts</h2>

                    {workouts.length === 0 ? (
                        <p style= {{color: "#555"}}>No workouts logged yet.</p>
                    ) : (
                        <div style={{display: "grid", gap: "12px", maxWidth: "520px" }}>
                            {workouts.map(function (w) {
                                return (
                                    <div key={w.id} style={{ padding: '14px', border: '1px solid #eee', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>
                                                    {w.date} * {w.minutes}:{w.seconds}
                                                </div>
                                                <div style={{ color: '#555', marginTop: '4px' }}>{w.date}</div>
                                                {w.notes ? <div style={{marginTop: '8px'}}>{w.notes}</div> : null}
                                            </div>

                                            <button onClick={() => deleteWorkout(w.id)} 
                                            style={{ 
                                                height: 'fit-content', padding: '8px 10px', border: '1px solid #ddd', borderRadius: '12px', background: 'white', cursor: 'pointer' }}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
            );
        }