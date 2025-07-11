# NLW Agents 

## Aula #01 - Setup do back-end Node.js e front-end React - Trilha intermediária

> Nesta aula, vamos construir a base completa de uma aplicação full-stack, do zero! Utilizaremos como inspiração o Let Me Ask, projeto desenvolvido em outra NLW. No back-end, vamos estruturar uma API robusta com Node.js e Fastify, garantindo a qualidade do código com Biome e a segurança com validações usando Zod e variáveis de ambiente.

> Além disso, vamos preparar nosso banco de dados com Docker e PostgreSQL. No front-end, vamos criar uma interface com React, Vite, Tailwind CSS e shadcn/ui. Também vamos aprender a gerenciar a navegação com React Router DOM e a consumir os dados da nossa API de forma eficiente utilizando React Query. Ao final, teremos um projeto full-stack sólido e escalável, pronto para as próximas funcionalidades.


#### Pré Requisitos:

- Node.js (LTS Version) [Dicas de Instalação](https://efficient-sloth-d85.notion.site/Instalando-Node-js-e-npm-21c395da5770805cb408cdb3318bb544)
- Typescript
- Types / node 
- Docker - [Dicas de Instalação](https://efficient-sloth-d85.notion.site/Windows-21c395da577081389b58f07c145149ba)

**Passo 01 - Inicializando o Projeto :**

- Crie uma pasta do projeto e a seguir crie uma pasta chamada ```server```; 

- Abra a pasta dentro de uma IDE de preferência o VS Code;

- Rode e inicie o ```NPM``` dentro do terminal, onde será criado o arquivo ```package.json```;

```
npm init -y

```

![img_01](./img/img_01.png)

- Instale os pacotes ```Typescript``` e o ```types/ node```

```
npm i typescript @types/node -D

```

![img_02](./img/img_02.png)

- Rode o Comando abaixo, para criar um arquivo ```tsconfig.json``` 


```
npx tsc --init
```

![img_03](./img/img_03.png)


### **Passo 02 - Configurando o Node**

- Localize no Google o repositório do arquivo [tsconfig bases](https://github.com/tsconfig/bases)

- Localize a **versão do Node** o qual você esteja utilizando no momento do desenvolvimento deste projeto. Neste caso estou utilizando a versão 22.

![img_04](./img/img_04.png)

- Abra o arquivo ```tsconfig.json``, na imagem abaixo podemos verificar que o mesmo possui todos os pacotes disponíveis para instalação.

![img_05](./img/img_05.png)


- A seguir copie e cole o script do site  ```tsconfig```  substituindo o script com todos os pacotes.


![img_06](./img/img_06.png)

- Adicione ao arquivo ```tsconfig.json``` os scripts abaixo

```
"noEmit": true, // Faz a checagem de tipos ( não iremos buildar o type para Javascrip, pois o node já possui suporte nativo ao Javascript)

"allowImportingTsExtensions": true, // permite importações de arquivo typescript no tsconfig

```
![img_07](./img/img_07.png)

- No arquivo ```package.json``` adicione o script abaixo, para permitir importações do tipo module (echma) e não apenas do tipo common.js comum no Node. 


![img_08](./img/img_08.png)


```
 "type": "module", 

```

### **Passo 03 - Configurando Bibliotecas do Servidor HTTP**

- Instale as bibliotecas abaixo:
    - cors: medida de segurança, onde iremos definir quais urls e demais acesso poderão consumir a nossa api
    - zod : Validação


```
npm i fastify @fastify/cors fastify-type-provider-zod zod

```
![img_09](./img/img_09.png)

- Na pasta server crie uma nova pasta chamada ```src```, a seguir um arquivo chamado ```server.ts```

- No arquivo ```server.ts``` importe as bibliotecas:


```
import { fastify } from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { fastifyCors } from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
    origin: 'http://localhost:5173',  // ou user * para permitir que qq endereço acesse
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({port: 3333}).then(() => {
    console.log('HTTP server running! ')
})

```

- A seguir acesse o arquivo ```package.json``` e substitua o scrip abaixo para o script a seguir:

![img_10](./img/img_10.png)

Substitua por :

```
  "dev": "node --experimental-strip-types src/server.ts"

 //como o nosso projeto está em typescript precisamos utilizar o -experimental-strips-types, senão gerão gerados erros

```

![img_11](./img/img_11.png)

E rode o comando:

```
npm run dev
```

#### Atenção:

Será necessário inserir no arquivo ```server.ts``` o **type** no ```ZodTypeCompiler```, pois o import do node não o reconhece como tipo,se não for mencionado gerando um erro ao rodar o npm. 

```
type ZodTypeProvider,

``` 

![img_12](./img/img_12.png)

```
npm run dev
```

- Conseguimos identificar que o servidor está rodando, após a nossa mensagem de configuração se destacar.

![img_13](./img/img_13.png)

##### Dica:

Para evitar que fique aparecendo mensagens de alerta (warnings) durante a execução, adicione o no warnings no arquivo ```server.ts```.

```
  "dev": "node --experimental-strip-types --no-warnings src/server.ts"
```

![img_14](./img/img_14.png)


- Ainda no arquivo ```package.json``` rambém posso inserir um comando ```--watch``` no script para que seja refletida toda a alteração que eu realizar ao executar o npm, 

***Também posso inserir um comando para que ao rodar a aplicação em produção o mesmo não reflita de as **alterações realizadas no servidor**.*** 

```

"start": "node --experimental-strip-types --no-warnings src/server.ts",

"dev": "node --experimental-strip-types --no-warnings --watch src/server.ts"

```

![img_15](./img/img_15.png)


### **Passo 04 - Configurando Variáveis de Ambiente**

- Crie um arquivo ```.env``` ainda dentro da pasta ```server``` e informe a porta que será utilizada.


![img_16](./img/img_16.png)

- A seguir, configure a porta no arquivo ```server.ts``` e no arquivo ```package.json```, conforme as imagens e scripts abaixo:

Neste caso foi inserido um comando para que a porta identifique um número e uma mensagem informando o número da porta encontrado. 

```

app.listen({port: process.env.PORT ? Number(process.env.PORT) : 3333 }).then(() => {
console.log(`Port: ${process.env.PORT}`)
console.log('HTTP server running meus Bacanos!!') 

```

![img_17](./img/img_17.png)

- Para que a porta seja reconhecida, será necessário inserir no arquivo ```package.json``` o arquivo ```.env```.

```
"scripts": {
    "start": "node --env-file .env --experimental-strip-types --no-warnings src/server.ts",
    "dev": "node --env-file .env --experimental-strip-types --no-warnings --watch src/server.ts"
  },

```

![img_18](./img/img_18.png)


Conforme a imagem abaixo, podemos identifica a mensagem de confirmação da execução do servidor e da porta configurada. 


![img_19](./img/img_19.png)

### **Passo 05 - Validação das Variáveis de Ambiente**

- Crie um arquivo ```env.ts``` dentro da pasta ```src```.
para garantir que a nossa aplicação rode com as variáveis de ambiente obrigatórias.


![img_20](./img/img_20.png)

```
import { z } from 'zod'
import { property } from 'zod/v4'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333), // o coerce é um comando zod que converte o valor de uma string para número, pois o objeto de z é uma string
})

export const env = envSchema.parse(process.env) //exporto a constante env, o meu process.env será as minhas portas


```
- Após configuração substitua no arquivo ```server.ts``` o script referente à porta. 


![img_21](./img/img_21.png)

```
app.listen({ port: env.PORT }).then(() => {
    console.log(`Port: ${process.env.PORT}`)
    console.log('HTTP server running meus Bacanos!!') 

```

- A seguir insira um "Health Check" para garantir que o servidor estará rodando sem possíveis erros: 


![img_22](./img/img_22.png)

```

app.get('/health', () => {
    return 'OK'
}

```

**Testando o Health Check** 

Em seu navegador digite a url : [http://localhost:3333/health](http://localhost:3333/health) e verifique se a mensagem de confirmação se a nossa API está rodando OK.


![img_23](./img/img_23.png)


### **Passo 05 - Configurando a Formatação**


- Localize em seu VS Code, na sessão de extensões, os plugins:

 - **Biome**
 - **Custom UI Style** - Deixa o VSCode mais minimalista
 - **REST Client**  - Configuração dE APIs
 - **Tailwind CSS Intellisense** - Utilizado para formação do frontend

 - **Formatador de códigos**:** Configure o **Biome**, rodando o comando abaixo

![img_24](./img/img_24.png)

```
npm i @biomejs/biome - D  // -D de desenvolvimento

```



A seguir localize na documentação do biome um per set [Ultracite](https://www.ultracite.ai/introduction)  pré configurado do biome. 

![img_25](./img/img_25.png)


```
npx ultracite init

```

![img_26](./img/img_26.png)

**Obs:** Durante a configuração será solicitada várias confirmações, que podem ser configuradas, neste caso apenas dei ENTER e segui ser personalizar. 

Após configurar o Biome, o sistema começará a informar alguns erros ou a retirada/inserção de scrips necessários/desnecessários. No arquivo ```server.ts``` foram retirados os scripts ```console.log```.

![img_27](./img/img_27.png)


### **Passo 06 - Configurando o Banco de Dados - Docker**

Para configurar o banco de dados desta app utilizaremos o **Docker** para blindar as dependências. 

- Confirme se você já possui o Docker instalado

```
docker -v

```

- Caso queira confirmar e listar, quais containeres você já possui rodando no seu sistema informe o comando abaixo:

```
docker ps

```

- Para pausar outros conteineres em execução, rode o comando abaixo

```
docker stop

```

- A seguir crie um arquivo ainda dentro da pasta raiz ```server``` chamado ```docker-compose.yml```, neste arquivo serão definidos os serviços/dependências que serão utilizado via docker. 

```
docker stop

```

- Localize no **Docker Hub** a imagem [pgvector](https://hub.docker.com/r/pgvector/pgvector), que já vem configurada para realizar **busca por simiralidades** para utilização de **IA(Busca Semântica(Significado))** através de **vetores (representação numérica do signifcado de algo)**. 



- Ainda no **Docker Hub** , clique na guia **Tags** e escolha a versão mais atual do docker. Ensira essa informação no arquivo ```docker-compose.yml```.

![img_28](./img/img_28.png)

- Configure também as variáveis de ambiente obrigatórias

- Informe nas variáveis de Ambiente, qual o tipo do banco de dados.

- Configure as portas para redirecionamento entre sua máquina e o Docker. 

- Informe os arquivos de configuração 

- Crie uma pasta na raiz do projeto ```server``` , chamada de ```docker``` , dentro dela crie um arquivo chamado ```setup.sql```.

- Aponte o endereço da pasta docker no arquivo ```docker-compose.yml```

```
services:
  nlw-agents-pg:
    image: pgvector/pgvector:pg17
    environment:
      POSTGRES_USER: docker
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: agents
    ports:
      - "5432:5432"
    volumes:
      - ./docker/setup.sql:/docker-entrypoint-initdb.d/setup.sql     

```

![img_30](./img/img_30.png)

- Ative a extensão de vetores dentro do arquivo ```setup.sql```

```
CREATE EXTENSION IF NOT EXISTS vector;

```
![img_31](./img/img_31.png)

- Para execução rode o comando : 

**Dica:** Como eu já possuia o Docker Desktop, quando tenteu rodar o comando pela primeira vez ele apresentou erro. Então abri o **Docker Desktop** e rodei o comando novamente, o mesmo foi atualizado e o container ```nwl-agent:pg``` foi ativado. 

```
docker compose up -d
```

![img_32](./img/img_32.png)


### **Passo 07 - Configurando Variáveis de Ambiente - .env**

- Abra o arquivo ```.env``` e preencha as variáveis de ambiente obrigatórias. 

```
# HTTP
PORT = 3333

#Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/agents" # Configura no arquivo docker-compose.yml e confira se o número correto de sua porta

```

- Configurando a Conexão com o Bando de dados:

  - Crie dentro da pasta ```src``` uma pasta chamada ```db``` e dentro de db, um arquivo chamado ```connection.ts```.

  - No terminal digite o comando abaixo para realizar a instalação da **bibiloteca postgres**.

  ```
  npm i postgres

  ```
  ![img_33](./img/img_33.png)
  
  - No arquivo ```connection.ts``` preencha as seguintes informações:

  ```
  import postgres from 'postgres'

  ```
- A seguir no arquivo ```env.ts``` adicione dentro do ```const``` as seguintes informações de variáveis de ambiente do banco de dados. 


  ```
  DATABASE_URL: z.string().url().startsWith('postgresql://')

  ```
  A seguir execute o programada:

  ```
  npm run dev

  ```

- Configurando o ***client*** para realização da conexão com o banco de dado externo:

  - No arquivo ```connection.ts``` preencha os campos para conexão do client

  ```
  import postgres from 'postgres'
  import { env } from '../env.ts'

  export const sql = postgres(env.DATABASE_URL) //chamei o client de sql

  const result = await sql`SELECT "Hello" as mensage`

  console.log(result)

  ```

 - No arquivo ```server.ts``` realize as importações da conexão com as informações referentes ao banco de dados. 

