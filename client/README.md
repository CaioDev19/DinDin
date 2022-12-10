![Logo do projeto](https://github.com/CaioDev19/DinDin/blob/main/client/src/assets/images/logo.svg)

# Front end Dindin - Aplicação para controle financeiro

---

## Desenvolvimento

#### Styles / Layout:

- As interfaces da plataforma Dindin foram projetadas seguindo o seguinte [layout](https://www.figma.com/file/BwOAJkF8OeMON36TyFdhkj/DinDin-2.0?node-id=0%3A1).
- Todas as páginas foram desenvolvidas com responsividade até 350px.
- A aplicação está utilizando seu próprio guia de estilos, com styled components, desta forma tornando a aplicação bem maleável a mudaças de estilo e a revisões de código.
- As animações foram feitas com a ajuda da biblioteca Framer-motion.

**IMPORTANTE**: Guia de estilos se encontra na pasta global.

#### Toasts:

- Implementados com a biblioteca react-toastify.

#### Validações:

- As validações foram feitas com a biblioteca yup, em conjunto com react-hook-forms, com o objetivo de garantir que o usuário está enviando os dados da maneira correta.

**IMPORTANTE**: Schema para validações se encontram na pasta './utils/validators.'

#### Performance:

- A Solicitação de dados está sendo feita pelo axios em conjunto com o React Query, que remove completamente a necessidade de colocar os dados remotos dentro do estado global. O React Query também remove a necessidade dos hooks useState e useEffect e os substitui por algumas linhas de lógica do React Query. A longo prazo, isso definitivamente ajudará à aplicação a se manter sustentável, responsiva e rápida.

- Utilização de useMemo, useCallBack e hooks personalizados para evitar renderizações desnecessárias

---

## Interfaces

### Login de usuário:

## ![](https://i.imgur.com/vvnluj6.png)

---

### Cadastro de um novo usuário:

![](https://i.imgur.com/BZNNvti.png)

---

### Página principal (main):

![](https://i.imgur.com/SYm8uuY.png)

---

### Cadastro de uma nova transação:

Para cadastrar uma nova transação o usuário deverá clicar no botão `Adicionar Registro`, que ficará logo abaixo da área de `resumo`.

![](https://i.imgur.com/10q85lh.png)

Ao clicar no referido botão, um modal com a opção de adicionar informações de uma transação será exibido:

![](https://i.imgur.com/qMegn2n.png)

---

# Pessoa B

### Editar uma transação:

Para editar uma transação o usuário deverá clicar no ícone do lápis, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/iFD6G3k.png)

Ao clicar no ícone de editar uma transação, o modal para edição do registro será aberto.

![](https://i.imgur.com/UGQ9uda.png)

---

# Pessoa B

### Excluir uma transação:

Para excluir uma transação o usuário deverá clicar no ícone da lixeira, que se encontrará na tabela de listagem de transações:

![](https://i.imgur.com/crhos7x.png)

Esse ícone => ![](https://i.imgur.com/X6GB3kh.png)

Ao clicar nesse ícone, um "popup" irá aparecer para que o usuário confirme ou não a exclusão, fazendo com que não hajam exclusões por engano, veja abaixo como aparece o "popup":

![](https://i.imgur.com/Ohhk1lhm.png)

---

### Filtros:

Veja abaixo o botão que exibe/oculta a área de filtros:

![](https://i.imgur.com/GCsalqk.png)

Os filtros servem para dar granularidade aos dados, ou seja, para haver a possibilidade de exibir as transações conforme selecionamos requisitos para tal. Por exemplo, se disseremos que deve-se exibir apenas as transações da categoria **Depósito**, devemos listar na tabela somente as transações que pertencem àquela categoria.

![](https://i.imgur.com/YzXbttF.png)

Os filtros são cumulativos, ou seja, você pode filtrar por uma categoria ou por diversas categorias.

O funcionamento dos filtros segue a seguinte ordem:

1. Seleciona-se os filtros de categoria
2. Após selecionar os filtros desejados, clica-se no botão **aplicar filtros**.

Para limpar os filtros atuais, o usuário deverá clicar no botão **limpar filtros**

---

### Editar perfil de usuário:

No header da aplicação existe um ícone:

![](https://i.imgur.com/q6MS5wi.png)

Ao clicar nesse ícone, será exibido um modal para edição do usuário logado.

![](https://i.imgur.com/aWx7T9C.png)

---

### Logout e nome de usuário

![](https://i.imgur.com/Njzp33e.png)

---

## Contato

- Email: caiooliveira9.co@gmail.com
- LinkedIn: https://www.linkedin.com/in/caio-araújo-416815243/

---

## Autor

**Caio Oliveira de Araújo**

##
