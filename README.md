Pasos para levantar el servidor:

docker-compose up --build # levantar docker

docker network inspect ecommerce-net # Verifica la Conexión

en caso despues de Verifica la Conexión, no hay conexión entre la api y la base de datos:
docker network create ecommerce-net # crear la red
docker network connect ecommerce-net ecommerce-mysql # agregar a la red la bd (contenedor)
docker network connect ecommerce-net ecommerce-service # agregar a la red el servicio (contenedor)

docker restart ecommerce-mysql ecommerce-service # Reinicia los Contenedores

docker network inspect ecommerce-net # Verifica la Conexión

Colección de postman para probar los endpoint está en carpeta postman_collections