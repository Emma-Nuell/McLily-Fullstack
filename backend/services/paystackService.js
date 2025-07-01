import Paystack from "paystack-node"

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

export const initializePayment = async (payload) => {
    return await paystack.initializeTransaction(payload);
};

export const verifyPayment = async (reference) => {
    return await paystack.verifyTransaction(reference)
}