import {allExamples} from "contentlayer/generated"
import { NextRequest, NextResponse } from "next/server"


export const runtime = "edge"



export function GET(req: NextRequest){
    return NextResponse.json(allExamples)
}