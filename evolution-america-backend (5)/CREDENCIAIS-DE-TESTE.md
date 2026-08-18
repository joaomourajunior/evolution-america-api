# Evolution América — Credenciais de Teste

⚠️ **Importante sobre persistência:** enquanto o Volume do Railway não estiver configurado (ver seção final deste documento), qualquer novo deploy do backend apaga tudo e volta pras credenciais abaixo. Depois de configurar o Volume, senhas trocadas por você passam a valer de verdade e sobrevivem a atualizações.

---

## 1. Painel Evolution (Dono da plataforma)

Acesso: clique no rodapé **"© 2026"** na tela de login.

| Campo | Valor |
|---|---|
| Usuário | `owner.master` |
| Senha | `trocar-esta-senha-2026` |

Pode: ver/criar/excluir/suspender qualquer escola, editar login e senha de qualquer funcionário de escola, ver log de auditoria, ver sugestões.

---

## 2. Escola 1 — Colégio Atlas (slug: `colegio-atlas`)

Acesso: tela de login normal, selecione "Colégio Atlas — Sorocaba/SP".

| Papel | Usuário | Senha | O que pode fazer |
|---|---|---|---|
| Direção (admin) | `admin` | `demo1234` | Acesso total: turmas, relatórios, EVO IA, tickets, configurações, equipe |
| Professor | `professor.demo` | `demo1234` | Acesso conforme permissões liberadas pela direção (por padrão, tudo liberado) |

---

## 3. Escola 2 — Instituto Nova Era (slug: `instituto-nova-era`)

| Papel | Usuário | Senha |
|---|---|---|
| Professor | `professor.demo` | `demo1234` |

*(Essa escola não tem conta "admin" própria no seed — se precisar, peça pro Painel Evolution criar uma, ou edite o `professor.demo` pra role admin diretamente no banco.)*

---

## 4. Estudantes

Não existe estudante pré-cadastrado no seed — é assim de propósito, pra simular o fluxo real. Pra criar um:

1. Entre como `professor.demo` ou `admin` no Colégio Atlas
2. Vá em **Minhas Turmas** → **"+ Criar nova turma"**
3. Dentro da turma → **"+ Adicionar estudante"** → preencha nome, usuário, senha e escolha o nível
4. Anote o usuário/senha que você definiu — são esses que o estudante vai usar

Acesso do estudante: tela de login → clique em **"🎓 Sou estudante"** → escolha a escola → usuário/senha da matrícula.

---

## 5. Fluxos importantes pra testar

| O que testar | Como |
|---|---|
| Avanço sequencial de aula | Como estudante, tente abrir a aula 3 antes da 2 — deve estar bloqueada |
| Avaliação obrigatória | Complete as 4 aulas de um módulo, faça o checkpoint — precisa de 70%+ pra avançar |
| Ticket de dúvida | Como estudante, vá em "Minhas Dúvidas" → envie uma pergunta → veja a resposta automática da EVO IA na hora |
| Professor responde ticket | Como professor, vá em "🎫 Dúvidas dos Estudantes" → responda |
| Permissões da diretora | Como `admin`, vá em Configurações → "Equipe da escola" → restrinja o acesso do `professor.demo` a alguma área → saia e entre como `professor.demo` pra ver o menu mudar |
| Suspender escola | Como Painel Evolution, abra o detalhe de uma escola → "Suspender acesso" → tente logar nela (deve bloquear) |
| Isolamento entre escolas | Dados de uma escola nunca aparecem pra outra — nem turmas, nem tickets, nem relatórios |

---

## 6. ⚠️ Configurar o Volume no Railway (resolve os dados sumirem)

1. No Railway, abra o projeto `extraordinary-miracle` → clique no serviço da API
2. Vá na aba **"Settings"**
3. Role até **"Volumes"** → clique em **"+ New Volume"**
4. Em "Mount path", digite: `/data`
5. Salve
6. Ainda em Settings, vá em **"Variables"** → adicione uma nova variável:
   - Nome: `DATA_DIR`
   - Valor: `/data`
7. Salve — o Railway reinicia o serviço sozinho

A partir daí, os dados (turmas, estudantes, tickets, senhas trocadas) sobrevivem a qualquer novo deploy que você fizer.
