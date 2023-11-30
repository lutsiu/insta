import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodetest2023@gmail.com",
    pass: "hhlppvtblhbjpprq",
  },
});

export const sendMail = function (
  userEmail: string,
  confirmationCode: number,
  resend = false
) {
  transporter.sendMail({
    to: `${userEmail}`,
    from: "nodetest2023@gmail.com",
    subject: resend ? "Your new code" : "Confirm your email address",
    html: `<div>
    <h1>You've almost done:)</h1>
    <p>Enter this code to confirm your account</p>
    <span style="font-weight: bold; color: 'rgb(147, 51, 234)'; font-size: 1.2rem;">${confirmationCode}</span> 
    </div>`,
  });
};

export const restorePassword = function (userEmail: string, token: string) {
  transporter.sendMail({
    to: userEmail,
    from: "nodetest2023@gmail.com",
    subject: "Restore your LutsiuGram password",
    html: `
      <div>
        <p>You requested a password reset. Click 
          <a href="http://127.0.0.1:5173/restore-password/token/${token}" 
            style="text-decoration: none; font-weight: bold; color: #9333ea; font-size: 1.2rem;">
            here
          </a> 
          to reset your password.
        </p>
      </div>
    `,
  });
};
