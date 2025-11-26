import config from "@config/index";
import Stripe from "stripe";

import { HandleStripePaymentDto } from "./transaction.dto";

export class TransactionStripe {
    private readonly stripe: Stripe = new Stripe(config.stripe.secretKey);

    async handlePayment(dto: HandleStripePaymentDto) {
        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: dto.amount,
            currency: dto.currency,
        });

        const confirmedPayment = await this.stripe.paymentIntents.confirm(
            paymentIntent.id,
            {
                payment_method: "pm_card_visa",
                return_url: `${config.appUrl}/api/v1/transaction/stripe/callback`,
            },
        );
        return confirmedPayment;
    }

    async handleCallback(req: Request) {
        console.log(req.body);
        return "ok";
    }
}

const transactionStripe = new TransactionStripe();
export default transactionStripe;
