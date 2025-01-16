# Template para o projeto final do Aprofunda Pretalab

![image](https://media2.giphy.com/media/D567hs4Dex0GEnAKOY/giphy.gif)
<aside>
⚠️ Este repositório é um template feito com a base do projeto final feito com typscript e clean archi.
</aside>

<br>

## `Como usar este template:`

- Com o link do template aberto no navegador, clique no botão verde "Use this template";

-  Após clicar no botão, você será redirecionada para uma nova página onde você deve escolher o nome do repositório que você irá criar a partir do template. Dê um nome ao repositório, certifique-se que está marcado como público e clique em "Create repository from template";

- Após isso você será redirecionada para a página do repositório que acabou de criar. Para clonar o repositório, clique no botão "Code" e irá aparecer um menu. Copie a URL que aparece logo abaixo do botão;

- No seu terminal, navegue até a sua pasta de preferência e rode o comando git clone {URL_DO_REPOSITORIO}, isso irá baixar todos os arquivos para a sua máquina. Lembre-se que você precisa do Git instalado em sua máquina, caso ainda não tenha;

- Com seu repositório baixado na sua máquina, execute o comando ``npm install`` na pasta do projeto clonado para instalar todas as dependências.


## Projeto Backend - Gestão de Despesas e Chat com Google GenAI

Este projeto backend foi desenvolvido com Node.js e TypeScript, utilizando arquitetura limpa. Ele permite gerenciar despesas de pessoas usuárias e integrar funcionalidades de chat com Gemini.

---
## Arquitetura da aplicação

![Descrição da Imagem](pretalab.png)


## Funcionalidades

### Rotas

1. **Cadastro de Despesas**  
   - **Endpoint:** `POST /despesas`  
   - **Descrição:** Adiciona uma nova despesa para uma pessoa usuária.  
   - **Request Body:**  
     ```json
     {
        "descricao": "Petshop",
        "categoria": "Pet",
        "valor": "500.00",
        "tipo": "saída",
        "data": "2025-01-04",
        "userId": "Vlrhh7VMtJMtjgQOj5SUHEd2iIC3"
     }
     ```
   - **Resposta:**  
     ```json
     {
        "descricao": "Petshop",
        "categoria": "Pet",
        "valor": "500.00",
        "tipo": "saída",
        "data": "2025-01-04",
        "userId": "Vlrhh7VMtJMtjgQOj5SUHEd2iIC3"
     }
     ```

2. **Listagem de Despesas por pessoa usuária**
   - **Endpoint:** `GET /despesas/:userId`  
   - **Descrição:** Retorna todas as despesas cadastradas de uma pessoa usuária específica.  
   - **Parâmetros de Rota:**  
     - `userId` (string): ID da pessoa usuária.  
   - **Resposta:**  
     ```json
        [
            {
                "id": "677c6da1036bde0695267e8e",
                "descricao": "Salário",
                "categoria": "Trabalho",
                "valor": 10000,
                "tipo": "entrada",
                "data": "2025-01-04",
                "userId": "Vlrhh7VMtJMtjgQOj5SUHEd2iIC3"
            },
            {
                "id": "677c6db8036bde0695267e90",
                "descricao": "Aluguel",
                "categoria": "Moradia",
                "valor": 2000,
                "tipo": "saída",
                "data": "2025-01-05",
                "userId": "Vlrhh7VMtJMtjgQOj5SUHEd2iIC3"
            },
            {
                "id": "677c6dce036bde0695267e92",
                "descricao": "Compra no supermercado",
                "categoria": "Alimentação",
                "valor": 500,
                "tipo": "saída",
                "data": "2025-01-04",
                "userId": "Vlrhh7VMtJMtjgQOj5SUHEd2iIC3"
            }
        ]
     ```

3. **Abrir Chat**  
   - **Endpoint:** `POST /chat`  
   - **Descrição:** Inicia uma sessão de chat utilizando a API do Google GenAI.  
   - **Request Body:**  
     ```json
     {
       "uid": "string",
       "message": "string"
     }
     ```
   - **Resposta:**  
     ```json
     {
        "sessionId": "f557886d-46dd-46e4-99e1-430aa8299079",
        "userId": "Vlrhh7VMtJMtjgQOj5SUHEd2iIC3",
        "messages": [
            {
                "content": "Seu saldo atual é de R$ 7.000,00.\n\nCálculo:\nEntrada total: R$ 10.000,00 (Salário)\nSaída total: R$ 2.000,00 (Aluguel) + R$ 500,00 (Supermercado) + R$ 500,00 (Petshop) = R$ 3.000,00\nSaldo: R$ 10.000,00 - R$ 3.000,00 = R$ 7.000,00\n",
                "timestamp": "2025-01-11T14:17:11.968Z"
            }
        ]
     }
     ```

---

## Configuração

### Dependências

As principais dependências do projeto incluem:

- **Express**: Framework para APIs.  
- **TypeScript**: Superconjunto de JavaScript com tipagem estática.  
- **Mongoose**: ORM para MongoDB.  
- **dotenv**: Gerenciamento de variáveis de ambiente.  
- **@genkit-ai/googleai**: Integração com a API do Google GenAI.  
- **cors**: Middleware para lidar com CORS.


## Design de código e organização das pastas

### Clean Architecture no Projeto

A **Clean Architecture** foi aplicada no projeto para garantir uma separação clara de responsabilidades e facilitar a manutenção, escalabilidade e testabilidade do sistema. A arquitetura é dividida em camadas que se comunicam de forma desacoplada:

1. **Camada de Interface**: Responsável por interagir com o usuário, como os controladores de API (`chat-controller`, `despesa-controller`).
2. **Camada de Aplicação**: Contém os casos de uso e regras de negócio, como `create-chat-use-case` e `create-despesa-use-case`.
3. **Camada de Domínio**: Define os modelos de dados, como a entidade `Despesa`.
4. **Camada de Infraestrutura**: Implementa a persistência dos dados e integrações externas, como os repositórios de `chat` e `despesa`.

### Inversão de Injeção de Dependência

A **Inversão de Injeção de Dependências** é uma prática que visa desacoplar componentes do sistema, onde as dependências são injetadas em vez de serem criadas diretamente nas classes. Isso é alcançado no projeto através de um mecanismo de injeção de dependências usada para passar instâncias de casos de uso e repositórios para os controladores (`chatController`, `despesaController`).

````
src/
├── application/
│   ├── repositories/
│   │   ├── chat-repository.ts
│   │   └── despesa-repository.ts
│   ├── usecases/
│   │   ├── create-chat-use-case.ts
│   │   ├── create-despesa-use-case.ts
│   │   └── get-despesas-by-user-use-case.ts
├── domain/
│   └── despesa.ts
├── infrastructure/
│   ├── database/
│   │   ├── connection.ts
│   │   ├── model.ts
│   │   └── repository.ts
│   ├── genai/
│   │   ├── connection.ts
│   │   └── repository.ts
│   └── utils/
│       └── config.ts
├── interface/
│   ├── chat-controller.ts
│   ├── despesa-controller.ts
│   └── index.ts

````
