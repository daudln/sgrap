import fs from "fs";
import path from "path";
import { Transporter } from "nodemailer";
import nodemailer from "nodemailer";

type EmailConfig = {
  companyName: string;
  supportEmail: string;
  companyAddress: string;
  companyCity: string;
  privacyPolicyLink: string;
  unsubscribeLink: string;
};

class EmailService {
  private transporter: Transporter;
  private config: EmailConfig;
  private templateDir: string;

  constructor() {
    this.config = {
      companyName: "All Gateway",
      supportEmail: "daudnamayala@gmail.com",
      companyAddress: "Dodoma, Tanzania",
      companyCity: "Dodoma",
      privacyPolicyLink: `${process.env.DOMAIN_URL}/privacy-and-policy`,
      unsubscribeLink: `${process.env.DOMAIN_URL}/unsubscribe`,
    };
    this.templateDir = path.join(process.cwd(), "emails/templates");
    this.transporter = this.getTransporter();
  }

  private getTransporter(): Transporter {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "localhost",
      port: Number(process.env.SMTP_PORT) || 2525,
      secure: process.env.EMAIL_HOST !== "localhost" ? true : false,
      tls: {
        rejectUnauthorized: false,
      },
      // auth: {
      //   user: process.env.EMAIL_USER,
      //   pass: process.env.EMAIL_PASSWORD,
      // },
    });
    return transporter;
  }

  private async renderTemplate(
    templateName: string,
    data?: Record<string, any>
  ): Promise<string> {
    const templatePath = path.join(this.templateDir, `${templateName}`);

    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      return this.replacePlaceholders(template, data);
    } catch (error) {
      console.error(`Error loading email template ${templateName}:`, error);
      throw new Error("Failed to load email template");
    }
  }

  private replacePlaceholders(
    template: string,
    data?: Record<string, any>
  ): string {
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => {
      return data ? data[key.trim()] : "";
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    templateData?: Record<string, any>,
    from?: string
  ) {
    const html = await this.renderTemplate(templateName, {
      ...templateData,
      ...this.config,
      year: new Date().getFullYear(),
    });

    try {
      const info = await this.transporter.sendMail({
        from: from || process.env.DEFAULT_EMAIL_FROM,
        to,
        subject,
        html,
      });

      return {
        success: !!info.messageId,
        message: "Email sent successfully",
      };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Failed to send email",
      };
    }
  }
}

const emailService = new EmailService();

export default emailService;
