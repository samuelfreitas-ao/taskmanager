# Sistema de gestão de tarefas

O sistema é desenvolvildo em Laravel (backend) e Reactjs (frontend). Permite lidar com recursos de tarefas armazenadas em um banco de dados MySQL.

## Como instalar o projecto?

Executar os comandos:

1. `git clone https://github.com/samuelfreitas-ao/taskmanager.git`: Vai clonar (baixar) o projecto no seu computador
2. `composer update`: Instala todas as dependências php para Laravel
3. `yarn` ou `npm install`: Instala todas as dependências Javascript para suporte do Reactjs

Copie o ficheiro `.env.exemple` para `.env`:

## Como executar o projecto?

1. Crie um banco com o nome conforme no ficheiro `.env` em `DB_DATABASE`.

Execute os seguintes comandos:

1. `php artisan migrate:fresh`: Cria toda a estrutura do banco de dados como definida no ficheiro _database/migrations_.
2. `php artisan serve`: Inicia o servidor php para executar o projecto, o poderá ser acedido via http://127.0.0.1:8000
3. `yarn dev` ou `npm run dev`: Compila o código do reactjs convertendo em javascript puro para ser usado no projecto.
