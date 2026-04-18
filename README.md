# 📚 Neural Book Rec

# Sistema de recomendação de livros com redes neurais e feature engineering customizado

> Sistema de recomendação de livros baseado em redes neurais que utiliza vetores de características (feature engineering) e aprendizado supervisionado para sugerir leituras personalizadas com base no perfil e histórico do usuário.

A API treina um modelo neural com dados de leitores reais, gera embeddings de usuários e livros via feature engineering, e realiza predições de afinidade para recomendar os títulos mais relevantes para cada perfil.

![Status](https://img.shields.io/badge/status-estável-2ECC71?style=flat-square)

---

## 🎯 Problema que este sistema resolve

Descobrir o próximo livro certo para ler é difícil, especialmente quando o leitor tem um perfil eclético ou ainda está formando seus gostos literários.

Este sistema resolve isso ao:

- Aprender os padrões de leitura e avaliações de cada usuário
- Construir representações vetoriais únicas por leitor e por livro
- Treinar uma rede neural para prever a afinidade entre usuário e título
- Recomendar os livros com maior score de afinidade, excluindo os já lidos

---

## ⚙️ Como funciona (Pipeline de Recomendação)

O sistema segue um fluxo de feature engineering → treinamento → inferência:

### 🧠 Feature Engineering

Cada usuário e livro é convertido em um vetor numérico (embedding) com base em:

| Feature                  | Tipo de encoding     | Descrição                                 |
| ------------------------ | -------------------- | ----------------------------------------- |
| Idade média dos leitores | Normalização min-max | Faixa etária típica do público do livro   |
| Autor                    | One-hot encoding     | Identificação do autor como vetor binário |
| Gêneros literários       | Multi-hot encoding   | Livro pode ter múltiplos gêneros          |

O **embedding do usuário** é calculado como uma média ponderada dos embeddings das suas leituras, onde o peso de cada livro é proporcional ao desvio da avaliação em relação à média pessoal do leitor, centralizando por média individual, não pela escala global.

```
peso = (rating - userMeanRating) / 5
userEmbedding = Σ(peso × bookEmbedding) / Σ|pesos|
```

Usuários sem avaliações recebem um embedding neutro baseado apenas na idade normalizada.

---

### 🏋️ Treinamento

O modelo é treinado com pares `(userEmbedding + bookEmbedding) → label`:

- `label = 1` → livro lido pelo usuário (positivo)
- `label = 0` → livro não lido (negativo, 5× mais amostras que positivos)

A rede neural é uma MLP com:

```
[inputDim] → Dense(64, ReLU) → Dense(32, ReLU) → Dense(1, Sigmoid)
```

Treinada com Binary Cross-Entropy, otimizador Adam (lr=0.001), 40 épocas.

O modelo treinado é salvo em disco e carregado automaticamente na inicialização da API, evitando retreinamento desnecessário.

---

### 🔮 Inferência

Para recomendar livros a um usuário:

1. O embedding do usuário é gerado com base no seu perfil e leituras
2. O embedding é concatenado com cada livro do catálogo
3. O modelo prediz um score de afinidade (0.0 → 1.0) para cada par
4. Os livros já lidos são filtrados
5. Os 10 títulos com maior score são retornados

---

## 🧩 Modelagem de dados

O sistema é estruturado em torno de quatro conceitos principais:

- **Usuários** → perfil de idade e histórico de leituras
- **Livros** → título, autor e gêneros literários
- **Autores** → referenciados nos embeddings via one-hot
- **Gêneros Literários** → referenciados nos embeddings via multi-hot

Relacionamentos:

- User → 1:N → Readings
- Reading → N:1 → Book
- Book → N:1 → Author
- Book → N:N → LiteraryGenres

---

## 🧱 Arquitetura do sistema

![System Architeture](https://raw.githubusercontent.com/oliveiradniel/neural-book-rec.server/ae41432b0adeb29313bbdd9a87e5f70b5abbd7da/docs/neural_book_rec_architecture.svg)

---

## 💾 Persistência do Modelo

O modelo treinado é serializado em disco utilizando TensorFlow.js:

models/recommender-model/
model.json
weights.bin

- model.json → arquitetura da rede
- weights.bin → pesos treinados

Ao iniciar a aplicação:

- Se o modelo existir → é carregado automaticamente
- Caso contrário → um novo modelo é treinado e persistido

Isso evita retraining desnecessário e reduz o tempo de inicialização em execuções subsequentes.

---

## 🚀 Stacks Principais

| Tecnologia           | Papel no Sistema                                                |
| -------------------- | --------------------------------------------------------------- |
| NestJS               | Estrutura modular da API e orquestração dos serviços.           |
| TensorFlow.js (Node) | Treinamento, inferência e serialização do modelo.               |
| Prisma               | ORM e gerenciamento de dados.                                   |
| PostgreSQL           | Persistência dos dados de usuários, livros, leituras e autores. |
| class-validator      | Validação de dados de entrada.                                  |
| class-transformer    | Serialização e transformação de DTOs.                           |
| reflect-metadata     | Suporte a decorators no runtime.                                |

---

## 🧪 Stacks de Desenvolvimento

| Tecnologia | Uso                                 |
| ---------- | ----------------------------------- |
| TypeScript | Tipagem e segurança de código.      |
| ESLint     | Padronização e qualidade de código. |
| Prettier   | Formatação automática.              |
| Husky      | Git hooks (qualidade de commits).   |
| Commitlint | Padronização de commits.            |
| Prisma CLI | Migrações e schema.                 |

---

## 📄 Variáveis de Ambiente

O projeto utiliza um arquivo `.env` com as seguintes variáveis:

| Nome                | Descrição           | Exemplo                                                    |
| ------------------- | ------------------- | ---------------------------------------------------------- |
| `PORT`              | Porta da aplicação  | `3001`                                                     |
| `FRONTEND_ORIGIN`   | Origem do front-end | `postgres`                                                 |
| `POSTGRES_USER`     | Usuário do banco    | `root`                                                     |
| `POSTGRES_PASSWORD` | Senha do banco      | `root`                                                     |
| `POSTGRES_DB`       | Nome do banco       | `neural-book-rec-db`                                       |
| `DATABASE_URL`      | String de conexão   | `postgresql://root:root@localhost:5432/neural-book-rec-db` |

---

## ▶️ Instruções para rodar o projeto

1. Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/oliveiradniel/neural-book-rec.server.git
cd neural-book-rec.server
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o ambiente:

```bash
# Linux/macOS
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env
```

4. Suba os serviços:

```bash
docker compose up -d
```

5. Popule o banco com dados (Opcional):

```bash
npx prisma db seed
```

6. Execute a API:

```bash
npm run start:dev
```

> ⚠️ Na primeira inicialização sem modelo salvo, a API treinará automaticamente o modelo. O processo pode levar alguns segundos dependendo do volume de dados.

---

## 🔌 Endpoints disponíveis

| Método | Rota                          | Descrição                                         |
| ------ | ----------------------------- | ------------------------------------------------- |
| GET    | `/ai/has-model`               | Verifica se há um modelo treinado em memória.     |
| POST   | `/ai/train`                   | Retreina o modelo com os dados atuais.            |
| GET    | `/ai/recommendations/:userId` | Retorna os 10 livros recomendados para o usuário. |

---

## 🧠 Considerações

Este sistema implementa uma abordagem de recomendação baseada em classificação binária aplicada a ranking, onde o modelo aprende a distinguir interações positivas de negativas e utiliza o score predito para ordenar recomendações.

Apesar de simples, essa abordagem é uma base comum em sistemas de recomendação reais.

---

## 💻 Como utilizar o sistema na web

Para conseguir utilizar a aplicação vá até o [repositório web](https://github.com/oliveiradniel/neural-book-rec.web) e siga os passos corretamente para colocá-la no ar e fazer uso.

---

## 🧑🏻‍💻 Veja outros projetos meus

### Produção

- [JungleOps](https://jungleops.com.br/cadastro?redirect=%2Ftarefas) – gestão de tarefas em equipe em tempo real.
- [InOrbit](https://app.inorbit.site/login) – gestão de metas semanais com gamificação.

### Repositório

- [LetMeAsk](https://github.com/oliveiradniel/letmeask.server) – sistema de perguntas e respostas com RAG sobre conteúdo de áudios.
- [ForgePlan](https://github.com/oliveiradniel/forgeplan-server) – sistema industrial de planejamento e estoque.
