# Sistema de gestão de tarefas

O sistema é desenvolvildo em Laravel (backend) e Reactjs (frontend). Permite lidar com recursos de tarefas armazenadas em um banco de dados MySQL.

## Como instalar o projecto?

Executar os comandos:
1. _git clone https://github.com/samuelfreitas-ao/taskmanager.git_: Vai clonar (baixar) o projecto no seu computador
2. _composer update_: Instala todas as dependências php para Laravel
3. _yarn_ ou _npm instal_: Instala todas as dependências Javascript para suporte do Reactjs

Crie um ficheiro na raíz do projecto com nome _.env_ e coloque as definições predefinidas conforme disponível no ficheiro _.env.exemple_:


## Como executar o projecto?
1. Crie um banco conforme o nome no ficheiro _.env_. DB_DATABASE=_db_taskmanager_

Execute os seguintes comandos:
1. _php artisan migrate_: Cria toda a estrutura do banco de dados como definida no ficheiro _database/migrations_.
2. _php artisan serve_: Inicia o servidor php para executar o projecto, o poderá ser acedido via http://127.0.0.1:8000
3. _yarn dev_ ou _npm run dev_: Compila o código do reactjs convertendo em javascript puro para ser usado no projecto
