import { NextRequest, NextResponse } from "next/server"
import { readFile, readFileSync } from "fs";
export const dynamic = 'force-dynamic' // defaults to auto

type Leaderboard = LEntry[];
type LEntry = {
    user: string,
    score: number
}

export async function GET(request: NextRequest) {
    // console.log(request.headers);
    const searchParams = request.nextUrl.searchParams;

    let n = 50;
    if (!!searchParams.get("n")) {
        // @ts-ignore
        n = parseInt(searchParams.get("n")); // we already checked for non-null....
    };

    // const leaderboard = JSON.parse(readFileSync("data/leaderboard.json"));
    const leaderboard: Leaderboard = require("../../../data/leaderboard.json");

    leaderboard.sort((a,b) => b.score - a.score);

    return NextResponse.json(leaderboard.slice(0, n));
}