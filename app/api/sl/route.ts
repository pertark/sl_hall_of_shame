import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";

type Leaderboard = LEntry[];
type LEntry = {
    user: string,
    score: number
}

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams; 
    
    const username: string | null = searchParams.get("user");
    if (!username) {
        return new Response('Mistyped username too 💀', { status: 400 });
    }

    // here is where we would sanitize username if we were being thorough

    // race condition here fix later
    const leaderboard: Leaderboard = require("../../../data/leaderboard.json");
    let userEntry = leaderboard.find(e => e.user == username);
    if (!userEntry) {
        let newEntry: LEntry = {user: username, score: 1};
        leaderboard.push(newEntry);
    } else {
        userEntry.score += 1;
    }

    writeFile("data/leaderboard.json", JSON.stringify(leaderboard), (e) => {console.log(e)}); // NO ERROR CALLBACK

    return new Response('Success', { status: 200 });
}