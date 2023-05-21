const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const isLogin = require("../middlewares/isLogin");

module.exports = app => {
    app.post("/api/payment/stripe", isLogin, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            source: req.body.id,
            description: "Purchase 5 email's credits",
        });

        req.user.credit += 5;
        const user = await req.user.save();
        res.send(user);
    });
}