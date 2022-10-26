<!-- ----------------------------------------------------------------------- -->
<!--                         --prof y --prof-process                         -->
<!-- ----------------------------------------------------------------------- -->

node --prof app.js

curl -X GET "http://localhost:8080/info"

<!-- Test de carga (10 request con 50 usuarios) -->

artillery quick --count 20 -n 50 "http://localhost:8080/info" > resultados-Artillery.txt

<!-- Resultados -->

1-resultInfo.txt
1-resultInfo2.txt
1-resultInfo3.txt
1-resultInfo4.txt
1-resultInfo5.txt

<!-- Decodifica los archivos log -->

node --prof-process artillery.log > resultadosDecodificados-Artillery.txt

<!-- Resultados -->

resultadoDecodificado.txt
resultadoDecodificado2.txt

<!-- ----------------------------------------------------------------------- -->
<!--                               Autocannon                                -->
<!-- ----------------------------------------------------------------------- -->

npm i --save autocannon

npm i -g 0x

<!-- Configurar scripts -->

"test": "node benchmark.js" <!-- Usar api para realizar test de carga en Autocannon -->
"start": "node app.js" <!-- Usar con server normal -->

<!-- Pasos -->

1. npm start
2. curl -X GET "http://localhost:8080/info"
3. npm test
4. Al apagar servidor, se crea una carpeta al azar y diagrama

<!-- ----------------------------------------------------------------------- -->
<!--                     Inspector de Node.js --inspect                      -->
<!-- ----------------------------------------------------------------------- -->

node --inspect app.js

navegador inspector

iniciar profiler

en la consola, correr test de carga artillery

detener profiler
