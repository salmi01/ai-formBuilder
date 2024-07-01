const { duration } = require("moment");

const PricingPlans = [
    {
        title: 'Monthly Pro',
        link : 'https://buy.stripe.com/test_eVa4gF8Tn1Vp4y49AB',
        price: 8,
        apiId: 'price_1PRBCRA3zXM6EBmNExcJ2PX3',
        duration: '/month'
    },
    {
        title: 'Yearly Pro',
        link : 'https://buy.stripe.com/test_00geVjc5zarV4y46oo',
        price: 69,
        apiId: 'price_1PRB4DA3zXM6EBmNJrYIGfHZ',
        duration: '/year'
    }
]

export default PricingPlans;