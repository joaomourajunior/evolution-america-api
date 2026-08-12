# Evolution América — API do HUB Tecnológico

Backend real da plataforma: autenticação por escola (multi-tenant), catálogo de
cursos, progresso de estudantes, recuperação de senha e o EVO IA (assistente de
estudos, com IA real conectável via variável de ambiente).

## O que já funciona

- **Login por escola** — cada escola tem seus próprios usuários; uma escola nunca
  enxerga dado de outra (isolamento por `school_id` em todas as consultas).
- **Esqueci minha senha** — fluxo completo: solicitar link → validar token →
  redefinir senha. O envio de e-mail de verdade ainda não está plugado (fica
  registrado no log do servidor); é o próximo passo natural (ex: Resend, SendGrid).
- **Catálogo de cursos** — os 6 módulos e 24 aulas da trilha de IA, já semeados
  no banco a partir do conteúdo real da plataforma.
- **Progresso** — marcar/desmarcar aula concluída, por estudante, isolado por escola.
- **EVO IA** — endpoint de chat. Se uma chave de IA (Gemini/Anthropic/OpenAI) for
  configurada, responde com um modelo de verdade; caso contrário, cai automaticamente
  no modo de demonstração local (mesma lógica de busca por palavra-chave do protótipo
  frontend), então a plataforma nunca fica sem resposta.
- **Cadastro de escolas** — endpoint para o dono da plataforma cadastrar novas escolas.

## Rodando localmente

```bash
npm install
cp .env.example .env
npm start
```

O servidor sobe em `http://localhost:3001`. Na primeira execução, o banco SQLite é
criado automaticamente e semeado com:

- 2 escolas de demonstração: **Colégio Atlas** (`colegio-atlas`) e **Instituto Nova
  Era** (`instituto-nova-era`)
- Usuário de teste em cada uma: `professor.demo` / senha `demo1234`
- O catálogo completo da trilha "Inteligência Artificial: do Zero ao Profissional"

## Publicando no Railway

1. Crie um repositório no GitHub com esta pasta (`git init`, `git add .`, `git commit`,
   depois suba pro GitHub).
2. Em [railway.app](https://railway.app), clique em **New Project → Deploy from GitHub repo**
   e selecione o repositório.
3. O Railway detecta o `package.json` e roda `npm install` + `npm start` automaticamente.
4. Em **Variables**, adicione as variáveis do `.env.example` — pelo menos:
   - `JWT_SECRET` (gere um valor novo e aleatório — nunca reuse o de exemplo)
   - `AI_PROVIDER` e a chave correspondente (ex: `GEMINI_API_KEY`), se quiser o EVO IA
     com IA real desde já. Sem isso, o EVO IA continua funcionando no modo local.
5. **Importante sobre o banco de dados:** o SQLite grava um arquivo em disco. No Railway,
   o sistema de arquivos padrão **não é persistente** entre deploys — para não perder
   dado a cada atualização, adicione um **Volume** (Railway → seu serviço → Settings →
   Volumes) apontando para a pasta onde o `.db` fica, e aponte `DB_PATH` nas variáveis
   de ambiente para dentro desse volume (ex: `/data/evolution-america.db`).
6. Após o deploy, o Railway te dá uma URL pública (ex: `https://evolution-america-api-production.up.railway.app`).
   Use essa URL para conectar o frontend (ver próxima seção).

## Conectando ao frontend existente

O `index.html` do HUB Tecnológico hoje funciona com dados mockados no próprio
JavaScript (login visual, progresso não salvo, EVO IA local). Conectar ao backend
real é o próximo passo — envolve trocar, no frontend:

- `doLogin()` → chamar `POST /api/auth/login` e guardar o `token` retornado
- `openForgotPassword`/`submitForgotPassword` → chamar `POST /api/auth/forgot-password`
- Carregamento do curso → chamar `GET /api/courses` (com o token) em vez de usar o
  objeto `COURSE` fixo no JS
- `sendEvoiaMessage()` → chamar `POST /api/evoia/chat` em vez do `answerEvoiaQuestion()` local
- Progresso de aula → chamar `POST /api/progress/:lessonId` quando o estudante concluir

Essa etapa de "plugar o frontend no backend" é o próximo passo lógico depois deste.

## Referência rápida da API

Todas as rotas (exceto login/schools/forgot-password) exigem o header:
`Authorization: Bearer <token>`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/auth/schools` | Lista escolas ativas (para o seletor do login) |
| POST | `/api/auth/login` | `{ schoolSlug, username, password }` → token |
| GET | `/api/auth/me` | Dados do usuário logado |
| POST | `/api/auth/forgot-password` | `{ schoolSlug, email }` |
| POST | `/api/auth/reset-password` | `{ token, newPassword }` |
| POST | `/api/schools` | Cadastra nova escola + admin |
| GET | `/api/schools` | Lista todas as escolas (uso administrativo) |
| GET | `/api/schools/me` | Escola do usuário logado + seus usuários |
| GET | `/api/courses` | Catálogo completo, com progresso do usuário logado |
| GET | `/api/courses/:courseId/lessons/:lessonId` | Conteúdo de uma aula |
| POST | `/api/progress/:lessonId` | Marca aula como concluída |
| DELETE | `/api/progress/:lessonId` | Desmarca aula |
| GET | `/api/progress/summary` | Resumo de progresso do usuário logado |
| POST | `/api/evoia/chat` | `{ message }` → resposta do EVO IA |
| GET | `/api/evoia/history` | Histórico de conversa do usuário logado |

## Próximos passos sugeridos

1. Plugar o frontend nesta API (ver seção acima).
2. Enviar e-mail de verdade no fluxo de "esqueci minha senha".
3. Tela de "Minhas Turmas": matrícula de estudantes, vínculo estudante↔turma↔professor.
4. Emissão de certificado (PDF) quando o estudante conclui o Módulo 6.
5. Papel de "super-admin" da própria Evolution América, separado do admin de cada escola,
   para travar melhor a rota de cadastro de novas escolas.
