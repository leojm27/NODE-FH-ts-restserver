# TS-RESTSERVER

## Pasos para configurar proyecto
1. crear package.json -> npm init -y
2. crear archivo de configuraciones de TS -> tsc -init
3. validar parametros del tsconfig habilitados.
4. ejecutar 'tsc' para generar la transpilacion a JS en la carpeta /dist
5. levantar proyecto con node dist/app.js
6. estandares de desarrollo -> npm i tslint --save-dev
7. instalar ts en el proyecto -> npm i typescript --save-dev
8. inicializar tslint -> ./node_modules/.bin/tslint --init
9. ejecutar proyecto -> node dist/app.js# NODE-FH-ts-restserver


## Ejecutar Proyecto
1. tsc -> para transpilar ts a js en la carpeta /dist.
2. nodemon dist/app.js -> ejecutar proyecto.
3. tsc --watch -> actualiza cualquier cambio que haga en el proyecto.


