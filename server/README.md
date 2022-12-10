![Logo do projeto](https://github.com/CaioDev19/DinDin/blob/main/client/src/assets/images/logo.svg)

# Api Dindin - Aplicação para controle financeiro

## Features

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Listar transações
- Detalhar transação
- Cadastrar transação
- Editar transação
- Remover transação
- Obter extrato de transações
- Filtrar transações por categoria

## **Endpoints**

---

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email (E-mail informado deve ser único)
  - senha

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "Caio",
    "email": "caio@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 201
{
    "id": 1,
    "nome": "Caio",
    "email": "caio@email.com"
}
```

```javascript
//HTTP STATUS 403
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

---

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "caio@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 200
{
    "usuario": {
        "id": 1,
        "nome": "Caio",
        "email": "Caio@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
//HTTP STATUS 401
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigem o token de autenticação do usuário logado, que deve ser enviado pelo header da requisição com o formato Bearer Token.

---

### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo da requisição.

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 200
{
    "id": 1,
    "nome": "Caio",
    "email": "caio@email.com"
}
```

```javascript
//HTTP STATUS 401
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

---

### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email (E-mail deve ser único.)
  - senha

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "Caio",
    "email": "caio@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
//HTTP STATUS 403
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

---

### **Listar categorias**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 200
;[
  {
    id: 1,
    descricao: "Roupas",
  },
  {
    id: 2,
    descricao: "Mercado",
  },
]
```

```javascript
//HTTP STATUS 200
;[]
```

---

### **Listar transações do usuário logado**

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.

- **Requisição**  
   Parâmetro opcional do tipo query **filtro**..  
   Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /transacao ou  GET /transacao?filtro[]=roupas&filtro[]=salários
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 200
;[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23T15:35:00.000Z",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Salário",
    valor: 300000,
    data: "2022-03-24T15:30:00.000Z",
    usuario_id: 5,
    categoria_id: 6,
    categoria_nome: "Salários",
  },
]
```

```javascript
//HTTP STATUS 200
;[]
```

---

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.

- **Requisição**  
   Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
   O corpo (body) da requisição não deverá possuir nenhum conteúdo.

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 201
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
//HTTP STATUS 201
{
    "mensagem": "Transação não encontrada."
}
```

---

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor (Precisa ser um valor positivo e em centavos.)
  - data (Precisa estar no formato dd/MM/yyyy)
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 201
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
//HTTP STATUS 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

---

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.

- **Requisição**  
   Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
   O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor (Precisa ser um valor positivo e em centavos.)
  - data (Precisa estar no formato dd/MM/yyyy)
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
//HTTP STATUS 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

---

# Pessoa B

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.

- **Requisição**  
   Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
   O corpo (body) da requisição não deverá possuir nenhum conteúdo.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
//HTTP STATUS 400
{
    "mensagem": "Transação não encontrada."
}
```

---

# Pessoa A

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.

- **Requisição**  
   Sem parâmetros de rota ou de query.  
   O corpo (body) da requisição não deverá possuir nenhum conteúdo.

#### **Exemplo de requisição**

```javascript
// GET /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
//HTTP STATUS 200
{
 "entrada": 300000,
 "saida": 15800
}
```

---

## Contato

- Email: caiooliveira9.co@gmail.com
- LinkedIn: https://www.linkedin.com/in/caio-araújo-416815243/

## Autor

**Caio Oliveira de Araújo**

##
