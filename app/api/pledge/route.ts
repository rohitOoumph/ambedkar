import { NextRequest, NextResponse } from 'next/server'
import { generateCertificateHTML } from '@/lib/certificate-generator'
import { savePledgeSubmission } from '@/lib/pledge-storage'

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save submission to JSON file
    await savePledgeSubmission(name, email)

    // Generate certificate HTML
    const certificateHTML = generateCertificateHTML(name)

    // Send email using your email service
    const emailSent = await sendCertificateEmail(email, name, certificateHTML)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send email. Please check email configuration.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Certificate sent successfully'
    })
  } catch (error) {
    console.error('Error processing pledge:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function sendCertificateEmail(email: string, name: string, certificateHTML: string): Promise<boolean> {
  try {
    // Using Resend for email delivery
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return false
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dr. Bheem Rao Ambedkar Foundation <onboarding@resend.dev>', // Update this to your verified domain
        to: email,
        subject: '🏅 Your Certificate of Commitment - Samvidhan Pledge',
        html: certificateHTML,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Resend API error:', errorData)
      return false
    }

    const data = await response.json()
    console.log('Email sent successfully:', data.id)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

