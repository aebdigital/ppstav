import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      message,
      subject,
      // Additional fields for jadro-na-kluc form
      location,
      panelak,
      scope,
      budget,
      start,
      formType,
    } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "Chýbajú povinné polia" },
        { status: 400 }
      );
    }

    // Build email content based on form type
    let emailSubject: string;
    let emailBody: string;

    if (formType === "jadro") {
      emailSubject = `Nová žiadosť o obhliadku - Bytové jadro na kľúč`;
      emailBody = `
<h2>Nová žiadosť o obhliadku - Bytové jadro na kľúč</h2>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Meno:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefón:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
  </tr>
  ${email ? `<tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
  </tr>` : ""}
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Lokalita:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${location || "-"}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Panelákové jadro:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${panelak === "ano" ? "Áno" : "Nie"}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Rozsah:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${scope === "jadro_na_kluc" ? "Bytové jadro na kľúč" : "Kompletná rekonštrukcia bytu"}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Rozpočet:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${budget || "-"}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Kedy chce začať:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${start || "-"}</td>
  </tr>
</table>

<h3>Poznámka:</h3>
<p>${message}</p>
      `;
    } else {
      emailSubject = subject
        ? `Nová správa z kontaktného formulára - ${subject}`
        : "Nová správa z kontaktného formulára";
      emailBody = `
<h2>Nová správa z kontaktného formulára</h2>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Meno:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefón:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
  </tr>
  ${subject ? `<tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Predmet:</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
  </tr>` : ""}
</table>

<h3>Správa:</h3>
<p>${message}</p>
      `;
    }

    // Send email via SMTP2GO API
    const smtp2goApiKey = process.env.SMTP2GO_API_KEY;

    if (!smtp2goApiKey) {
      console.error("SMTP2GO_API_KEY is not configured");
      return NextResponse.json(
        { success: false, message: "Email služba nie je nakonfigurovaná" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: smtp2goApiKey,
        to: [process.env.CONTACT_EMAIL || "pavolporuban@ppstav.sk"],
        sender: process.env.SMTP_FROM_EMAIL || "web@ppstav.sk",
        subject: emailSubject,
        html_body: emailBody,
        text_body: message,
      }),
    });

    const result = await response.json();

    if (result.data?.succeeded > 0) {
      return NextResponse.json({
        success: true,
        message: "Správa bola úspešne odoslaná",
      });
    } else {
      console.error("SMTP2GO error:", result);
      return NextResponse.json(
        { success: false, message: "Nepodarilo sa odoslať správu" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Nastala chyba pri spracovaní" },
      { status: 500 }
    );
  }
}
