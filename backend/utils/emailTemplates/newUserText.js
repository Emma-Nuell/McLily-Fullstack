const newUserText = (userData) => {
    return `
Welcome to McLily Stores!
--------------------------------

Hi ${userData.firstName},

Thank you for creating an account with McLily Stores! We're excited to have you as part of our fashion family.

Your account has been successfully created with the following details:
- Name: ${userData.firstName} ${userData.lastName}
- Email: ${userData.email}

With your McLily account, you can:
- Track your orders
- Save your favorite items
- Get exclusive member offers
- Enjoy faster checkout

We can't wait to help you discover your next favorite fashion pieces!

Happy shopping!

The McLily Team

--------------------------------
Need help? Contact our customer support team.
`;
}

export default newUserText