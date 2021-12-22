const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your Recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}"/>
      ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
  </ul>
  <p>Your total is $${total} due at pickup</p>
  <style>
      ul {
        list-style:none;
      }
  </style>
  </div>`;
}

// create transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

transporter.sendMail({
  from: "Slick's Slices <slick@example.com>",
  to: 'orders@example.com',
  subject: 'New Order!',
  html: `<p>Your new pizza order is here!</p>`,
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // If they filled out honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop zzzzzsst good bye' }),
    };
  }

  // Validate data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they have items in order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! Seems like there are no items in your order, please add some to continue.`,
      }),
    };
  }

  // send email

  // send success or error message

  // send test email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};