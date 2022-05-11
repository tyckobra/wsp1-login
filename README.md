# Login

Setup är gjort ```express --no-view --git -css sass``` så kör template och klona.

```bash
cd wsp1-login
npm install
mysql -u user -p database < users.sql
```

## Kravspec

En använda ska kunna logga in med en användare på sidan.
En användare ska kunna logga ut från sin användare.
En användare ska kunna registrera ett nytt konto med användarnamn och lösenord.

* Nytt git repo för gruppen med dokumentation
* Databas, tabell för användare
* Node, express med nunjucks, sass
* Routes enligt REST praxis

## Databas

Databasen för användare finns som dump, ```users.sql```.
Importera, lägg till fält vid behov.

```sql
describe users;
+------------+-----------------+------+-----+-------------------+-------------------+
| Field      | Type            | Null | Key | Default           | Extra             |
+------------+-----------------+------+-----+-------------------+-------------------+
| id         | bigint unsigned | NO   | PRI | NULL              | auto_increment    |
| name       | varchar(100)    | NO   |     | NULL              |                   |
| password   | varchar(255)    | NO   |     | NULL              |                   |
| created-at | timestamp       | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updated-at | timestamp       | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+-----------------+------+-----+-------------------+-------------------+
```

För testernas skull finns det en user skapad, test:test.

## Routes

* get register
* post register
* get login
* post login

**requires auth**
* post logout
* get profile

# Tester

I detta repo finns ett antal tester som ska utföras.
Kommandon för att köra alla tester eller specifika tester är som följer.

```bash
npm run test
npm run test register
```

# Arbetsgång

Arbetet är uppdelat i följande huvudmoment, de består i sin tur av ett antal delmoment.

1. Setup
2. Planering
3. Utveckling
4. Koda
5. Extra

Ni kommer att få instruktioner tilldela till er grupp. Varje del kommer att stämmas av med tillhörande tester. När detta är klart så är ni redo att gå vidare till nästa steg. 

## Tester

Arbetet ni utför är att möta specifika krav från de tester som finns.
För att köra alla tester en gång, använd:
```bash	
npm run test
```
Mer användbar är att starta tester med watch:
```bash
npm run test:watch
```
Detta kommer att köra alla tester först. Ni kan sedan välja att filtrera vilka tester som ska köras. För att göra det så väljer ni ```p``` och skriver testets namn. För det här projektet finns följande tester:
* 1-server
* 2-login
* 3-auth
* 4-register

