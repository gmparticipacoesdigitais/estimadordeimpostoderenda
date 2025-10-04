# Estimador de Isenção de Imposto de Renda 2024

Sistema completo de calculadora de IRPF com integração de pagamento via Stripe e autenticação via Xano.

## 📋 Descrição

Este projeto é uma aplicação web que permite aos usuários calcular se estão na faixa de isenção do Imposto de Renda. O acesso à calculadora é protegido e requer pagamento confirmado via Stripe.

## 🚀 Funcionalidades

- ✅ **Sistema de Autenticação** - Login e registro de usuários via Xano
- ✅ **Pagamento Integrado** - Checkout seguro com Stripe
- ✅ **Acesso Protegido** - Apenas usuários pagantes podem acessar a calculadora
- ✅ **Calculadora de IRPF** - Cálculo preciso baseado nas tabelas de 2024
- ✅ **Interface Moderna** - Design responsivo com Tailwind CSS
- ✅ **Validações** - Verificação de dados e autenticação em todas as páginas

## 📁 Estrutura de Arquivos

```
ir-calculator-app/
├── index.html          # Página inicial com opções de login/compra
├── login.html          # Página de login
├── checkout.html       # Página de checkout e registro
├── success.html        # Página de confirmação de pagamento
├── calculator.html     # Calculadora protegida (acesso apenas após pagamento)
├── config.js           # Configurações do Stripe e Xano
├── auth.js             # Módulo de autenticação
├── checkout.js         # Módulo de checkout e pagamento
└── README.md           # Este arquivo
```

## 🔧 Configuração

### Credenciais Stripe (Modo Teste)

- **Publishable Key**: `pk_test_51QmN00IPGzIfZaTDuIbaWJz50UzPjPiESvwpe6i8gMOwcjwsVlHzUwgUUNU6XWU4WGKCgbMjea8OFNL5ZVRBUjyU00AAOKJibc`
- **Secret Key**: `sk_test_51QmN00IPGzIfZaTDvt43Mmfj0awAW9qy2gT8ie9gtK3OyiV2XVPGMuWgTx3EdJpu7XswnHX5L4C1g4aMVZKUiP6D00dXfWc2Nx`
- **Product ID**: `prod_TAfijhTULkKnag`

### Xano API

- **Base URL**: `https://xsvy-gcem-ukz0.n7e.xano.io`
- **API Key**: Configurada no arquivo `config.js`

### Endpoints Xano

- **Authentication**: `/api:8PvLDGDX`
- **Connect**: `/api:xfUoukne`
- **Prices**: `/api:mdAx8xBU`
- **Products**: `/api:ftYPFH8U`
- **Stripe Checkout**: `/api:UQuTJ3vx`

## 🌐 Como Usar

### 1. Hospedagem

Para hospedar a aplicação, você pode usar qualquer serviço de hospedagem estática:

- **Netlify**: Arraste a pasta do projeto
- **Vercel**: Conecte ao repositório Git
- **GitHub Pages**: Configure nas configurações do repositório
- **Servidor Web**: Apache, Nginx, etc.

### 2. Fluxo de Uso

1. **Página Inicial** (`index.html`)
   - Usuário escolhe entre fazer login ou comprar acesso

2. **Checkout** (`checkout.html`)
   - Usuário preenche dados pessoais
   - Cria conta no Xano
   - Redireciona para pagamento Stripe

3. **Pagamento Stripe**
   - Usuário completa o pagamento
   - Retorna para a aplicação

4. **Confirmação** (`success.html`)
   - Pagamento confirmado
   - Acesso liberado

5. **Calculadora** (`calculator.html`)
   - Acesso protegido
   - Cálculos ilimitados

### 3. Login

Usuários que já compraram podem fazer login diretamente em `login.html`.

## 🔒 Segurança

- ✅ Todas as páginas verificam autenticação
- ✅ Tokens armazenados em localStorage
- ✅ Validação de pagamento antes do acesso
- ✅ Comunicação segura via HTTPS (recomendado)

## 🧪 Modo de Teste

As credenciais fornecidas são do **modo teste do Stripe**. Para usar cartões de teste:

- **Número**: 4242 4242 4242 4242
- **Data**: Qualquer data futura
- **CVC**: Qualquer 3 dígitos
- **CEP**: Qualquer CEP válido

## 📝 Notas Importantes

1. **Produção**: Antes de colocar em produção, substitua as chaves de teste do Stripe pelas chaves de produção
2. **HTTPS**: Use sempre HTTPS em produção para segurança
3. **Webhooks**: Configure webhooks do Stripe para confirmar pagamentos de forma mais robusta
4. **Xano**: Certifique-se de que os endpoints do Xano estão configurados corretamente

## 🛠️ Customização

### Alterar Preço

Edite o produto no painel do Stripe e atualize o `productId` em `config.js`.

### Alterar Design

Os arquivos HTML usam Tailwind CSS. Você pode customizar as classes diretamente nos arquivos.

### Adicionar Funcionalidades

- Adicione novos campos na calculadora em `calculator.html`
- Modifique as funções de cálculo no script da calculadora

## 📞 Suporte

Para questões sobre:
- **Stripe**: https://stripe.com/docs
- **Xano**: https://docs.xano.com
- **Tailwind CSS**: https://tailwindcss.com/docs

## 📄 Licença

Este projeto é fornecido como está, sem garantias. Use por sua conta e risco.

---

**Desenvolvido com ❤️ para facilitar o cálculo de IRPF**
