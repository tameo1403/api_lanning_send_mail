import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async send(
    @Body()
    body: {
      name: string;
      email: string;
      message: string;
    },
  ) {
    const { name, email, message } = body;

    try {
      await this.mailService.sendMail(name, email, message);
      return {
        success: true,
        message: 'Gửi email thành công!',
      };
    } catch {
      return {
        success: false,
        message: 'Gửi email thất bại!',
      };
    }
  }
}
