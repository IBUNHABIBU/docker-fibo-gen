connecting to postgres db
psql -U username -d db-name



 ` ERROR (SSHKit::Command::Failed): Exception while executing on host 45.92.9.7: docker exit status: 1`
`docker stdout: Nothing written`
`docker stderr: Error: target failed to become healthy`


deployer@vmi1909189:~$ docker ps -a
CONTAINER ID   IMAGE                                                              COMMAND                  CREATED         STATUS                          PORTS                                      NAMES
0ac2456d4ce1   ibunhabibu/contaborails:3be622529bb7fb61db02eab59330432c809acace   "/rails/bin/docker-e…"   2 minutes ago   Exited (1) About a minute ago                                              contaborails-web-3be622529bb7fb61db02eab59330432c809acace
b820408ba640   postgres:15                                                        "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes                    5432/tcp, 0.0.0.0:5433->5433/tcp           contaborails-db
035d87a3ad86   basecamp/kamal-proxy:v0.8.2                                        "kamal-proxy run"        4 hours ago     Up 2 hours                      0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   kamal-proxy
`


docker logs 0ac2456d4ce1
bin/rails aborted!
ActiveRecord::DatabaseConnectionError: There is an issue connecting with your hostname: 45.92.9.7. (ActiveRecord::DatabaseConnectionError)

Please check your database configuration and ensure there is a valid connection to your database.


Caused by:
PG::ConnectionBad: connection to server at "45.92.9.7", port 5433 failed: server closed the connection unexpectedly (PG::ConnectionBad)
        This probably means the server terminated abnormally
        before or while processing the request.

Tasks: TOP => db:prepare
(See full trace by running task with --trace)
bin/rails aborted!
ActiveRecord::DatabaseConnectionError: There is an issue connecting with your hostname: 45.92.9.7. (ActiveRecord::DatabaseConnectionError)

Please check your database configuration and ensure there is a valid connection to your database.


root@b820408ba640:/# psql -h 45.92.9.7 -p 5432 -U postgres -d writehub_productiondoe
psql: error: connection to server at "45.92.9.7", port 5432 failed: Connection refused
        Is the server running on that host and accepting TCP/IP connections?
root@b820408ba640:/#


Hi folks I have got this error during kamal deployment 
ERROR (SSHKit::Command::Failed): Exception while executing on host 45.92.9.7: docker exit status: 1`
`docker stdout: Nothing written`
`docker stderr: Error: target failed to become health

I tried to check for the logs in the app container if found this error 
docker logs 0ac2456d4ce1
bin/rails aborted!
ActiveRecord::DatabaseConnectionError: There is an issue connecting with your hostname: 45.92.9.7. (ActiveRecord::DatabaseConnectionError)

Please check your database configuration and ensure there is a valid connection to your database.


Caused by:
PG::ConnectionBad: connection to server at "45.92.9.7", port 5433 failed: server closed the connection unexpectedly (PG::ConnectionBad)
        This probably means the server terminated abnormally
        before or while processing the request.

Tasks: TOP => db:prepare
(See full trace by running task with --trace)
bin/rails aborted!
ActiveRecord::DatabaseConnectionError: There is an issue connecting with your hostname: 45.92.9.7. (ActiveRecord::DatabaseConnectionError)

Please check your database configuration and ensure there is a valid connection to your database.

then i logged in the database container and try this command 

root@b820408ba640:/# psql -h 45.92.9.7 -p 5432 -U postgres -d writehub_productiondoe
psql: error: connection to server at "45.92.9.7", port 5432 failed: Connection refused
        Is the server running on that host and accepting TCP/IP connections?
root@b820408ba640:/#

Any help please.

here is my deploy.yml 

# Name of your application. Used to uniquely configure containers.
service: contaborails

# Name of the container image.
image: ibunhabibu/contaborails

# Deploy to these servers.
servers:
  web:
    - 45.92.9.7

proxy: 
  ssl: true
  host: habibtech.online
  # Proxy connects to your container on port 80 by default.
  # app_port: 3000

# Credentials for your image host.
registry:
  username: ibunhabibu
  password:
    - KAMAL_REGISTRY_PASSWORD

# Configure builder setup.
builder:
  arch: amd64

env:
  clear:
    DB_HOST: 45.92.9.7
  secret:
    - RAILS_MASTER_KEY
    - POSTGRES_USER
    - POSTGRES_PASSWORD

ssh:
  user: deployer

accessories:
  db:
    image: postgres:15
    host: 45.92.9.7
    port: 5433:5433  # Ensure this is the correct port or change it to 5432 if needed
    env:
      clear:
        POSTGRES_USER: 'postgres'
        POSTGRES_DB: 'writehub_production'
      secret:
        - POSTGRES_USER
        - POSTGRES_PASSWORD
    files:
      - config/init.sql:/docker-entrypoint-initdb.d/setup.sql
