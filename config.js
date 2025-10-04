// Configurações do Stripe
const STRIPE_CONFIG = {
    publishableKey: 'pk_test_51QmN00IPGzIfZaTDuIbaWJz50UzPjPiESvwpe6i8gMOwcjwsVlHzUwgUUNU6XWU4WGKCgbMjea8OFNL5ZVRBUjyU00AAOKJibc',
    secretKey: 'sk_test_51QmN00IPGzIfZaTDvt43Mmfj0awAW9qy2gT8ie9gtK3OyiV2XVPGMuWgTx3EdJpu7XswnHX5L4C1g4aMVZKUiP6D00dXfWc2Nx',
    productId: 'prod_TAfijhTULkKnag'
};

// Configurações do Xano
const XANO_CONFIG = {
    apiKey: 'eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.OyQauLL9bA13poz2LRb24TePcifqmHj8YDQr23CBdKEfwzlL44blt-g0ieZMHOvL3tMeE1eyuxGhbyAtjPgylEiGdMtnW4ny.kfUqLvNtr9EvrHYfo8J32A._-naQWV9F1YyKhYXWDekC5fwWpJjGe9e07ibZpSeWWE30l_NUkuC5N2OeVR92l20FQuUEJ1IuMdejjoM6GAHYzq_aKNT7TVcmW5S-VJqOq6kXqplZ1WsjbjC3lvLyhk8g1gBMVdWmc3HoSbWdZN6hyQi6zTMT9kkD5wk-fHcAmU.H0Lzo8tgugab0d9H6bVBgxAtxH_t4CX72KV15mvrPUk',
    baseUrl: 'https://xsvy-gcem-ukz0.n7e.xano.io',
    endpoints: {
        authentication: '/api:8PvLDGDX',
        connect: '/api:xfUoukne',
        prices: '/api:mdAx8xBU',
        products: '/api:ftYPFH8U',
        stripeCheckout: '/api:UQuTJ3vx'
    }
};
