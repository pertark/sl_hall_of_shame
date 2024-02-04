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
  })
  return (
    <main>
      <h1>sl hall of shame</h1>
      <table>
        <th>
          <td>user</td>
          <td>score</td>
        </th>
        
        {
          lb.map((entry: LEntry, i) => {
            return (
              <tr id={''+i}>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            )
          })
        }
        
      </table>
    </main>
  );
}
