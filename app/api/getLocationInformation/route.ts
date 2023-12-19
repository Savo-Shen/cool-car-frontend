import { NextResponse, NextRequest } from "next/server"

import { URL } from '../config'

// const URL = 'http://192.168.31.248:5000/'
// const URL = 'http://127.0.0.1:5003'

export async function GET(request: NextRequest) {
    const res = await fetch(URL + '/api/information', {
        headers: {
            'Content-Type': 'application/json',
        },
        next: {revalidate: 0}
    })
    const data = await res.json()
    // return Response.json({ data })
    return NextResponse.json({ data })
}