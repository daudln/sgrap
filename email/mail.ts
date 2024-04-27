import nodemailer from "nodemailer";
const SMTP_PORT = Number(process.env.SMTP_PORT);
console.log(SMTP_PORT, process.env.EMAIL_HOST);
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "localhost",
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: process.env.EMAIL_USE_SSL === "True" ? true : false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

export const sendVerificationEmail = async (
  to: string,
  subject: string,
  template: string,
  actionLink?: string,
  from?: string
) => {
  try {
    const info = await transporter.sendMail({
      from: from || process.env.DEFAULT_EMAIL_FROM,
      to: to,
      subject: subject,
      html: template,
    });

    if (info.messageId) {
      return {
        success: true,
        status: 200,
        message: "Check your email to verify your account",
      };
    }

    return {
      success: false,
      status: 500,
      message: "Something went wrong",
    };
  } catch (error) {
    console.log(error);
  }
};

export const sendForgotPasswordEmail = async (
  to: string,
  subject: string,
  template: string,
  actionLink?: string,
  from?: string
) => {
  const info = await transporter.sendMail({
    from: from || process.env.DEFAULT_EMAIL_FROM,
    to: to,
    subject: subject,
    html: template,
  });

  if (info.messageId) {
    return {
      success: true,
      status: 200,
      message: "Check your email to reset your password",
    };
  }

  return {
    success: false,
    status: 500,
    message: "Something went wrong",
  };
};
