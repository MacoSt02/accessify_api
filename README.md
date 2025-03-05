# Accessify API

Accessify API és un servei desenvolupat amb Node.js, TypeScript i KOA.js per gestionar usuaris i permisos d'una aplicació web. Utilitza MySQL com a base de dades.

## Característiques

- Gestor d'usuaris amb autenticació.
- Administració de rols i permisos.
- API RESTful amb respostes estructurades.
- Middleware per a validació i gestió d'errors.
- Gestor de tokens d'accés mitjançant JWT (JSON Web Tokens).

## Requisits

- Node.js 18+
- MySQL 8+
- npm o yarn

## Instal·lació

1. Clonar el repositori:
   ```sh
   git clone https://github.com/MacoSt02/accessify_api.git
   cd accessify_api
   ```

2. Instal·lar dependències:
   ```sh
   npm install
   ```

3. Configurar les variables d'entorn:
   Crea un fitxer `.env` a l'arrel del projecte i afegeix-hi la configuració necessària:
   ```env
   PORT=3030
   NODE_ENV=dev

   DB_HOST=localhost
   DB_USER=usuari
   DB_PASSWORD=contrasenya
   DB_NAME=accessify_db
   
   JWT_SECRET=clau_secreta
   ```

4. Instal·lar la base de dades:
   Importa i executa l'script `accessify_db.sql` utilitzant un gestor de bases de dades com MySQL Workbench, DBeaver o la línia d'ordres. L'script es troba dins la carpeta `sql_scripts` a l'arrel del projecte.
   ```sh
   mysql -u usuari -p accessify_db < sql_script/accessify_db.sql
   ```

6. Iniciar el servei:
   ```sh
   npm run start:dev
   ```

## Rutes Principals

- `POST /signup` - Creació d'usuaris.
- `POST /login` - Iniciar sessió.
- `POST /logout` - Tancar sessió.
- `GET /users` - Llistar usuaris.
- `GET /roles` - Llistar rols.
- `GET /permissions` - Llistar permisos.

## Llicència

Aquest projecte està llicenciat sota la [MIT License].