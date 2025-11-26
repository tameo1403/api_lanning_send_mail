import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get('RESEND_API_KEY'));
  }

  async sendMail(name: string, email: string, message: string) {
    try {
      const response = await this.resend.emails.send({
        from: 'Website Contact <noreply@resend.dev>',
        to: `${this.config.get('MAIL_TO')}`,
        subject: '📩 Thông báo: Form liên hệ mới',
        html: `
          <h2>Thông tin liên hệ mới</h2>
          <p><strong>Họ tên:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Nội dung:</strong> ${message}</p>
        `,
      });

      return response;
    } catch (error) {
      console.error('Send email error:', error);
      throw error;
    }
  }
}
