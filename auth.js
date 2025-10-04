// Funções de autenticação e gerenciamento de sessão

/**
 * Realiza login do usuário via Xano
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} Resultado do login
 */
async function login(email, password) {
    try {
        const response = await fetch(`${XANO_CONFIG.baseUrl}${XANO_CONFIG.endpoints.authentication}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${XANO_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok && data.authToken) {
            // Salvar token e dados do usuário no localStorage
            localStorage.setItem('authToken', data.authToken);
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('hasPaid', 'true'); // Assumir que usuário logado já pagou
            
            return { success: true, data: data };
        } else {
            return { success: false, message: data.message || 'Credenciais inválidas' };
        }
    } catch (error) {
        console.error('Erro no login:', error);
        return { success: false, message: 'Erro ao conectar com o servidor' };
    }
}

/**
 * Registra um novo usuário via Xano
 * @param {string} name - Nome completo
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} Resultado do registro
 */
async function register(name, email, password) {
    try {
        const response = await fetch(`${XANO_CONFIG.baseUrl}${XANO_CONFIG.endpoints.authentication}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${XANO_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data };
        } else {
            return { success: false, message: data.message || 'Erro ao criar conta' };
        }
    } catch (error) {
        console.error('Erro no registro:', error);
        return { success: false, message: 'Erro ao conectar com o servidor' };
    }
}

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} True se autenticado
 */
function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const hasPaid = localStorage.getItem('hasPaid');
    return token !== null && hasPaid === 'true';
}

/**
 * Verifica se o usuário tem pagamento confirmado
 * @returns {boolean} True se pagamento confirmado
 */
function hasPaymentConfirmed() {
    return localStorage.getItem('hasPaid') === 'true';
}

/**
 * Marca o pagamento como confirmado
 */
function confirmPayment() {
    localStorage.setItem('hasPaid', 'true');
}

/**
 * Obtém os dados do usuário logado
 * @returns {Object|null} Dados do usuário ou null
 */
function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Realiza logout do usuário
 */
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('hasPaid');
    window.location.href = 'index.html';
}

/**
 * Obtém o token de autenticação
 * @returns {string|null} Token ou null
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}
