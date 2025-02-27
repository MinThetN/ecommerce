import { NextResponse } from "next/server"
const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export const POST = async (request:any) => { 
    const {products} = request.json()

    //  1. Find products from stripe that matches products form cart.
    let activeProducts = await stripe.products.list({
        active: true,
    });
    for(const product of products){
        const matchedProducts = activeProducts.find((stripeProduct:any)=>
            stripeProduct.name.toLowerCase() === product.name.toLowerCase()
        )
    }

    //  2. If product didn't exist in stripe, then add this product to stripe.
    //  3. Once the new product has been added to stripe, do FETCH products again with updated products form stripe.

    const stripeProducts = [
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
    ]
     // 4. Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        line_items: stripeProducts,
        mode: 'payment',
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({
        data: 'hello word'
    })
}