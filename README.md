# Accessify API

Accessify API és un servei desenvolupat amb Node.js, TypeScript i KOA.js per gestionar usuaris i permisos d'una aplicació web. Utilitza MySQL com a base de dades.

## Característiques

- Gestor d'usuaris amb autenticació.
- Administració de rols i permisos.
- API RESTful amb respostes estructurades.
- Desenvolupat amb TypeScript per una millor mantenibilitat.
- Middleware per a validació i gestió d'errors.
- Gestor de tokens d'accés mitjançant JWT (JSON Web Tokens).

## Requeriments

- Node.js 18+
- MySQL 8+
- npm o yarn

## Instal·lació

1. Clonar el repositori:
   ```sh
   git clone https://github.com/el-teu-usuari/accessify_api.git
   cd accessify_api
   ```

2. Instal·lar dependències:
   ```sh
   npm install
   ```

3. Configurar les variables d'entorn:
   Crea un fitxer `.env` a la raita del projecte i afegeix-hi la configuració necessària:
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
   Importa i executa l'script `accessify_db.sql` utilitzant un gestor de bases de dades com MySQL Workbench o la línia de comandes. L'script es troba dins la carpeta `sql_scripts` a l'arrel del projecte.
   ```sh
   mysql -u usuari -p accessify_db < sql_script/accessify_db.sql
   ```

5. Executar migracions de base de dades (si s'utilitza un ORM com TypeORM o Sequelize):
   ```sh
   npm run migrate
   ```

6. Iniciar el servidor:
   ```sh
   npm run dev
   ```

## Rutes Principals

- `POST /api/auth/login` - Autenticació d'usuaris.
- `GET /api/users` - Llistar usuaris.
- `POST /api/users` - Crear un nou usuari.
- `GET /api/roles` - Llistar rols.
- `POST /api/roles` - Crear un nou rol.
- `GET /api/permissions` - Llistar permisos.
- `POST /api/permissions` - Assignar permisos a rols.

## Contribuir

Les contribucions són benvingudes! Fes un `fork` del repositori i envia una `pull request`.

## Llicència

Aquest projecte està llicenciat sota la [MIT License].

