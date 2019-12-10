<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png?raw=true" width="200px" />
</h1>
<p align="center"><i>Image made by <a href="https://rocketseat.com.br/">Rocketseat</a></i></p>

# **GymPoint**
GymPoint - Aplicação construída para o GoStack Bootcamp desafio final. :rocket:

A Aplicação é composta por 3 projetos, back-end, web e mobile para controle e interação entre uma academia e seus alunos.

É possível realizar login, matrículas, planos e pedidos de auxílio.
Notificações por email a cada matrícula e resposta ao pedido de auxílio.


## **Começando**

Siga as instrução abaixo para rodar esta aplicação em sua máquina.

### Pré-requesitos

É necessário ter os requesitos abaixo instalados em sua máquina.

- [NodeJS](https://nodejs.org/en/) - Environment runtime
- [Yarn](https://yarnpkg.com/en/docs/install) - Gerenciador de Pacotes
- [Docker](https://docs.docker.com/install/) - Criação de containers

### **Criação Requesitos com Docker**
Banco de Dados Postgres
```docker
docker run --name gympoint -e POSTGRES_PASSWORD=gympoint -p 5432:5432 -d postgres
```
Banco de Dados Redis
```docker
docker run --name some-redis -p 6379:6379 -d redis:alpine
```
Banco de Dados MongoDB
```docker
docker run --name some-mongo -p 27017:27017 -d mongo
```
### **Clonar repositório**

**GIT**
```git
git clone https://github.com/nilbersilva/gostack-gympoint
```


## **Backend**
Clonar arquivo .env.example para .env e alterar arquivo conforme necessário.

Instalar suas dependências, migrations, seeds do banco de dados e iniciar api e serviço bee-queue
```js
cd backend
yarn
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn queue
yarn dev
```

**URL Api**

No projeto Frontend e Mobile será necessário informar o URL da API em /src/services/api.js no baseURL

## **Frontend**
Instalar suas dependências e iniciar serviço
```js
cd frontend
yarn
yarn start
```
Utilizar usuário e senha criados no seed

Usuário: admin@gympoint.com

Senha: 123456

## **Mobile** (Apenas Android)
É necessário ter um emulador Android ou um Dispositivo Android conectado à sua máquina.

Instalar suas dependências e iniciar serviço.
```js
cd mobile
yarn
yarn android
```

## Construido com
* [Node.JS](https://nodejs.org/en/) - utilizado no Backend
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [dotenv](https://github.com/motdotla/dotenv#readme)
* [date-fns](https://date-fns.org/)
* [JWT Tokens](https://jwt.io/)
* [Node Mailer](https://nodemailer.com/about/)
* [Bee Queue](https://bee-queue.com/)
* [bcrypt](https://github.com/dcodeIO/bcrypt.js/)
* [express-handlebars](https://github.com/ericf/express-handlebars)
* [ReactJS](https://pt-br.reactjs.org/) - utilizado no Frontend
* [React Native](https://facebook.github.io/react-native/) - utilizado no Mobile
