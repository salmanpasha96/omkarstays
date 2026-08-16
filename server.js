const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '.jpg');
    const unique = `${Date.now()}-${Math.round(Math.random() * 100000)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
      'video/mp4',
      'video/quicktime',
      'video/webm',
      'video/x-matroska',
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only images and short videos up to 10 MB are allowed.'));
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ensureCredentials = () => {
  const email = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;

  if (!email || !password) {
    return false;
  }

  return true;
};

const buildSummary = (payload) => {
  const lines = [
    'New inquiry from Omkar Stays website',
    '---------------------------------',
    `Name: ${payload.name || 'Not provided'}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
  ];

  if (payload.checkin) lines.push(`Check-in: ${payload.checkin}`);
  if (payload.checkout) lines.push(`Check-out: ${payload.checkout}`);
  if (payload.message) lines.push(`Message: ${payload.message}`);

  return lines.join('\n');
};

const sendInquiryEmail = async (payload, file = null) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  const subject = payload.subject || 'New Omkar Stays Inquiry';
  const html = `
    <h2>New inquiry from Omkar Stays</h2>
    <p><strong>Name:</strong> ${payload.name || 'Not provided'}</p>
    <p><strong>Email:</strong> ${payload.email || 'Not provided'}</p>
    <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
    ${payload.checkin ? `<p><strong>Check-in:</strong> ${payload.checkin}</p>` : ''}
    ${payload.checkout ? `<p><strong>Check-out:</strong> ${payload.checkout}</p>` : ''}
    ${payload.rating ? `<p><strong>Rating:</strong> ${payload.rating}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${(payload.message || '').replace(/\n/g, '<br>')}</p>
  `;

  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: process.env.RECIPIENT_EMAIL || process.env.ZOHO_EMAIL,
    replyTo: payload.email || process.env.ZOHO_EMAIL,
    subject,
    text: buildSummary(payload),
    html,
  };

  const attachments = Array.isArray(file) ? file : file ? [file] : [];
  if (attachments.length) {
    mailOptions.attachments = attachments.map((item) => ({
      filename: item.originalname,
      path: item.path,
    }));
  }

  await transporter.sendMail(mailOptions);
};

app.use(express.static(__dirname));

app.post('/api/contact', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      subject: 'New Contact Inquiry - Omkar Stays',
    };

    if (!ensureCredentials()) {
      return res.status(500).json({ success: false, message: 'Zoho SMTP credentials are not configured yet.' });
    }

    await sendInquiryEmail(payload);
    return res.json({ success: true, message: 'Your message was sent successfully.' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send the message. Please try again later.' });
  }
});

app.post('/api/booking', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      message: req.body.message,
      subject: 'New Room Booking Inquiry - Omkar Stays',
    };

    if (!ensureCredentials()) {
      return res.status(500).json({ success: false, message: 'Zoho SMTP credentials are not configured yet.' });
    }

    await sendInquiryEmail(payload);
    return res.json({ success: true, message: 'Your room inquiry was sent successfully.' });
  } catch (error) {
    console.error('Room booking error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send the booking request. Please try again later.' });
  }
});

app.post('/api/tent-booking', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      message: req.body.message,
      subject: 'New Tent Booking Inquiry - Omkar Stays',
    };

    if (!ensureCredentials()) {
      return res.status(500).json({ success: false, message: 'Zoho SMTP credentials are not configured yet.' });
    }

    await sendInquiryEmail(payload);
    return res.json({ success: true, message: 'Your tent inquiry was sent successfully.' });
  } catch (error) {
    console.error('Tent booking error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send the tent request. Please try again later.' });
  }
});

app.get('/api/feedback', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Use the feedback form page to submit feedback. This endpoint accepts POST requests.',
  });
});

app.post('/api/feedback', upload.array('attachments', 10), async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      rating: req.body.rating,
      message: req.body.message,
      subject: 'New Guest Feedback - Omkar Stays',
    };

    if (!ensureCredentials()) {
      return res.status(500).json({ success: false, message: 'Zoho SMTP credentials are not configured yet.' });
    }

    await sendInquiryEmail(payload, req.files || []);
    return res.json({ success: true, message: 'Thank you for your feedback!' });
  } catch (error) {
    console.error('Feedback form error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to submit feedback. Please try again later.' });
  }
});

app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'server running' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Omkar Stays form server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
