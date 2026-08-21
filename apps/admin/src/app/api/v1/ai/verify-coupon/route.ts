import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { rawText, domain } = await req.json();

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const prompt = `
You are SaaS Coupon Spy AI, an expert software deals auditor.
Analyze the following email, tweet, or promo announcement text for domain: "${domain || 'unknown'}".

TEXT TO ANALYZE:
"""
${rawText.slice(0, 3000)}
"""

Extract and return STRICT JSON with these exact fields:
{
  "hasDiscountPromo": boolean,
  "promoCode": string or null,
  "discountPercentageOrAmount": string or null,
  "planApplicable": "all" | "annual" | "creator" | "pro" | "unknown",
  "expirationDateEstimate": string or null,
  "finePrintRestrictions": string or null,
  "summary": "Crisp 1-sentence breakdown of the offer"
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini error:', err);
      return NextResponse.json({ error: 'Gemini AI parsing failed' }, { status: 500 });
    }

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = textOutput ? JSON.parse(textOutput) : null;

    return NextResponse.json({ success: true, analysis: parsed });
  } catch (error) {
    console.error('Coupon AI Exception:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
