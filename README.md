# Odonto Legal Frontend

Frontend da aplicação **Odonto Legal**, desenvolvido em **Angular 18**, com integração a APIs backend e estrutura responsiva moderna.

![Angular](https://img.shields.io/badge/Angular-18-red) ![Bulma](https://img.shields.io/badge/Bulma-CSS-blue) ![Nebular](https://img.shields.io/badge/Nebular-UI-green) ![PWA Ready](https://img.shields.io/badge/PWA-Ready-blueviolet)

## 🌐 Documentação / Ambiente

- Desenvolvimento: `http://localhost:4200`
- Produção: `/dist/odonto-legal-frontend`

## 📂 Estrutura do Projeto

```
/src/app/modules/cases       # Gerenciamento de casos
/src/app/modules/dashboard   # Dashboard principal
/src/app/modules/login       # Tela de login
/src/app/modules/home        # Painel principal
/src/app/services            # Integração com API backend
/src/app/guards              # Proteção de rotas
/src/environments            # Arquivos de ambiente (dev/prod)
/styles.scss                 # Estilos globais
/angular.json                # Configuração de build e deploy
```

## 🔧 Configuração de Ambientes

| Arquivo | Ambiente | Descrição |
|:--------|:---------|:----------|
| `environment.ts` | Desenvolvimento | Usado no `ng serve` |
| `environment.prod.ts` | Produção | Usado no `ng build --configuration production` |

### 🔧 Parâmetros de Ambiente

| Variável | Descrição |
|:---------|:----------|
| `BackendURL` | URL base do backend API |
| `isProduction` | Booleano de ambiente |

**Exemplo (src/environments/environment.ts):**

```typescript
export const Environment = {
  BackendURL: 'http://localhost:3000',
  isProduction: false
};
```

---

# 🚀 Como montar o ambiente de desenvolvimento

### 1. Clonar o Repositório

```bash
git clone <url-do-repo>
cd odonto-legal-frontend
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Rodar em Desenvolvimento

```bash
npm start
# ou
ng serve
```

Acesse no navegador:

```
http://localhost:4200
```

### 4. Gerar Build para Produção

```bash
npm run build
# ou
ng build --configuration production
```

Build será gerado em `/dist/odonto-legal-frontend`.

---

# 📚 Tecnologias e Bibliotecas Utilizadas

| Tecnologia | Finalidade |
|:------------|:-----------|
| Angular 18 | Framework SPA principal |
| Nebular Theme | Componentes UI modernos |
| Bulma CSS | Layouts responsivos |
| Bootstrap Icons + Eva Icons | Conjunto de ícones |
| SweetAlert2 | Alertas personalizados |
| Ngx-Charts | Gráficos para dashboard |
| RxJS | Programação reativa |
| Sass (SCSS) | Estilização modularizada |

---

# 📅 Comandos Rápidos

```bash
# Instalar dependências
npm install

# Rodar desenvolvimento
npm start

# Gerar produção
npm run build
```

---

# 🔒 Controle de Acesso

- Proteção de rotas autenticadas via `AuthGuard`
- Interceptor JWT adicionando token automaticamente nas requisições
- Toasts visuais de sucesso e erro com `ToastAlert`

# 🛠️ Observações Importantes

- Responsividade garantida por Bulma + Nebular
- Integração backend via `CasesService`, `DashboardService`, `AuthService`
- Controle de ambiente 100% baseado em `environment.*.ts`
- Projeto preparado para ser PWA (Progressive Web App)

---
