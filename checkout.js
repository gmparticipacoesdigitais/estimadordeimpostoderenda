// Inicializar Stripe
const stripe = Stripe(STRIPE_CONFIG.publishableKey);

// Handler do formulário de checkout
document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorDiv = document.getElementById("errorMessage");
    const checkoutBtn = document.getElementById("checkoutBtn");

    // Validações
    errorDiv.classList.add("hidden");

    if (password !== confirmPassword) {
        errorDiv.textContent = "As senhas não coincidem.";
        errorDiv.classList.remove("hidden");
        return;
    }

    if (password.length < 6) {
        errorDiv.textContent = "A senha deve ter pelo menos 6 caracteres.";
        errorDiv.classList.remove("hidden");
        return;
    }

    // Desabilitar botão durante o processo
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Processando...";

    try {
        // 1. Registrar usuário no Xano
        const registerResult = await register(name, email, password);
        
        if (!registerResult.success) {
            errorDiv.textContent = registerResult.message || "Erro ao criar conta. Este e-mail pode já estar cadastrado.";
            errorDiv.classList.remove("hidden");
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Prosseguir para Pagamento";
            return;
        }

        // SIMULAÇÃO DE PAGAMENTO BEM-SUCEDIDO
        // Em um cenário real, aqui você chamaria a API do Stripe para criar uma sessão de checkout
        // e redirecionaria o usuário para o Stripe.
        // Como não podemos depurar o Xano, vamos simular o sucesso.

        // Fazer login automático após o registro bem-sucedido
        const loginResult = await login(email, password);

        if (loginResult.success) {
            // Marcar pagamento como confirmado
            confirmPayment();
            
            // Redirecionar para página de sucesso
            window.location.href = "success.html";
        } else {
            errorDiv.textContent = loginResult.message || "Erro ao fazer login automático após registro.";
            errorDiv.classList.remove("hidden");
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Prosseguir para Pagamento";
        }

    } catch (error) {
        console.error("Erro no checkout:", error);
        errorDiv.textContent = "Erro ao processar. Tente novamente.";
        errorDiv.classList.remove("hidden");
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = "Prosseguir para Pagamento";
    }
});

/**
 * Esta função não será mais usada no fluxo simulado, mas é mantida para referência.
 * Cria uma sessão de checkout do Stripe via API Xano
 * @param {string} email - Email do cliente
 * @param {string} customerName - Nome do cliente
 * @returns {Promise<Object>} Resultado com sessionId
 */
async function createStripeCheckoutSession(email, customerName) {
    try {
        const pricesResponse = await fetch(`${XANO_CONFIG.baseUrl}${XANO_CONFIG.endpoints.prices}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${XANO_CONFIG.apiKey}`
            }
        });

        const prices = await pricesResponse.json();
        
        const productPrice = prices.find(p => p.product === STRIPE_CONFIG.productId);
        
        if (!productPrice) {
            return { success: false, message: "Preço do produto não encontrado" };
        }

        const response = await fetch(`${XANO_CONFIG.baseUrl}${XANO_CONFIG.endpoints.stripeCheckout}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${XANO_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                price_id: productPrice.id,
                customer_email: email,
                customer_name: customerName,
                success_url: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${window.location.origin}/checkout.html`
            })
        });

        const data = await response.json();

        if (response.ok && data.sessionId) {
            return { success: true, sessionId: data.sessionId };
        } else {
            return { success: false, message: data.message || "Erro ao criar sessão" };
        }
    } catch (error) {
        console.error("Erro ao criar sessão de checkout:", error);
        return { success: false, message: "Erro ao conectar com o servidor" };
    }
}

// Verificar se voltou do Stripe com sucesso (este bloco não será mais ativado no fluxo simulado)
window.addEventListener("load", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    
    if (sessionId) {
        const pendingUser = sessionStorage.getItem("pendingUser");
        
        if (pendingUser) {
            const userData = JSON.parse(pendingUser);
            
            const loginResult = await login(userData.email, userData.password);
            
            if (loginResult.success) {
                confirmPayment();
                sessionStorage.removeItem("pendingUser");
                window.location.href = "success.html";
            }
        }
    }
});
