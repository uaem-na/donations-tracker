import debug from "debug";
import { Resend } from "resend";

const log = debug("backend:resend-service");

export class ResendService {
  private apiKey: string | undefined;
  private emailFrom: string | undefined;
  private resend: Resend | undefined;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY;
    if (!this.apiKey) {
      log("RESEND_API_KEY is not set");
      return;
    }

    this.emailFrom = process.env.RESEND_EMAIL_FROM;
    if (!this.emailFrom) {
      log("RESEND_EMAIL_FROM is not set");
      return;
    }

    this.resend = new Resend(this.apiKey);
  }

  public async send({
    to,
    subject,
    html,
  }: {
    to: string | string[];
    subject: string;
    html: string;
  }) {
    if (!this.resend) {
      log("Resend is not configured properly");
      return;
    }

    if (!this.emailFrom) {
      log("RESEND_EMAIL_FROM is not set");
      return;
    }

    try {
      await this.resend.emails.send({
        from: this.emailFrom,
        to,
        subject,
        html,
      });
    } catch (err) {
      log(err);
    }
  }
}
