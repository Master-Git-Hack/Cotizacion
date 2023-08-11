
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import {Template} from "@templates/Email"
if (!process.env.RESEND) {
    throw new Error('Invalid/Missing environment variable: "RESEND"')
}
if (!process.env.EMAIL) {
    throw new Error('Invalid/Missing environment variable: "EMAIL"')
}
const from = process.env.EMAIL
const KEY = process.env.RESEND
const resend = new Resend(KEY)
export async function POST() {
    try {
        const data =await resend.emails.send({
            from,
            to: [],
            subject: 'Cotización',
            react:Template({})
        })
        return NextResponse.json({message:'¡Email enviado correctamente!'},{status:200})
    }
    catch (err) {
        console.error(err)
        return NextResponse.json({message:'¡Error al enviar el email!'},{status:500})
    }
}