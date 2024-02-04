"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Leaderboard = LEntry[];
type LEntry = {
    user: string,
    score: number
}

export default function Home() {
  const [lb, setLb] = useState([]);
  useEffect(() => {
    fetch("/api/get").then((d) => d.json()).then((d) => setLb(d));
  }, [])
  return (
    <main className="flex flex-col w-full items-center">
      <h1 className="text-2xl">sl hall of shame</h1>
      <table>
        <thead>
          <tr className="px-4">
            <th>user</th>
            <th>score</th>
          </tr>
        </thead>
        
        <tbody>
          {
            lb.map((entry: LEntry, i) => {
              return (
                <tr key={i}>
                  <td>{entry.user}</td>
                  <td>{entry.score}</td>
                </tr>
              )
            })
          }
        </tbody>
        
      </table>
    </main>
  );
}
