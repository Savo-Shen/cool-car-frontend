import { NextRequest, NextResponse } from "next/server"

import { URL } from '../config'

// const URL = 'http://192.168.31.248:5000/'
// const URL = 'http://127.0.0.1:5003'

export async function POST(request: Request, data: {}) {
    const body = await request.json()
    const res = await fetch(URL + '/api/control', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const value = await res.json()

    return NextResponse.json({ value })
}
