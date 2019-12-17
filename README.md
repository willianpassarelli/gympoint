<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="logo.png" width="200px" />
</h1>

<h3 align="center">
  back-end / front-end / mobile
</h3>

## 🚀 Desafio bootcamp gostack

Para obter todos os pacotes (server/web/mobile) utilize o comando abaixo.

```
git clone https://github.com/willianpassarelli/gympoint.git
```

### ⚙ Back-end (Arquitetura MVC) -
Construido com Sucrase + Nodemon + Sequelize(PostgreSQL)

Para configurar o banco de dados siga os passos abaixo (necessário possuir o docker instalado em sua máquina)

Rode o seguinte comando para instalar o **postgres** atráves de uma imagem, a senha pode ser alterada e o nome do banco de dados também (no meu caso o nome é database e senha docker).
```
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
Após a instalação abra o seu gerenciador de banco de dados **(utilizo o Postbird)**,
faça a conexão e selecione **Create database** para a criação do banco de dados, coloque o nome (gympoint) e pronto, banco criado.

Também será necessário criar um banco de dados **redis**, neste caso apenas rode o comando e escolha o nome que desejar.

```
docker run --name redisgympoint -p 6379:6379 -d -t redis:alpine
```

Rodando o server -

Entre na pasta server e execute o comando abaixo para obter todas as dependências.
```
yarn install ou npm install
```

Após instalação, entre no arquivo **".env.example"**, apague o **".example"** e faça as configurações coloque a informações necessárias para conexão com o banco.

No projeto também foi utilizado o envio de e-mails, para configurar faça uma caixa de e-mail através do site https://mailtrap.io/, ao efetuar a criação você receberá todos os dados para conexão, onde serão inseridos no arquivo **".env"**.

Para monitoramento de erros, foi utilizado o sentry (https://sentry.io/) faça uma conta, e ao criar um projeto selecione a opção **"Express"**, ele irá passa um link (DSN), copie o mesmo e cole no arquivo **src/config/sentry.js**

Após todas as configurações rode o seguinte comando para criação das tabelas no banco de dados.
```
yarn sequelize db:migrate
```
Se tudo ocorrer bem, ao abrir o **Postbird** irá exibir todas as tabelas ao selecionar o banco "gympoint".

No projeto foi utilizado a autenticação via JWT, para criar um usuário administrador que faz acesso as rotas que apenas o mesmo terá acesso, rode o seguinte comando.

```
yarn sequelize db:seed:all
```

Atualmente existe um arquivo com um email e senha já configurado para esse usuário,
se preferir alterar, acesse a seguinte pasta **src/database/seeds/20191119010017-admin-user.js** e configure o seu usuário como desejar.

Finalmente chegamos a parte em que iremos rodar o servidor, para isso utilize os seguintes comandos.

Obs: no arquivo **src/server.js** é possivel alterar a porta em que seu servidor irá rodar.

**Server:**
```
yarn dev
```
**Queue (Monitoramento de filas):**
```
yarn queue
```

Para iniciar uma sessão como administrador, acesse a rotas abaixo para gerar o token de autenticação.

```
http://localhost:3333/sessions
```
No corpo do envio de requisição (post) coloque o usuário admin gerado. 
```
{
	"email": "admin@gympoint.com",
	"password": "123456"
}
```

Para a utilização das rotas criadas no app, exportei um arquivo **"rotas.json"** (no qual se encontra neste repositório) utilizando o Insomnia.


### 🖥 Front-end (Arquitetura flux) -

A versão web do projeto Gympoint representa a visão da academia, ou seja, todas funcionalidades presentes na versão web são para administradores. As funcionalidades para o aluno serão dispostas no aplicativo mobile.

Para execução do projeto web entre na pasta **"web"**, e utilize o comando abaixo:

```
yarn install ou npm install
```

Após a instalação de todas as dependências entre na pasta **src/services/api.js**
e verifique se a url da baseURL é o mesmo que está rodando o server e após isso rode o seguinte comando abaixo:

```
yarn start
```

Para debug da aplicação foi utilizado o **Reactotron** a configuração do mesmo se encontra na pasta **src/config/ReactotronConfig.js**

### 📱 Mobile (Arquitetura flux) -

A versão mobile do projeto Gympoint representa a visão do aluno, ou seja, todas funcionalidades presentes nesse projeto são para alunos.

O projeto gympoint mobile, foi desenvolvido através do IOS, no caso de android há configurações no qual não realizei para que o mesmo rode 100%, porem é apenas uma questão de dependências que foram utilizadas e que precisam ser configuradas.

Para execução deste projeto, entre na pasta **"mobile"** e rode o seguinte comando para instalação das dependências:

```
yarn install ou npm install
```

Após instalação das dependências, entre na pasta **"ios"** e utilize o comando abaixo:

```
pod install
```
Apenas para certificar que tudo vai rodar corretamente.

Para debug da aplicação foi utilizado o **Reactotron** a configuração do mesmo se encontra na pasta **src/config/ReactotronConfig.js**, porem para o mobile eu rodei minha aplicação via device com wifi, mas também é possivel rodar em emuladores no qual é necessário que nesse arquivo você configure o IP de acordo como você irá executar a aplicação, no meu caso eu utilizei o IP da minha máquina, você também pode tentar opções como **localhost** ou **10.0.2.2**.

A Configuração do ip do server que está rodando se encontra no caminho **src/services/api.js** para este utilizei o caminho do ip da minha máquina, porem também tente opções como **localhost** ou **10.0.2.2**.

Após as configurações rode o seguinte comando para execução do build e instalação em seu device/emulador.

```
react-native run-android ou react-native run-ios
```

## Dúvidas

Para quaisquer problemas ou identificações de bugs abra uma nova issue neste repositório. 

## 📝 Licença

Esse projeto está sob a licença MIT.

---
