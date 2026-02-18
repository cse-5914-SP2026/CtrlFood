# Ctrl(F)ood

TODO

## Instructions to setup Docker:

Download here: https://www.docker.com/products/docker-desktop/

Double click .exe and follow instructions with defaults,

Restart computer. Navigate to `general/init-readme` then try command `docker`

If that works then try `docker-compose up`

Other useful commands: `docker ps` --- shows the containers running
`docker-compose up --build` will build the docker files
`docker-compose down` makes the containers stop running
`docker volume ls` lists the volumes made by docker
`docker compose down -v` removes containers and destroy associated volumes

FastAPI built in docs at: http://localhost:8000/docs
Kibana docs for elasticsearch at: http://localhost:5601

## Notes About Local Dev:

The FastAPI files are mounted to the container thus changes you make on local machine will reflect in the container and it will automatically restart the server with your new changes (only for changes in the backend folder)

Local instance of Elastic search has a persistent volume managed by Docker so if you save data this one time and you dont delete the image then next time es will load in all of that data. Refer to the useful command section for how to manage the es_data storage.

FastAPI built in docs at: http://localhost:8000/docs
Kibana docs for elasticsearch at: http://localhost:5601

Remake data: `curl -X DELETE "localhost:9200/foods" && curl "localhost:8000/insert"`
## To Start Docker Env

docker compose up --build -d

## To Get Data

docker compose exec api python elastic_search/insert_data.py

## To Search Through Terminal

curl -X GET "http://localhost:9200/foods/\_search?pretty" \  
 -H "Content-Type: application/json" \
 -d '{
"query": {
"match": {
"name": "waffle"
}
}
}'

## To Search Through UI

cd frontend
npm run dev
