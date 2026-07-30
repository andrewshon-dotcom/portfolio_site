import { NextResponse } from "next/server";
import {
  buildMailtoUrl,
  contactSchema,
  escapeHtml,
  MAX_CONTACT_REQUEST_BYTES,
} from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_CONTACT_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, message: "This message is too large to send." },
      { status: 413 },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, message: "The request could not be read." },
      { status: 400 },
    );
  }

  if (
    new TextEncoder().encode(rawBody).byteLength > MAX_CONTACT_REQUEST_BYTES
  ) {
    return NextResponse.json(
      { ok: false, message: "This message is too large to send." },
      { status: 413 },
    );
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, message: "The request format is invalid." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please review the form fields and try again." },
      { status: 400 },
    );
  }

  const message = parsed.data;
  if (message.website) {
    return NextResponse.json({ ok: true, delivery: "email" });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "andrewyoungshon@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json({
      ok: true,
      delivery: "mailto",
      mailtoUrl: buildMailtoUrl(message, toEmail),
    });
  }

  const html = `
    <h1>Portfolio inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(message.company || "Not provided")}</p>
    <p><strong>Project or role:</strong> ${escapeHtml(message.projectRole)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message.message).replaceAll("\n", "<br>")}</p>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: message.email,
        subject: `Portfolio inquiry: ${message.projectRole}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json({
        ok: true,
        delivery: "mailto",
        mailtoUrl: buildMailtoUrl(message, toEmail),
      });
    }
  } catch {
    return NextResponse.json({
      ok: true,
      delivery: "mailto",
      mailtoUrl: buildMailtoUrl(message, toEmail),
    });
  }

  return NextResponse.json({ ok: true, delivery: "email" });
}
