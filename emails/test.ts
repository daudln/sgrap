import { createId } from "@paralleldrive/cuid2";
import emailService from "./utils";

async function testSendEmail() {
  const { success, message } = await emailService.sendEmail(
    "daudnamayala@gmail.com",
    "Hello world",
    "verification.html",
    {
      userName: "Daud Namayala",
      verificationLink: `${process.env.DOMAIN_URL}/${createId()}`,
    }
  );

  console.log({ success, message });
}

testSendEmail().catch(console.error);
