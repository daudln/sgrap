import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 2525,
});

export const sendVerificationEmail = async (
  to: string,
  subject: string,
  template: string,
  actionLink?: string,
  from?: string
) => {
  const info = await transporter.sendMail({
    from: from || "no-reply@sgrap.edu.tz",
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
};

export const sendForgotPasswordEmail = async (
  to: string,
  subject: string,
  template: string,
  actionLink?: string,
  from?: string
) => {
  const info = await transporter.sendMail({
    from: from || "no-reply@sgrap.edu.tz",
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
