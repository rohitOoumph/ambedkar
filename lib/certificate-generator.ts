export function generateCertificateHTML(name: string): string {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate of Commitment</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 40px 20px;
      line-height: 1.6;
    }
    .certificate {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 60px 50px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      border: 8px solid #1e40af;
      position: relative;
    }
    .certificate::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      border: 2px solid #fbbf24;
      pointer-events: none;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .medal {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .foundation-name {
      font-size: 24px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .certificate-title {
      font-size: 20px;
      color: #4b5563;
      margin-bottom: 30px;
    }
    .recipient-section {
      text-align: center;
      margin: 40px 0;
      padding: 30px 0;
      border-top: 2px solid #e5e7eb;
      border-bottom: 2px solid #e5e7eb;
    }
    .recipient-label {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 15px;
    }
    .recipient-name {
      font-size: 32px;
      font-weight: bold;
      color: #1e40af;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      margin: 40px 0;
      text-align: justify;
      font-size: 16px;
      color: #374151;
      line-height: 1.8;
    }
    .pledge-points {
      margin: 30px 0;
      padding-left: 20px;
    }
    .pledge-points li {
      margin: 12px 0;
      padding-left: 10px;
    }
    .quote {
      text-align: center;
      font-style: italic;
      font-size: 18px;
      color: #1e40af;
      margin: 40px 0;
      padding: 20px;
      background: #eff6ff;
      border-left: 4px solid #fbbf24;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
    }
    .date-section {
      display: inline-block;
    }
    .date-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 40px;
      border-bottom: 2px solid #1e40af;
      padding-bottom: 5px;
    }
    .issuer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
    }
    .issuer-name {
      font-size: 20px;
      font-weight: bold;
      color: #1e40af;
      text-transform: uppercase;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .certificate {
        box-shadow: none;
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <div class="medal">🏅</div>
      <div class="foundation-name">Certificate of Commitment</div>
      <div class="certificate-title">Dr. Bheem Rao Ambedkar Foundation (DAF)</div>
    </div>

    <div class="recipient-section">
      <div class="recipient-label">This Certificate is Proudly Presented To</div>
      <div class="recipient-name">${escapeHtml(name)}</div>
    </div>

    <div class="content">
      <p>
        In recognition of your commitment to uphold the values, ideals, and constitutional spirit envisioned by
        <strong>Dr. B.R. Ambedkar</strong> — the architect of the Indian Constitution.
      </p>

      <p style="margin-top: 20px;">
        By taking the Samvidhan Pledge with the Dr. Bheem Rao Ambedkar Foundation (DAF), you affirm your dedication to:
      </p>

      <ul class="pledge-points">
        <li>Uphold justice, liberty, equality, and fraternity</li>
        <li>Respect and protect the dignity and rights of every individual</li>
        <li>Promote unity, harmony, and constitutional awareness</li>
        <li>Stand against discrimination in all its forms</li>
        <li>Contribute to building an India rooted in equality, dignity, and human values</li>
        <li>Carry forward Babasaheb's mission of empowering society through knowledge and responsibility</li>
      </ul>

      <p style="margin-top: 20px;">
        Your pledge is a step toward nurturing a more enlightened, inclusive, and just nation —
        the India that Babasaheb dreamt of.
      </p>
    </div>

    <div class="quote">
      "Hamara Samvidhan. Hamara Sankalp. Hamara Swabhimaan."
    </div>

    <div class="footer">
      <div class="date-section">
        <div class="date-label">Date: ${currentDate}</div>
      </div>
    </div>

    <div class="issuer">
      <div class="issuer-name">Issued by:</div>
      <div class="issuer-name" style="margin-top: 10px;">Dr. Bheem Rao Ambedkar Foundation (DAF)</div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

