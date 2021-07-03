## Challenge Funcional Health Tech ##
Desafio proposto no processo de contratação de Desenvolvedor Backend Jr Nodejs.

## Ferramentas utilizadas ##

Para a conclusão deste desafio, as ferramentas abaixo foram aplicadas:

- [node.js] - Eventos voltados para o Backend
- [express] - Framework
- [prisma] - ORM responsável pela Conexão com o Banco de Dados
- [postgresql] - Sistema gerenciador de Banco de Dados


## Comandos Úteis para uso da Aplicação ##

## Development Server

Iniciar o Servidor da Aplicação
```
    $ yarn dev
```

## Docker

Subir as configurações do container
```
    $ docker-compose up
```

## Prisma

Iniciar Migration
```
    $ yarn migrate
```
Enviar dados de Teste
```
    $ node prisma/seed.js
```

[//]:#

[node.js]: <http://nodejs.org>
[express]: <https://expressjs.com/>
[prisma]: <https://www.prisma.io/>
[postgresql]: <https://www.postgresql.org/>