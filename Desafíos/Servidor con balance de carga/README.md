<!-- ----------------------------------------------------------------------- -->
<!--                                 Nodemon                                 -->
<!-- ----------------------------------------------------------------------- -->

<!-- Modo Fork -->

nodemon app.js

<!-- Modo Cluster -->

nodemon app.js --MODO cluster

<!-- Para verificar procesos de node (en powershell) -->

tasklist /fi "imagename eq node.exe"

<!-- ----------------------------------------------------------------------- -->
<!--                                 Forever                                 -->
<!-- ----------------------------------------------------------------------- -->

<!-- Inicia 2 procesos (el primero de modo Fork y el segundo de modo Cluster) -->

forever start app.js --PORT 8080
forever start app.js --PORT 8083 --MODO cluster

<!-- Listar todos los procesos -->

forever list <!-- en forever -->
tasklist /fi "imagename eq node.exe" <!-- en sistema operativo -->

<!-- Detiene todos los procesos -->

forever stopall

<!-- ----------------------------------------------------------------------- -->
<!--                                   PM2                                   -->
<!-- ----------------------------------------------------------------------- -->

<!-- Inicia el proceso en FORK -->

pm2 start app.js --name="server-FORK" --watch -- 8080

<!-- Inicia el proceso en CLUSTER -->

pm2 start app.js --name="server-CLUSTER" --watch -i max -- 8081

<!-- Lista todos los procesos -->

pm2 list

<!-- Elimina el proceso en FORK -->

pm2 delete server-FORK

<!-- Elimina todos los procesos en FORK -->

pm2 delete server-CLUSTER

<!-- ----------------------------------------------------------------------- -->
<!--                                  Nginx                                  -->
<!-- ----------------------------------------------------------------------- -->

<!-- Crea cluster de servidores en /api/randoms/ -->

forever start appCluster.js --PORT 8081

<!-- Crea servidor individual el resto de las consultas -->

forever start app.js --PORT 8080

<!-- Activar nginx.exe -->

<!-- Crea 4 puertos a /api/randoms -->

forever start appCluster.js --PORT 8082
forever start appCluster.js --PORT 8083
forever start appCluster.js --PORT 8084
forever start appCluster.js --PORT 8085

<!-- Para verificar el balanceador de carga -->

http://localhost/api/randoms/
