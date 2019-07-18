# Mdchem
## Web Links:
* https://www.mdchem.app
## Download The App
* https://play.google.com/store/apps/details?id=com.mdchem&hl=en_US
* https://github.com/tvvizzle/MDChem
## Objectives:
* Admin & Player Authentication
* Player Data CRUD
* Player Data visualization
## Dependencies:
* MongoDB
* Express.Js
* React
* Node.Js
* For node.js Dependencies see package.json
## Setup:
* Download MongoDB https://www.mongodb.com/download-center/community
* Download  Nodejs https://nodejs.org/en/download/
* Clone repo
~~~
git clone https://github.com/monstercameron/mdchem-mern.git
~~~
* Go  into project root directory
~~~
cd mdchem-mern/
~~~
* Setup environment variables, at the root of the project create a .env file
* * create .env file in  terminal
~~~
cat > .env
JWT_SECRET=<yourSecretKey>
MONGO_LOCAL_CONN=<yourMongoDBConnection>
PORT=<yourPort>
~~~
* * or  create  a  .env file in  file  manager and editin text editor
~~~
JWT_SECRET=<yourSecretKey>
MONGO_LOCAL_CONN=<yourMongoDBConnection>
PORT=<yourPort>
~~~
* Install dependencies
~~~
npm i
~~~
* Run backend server locally (from / directory)
~~~
npm start
~~~
* Run react frontend locally (from /views directory)
~~~
cd views/
npm i
npm start
~~~
***
## Views
* / (Home Page)
* /admin (Admin Panel)
  * / (dashboard)
  * /students (list of students)
  * /students/:studentId (specified student)
  * /settings (settings)
* /auth
  * /login (login form)
  * register (registration form)
***
## API:
* Headers => (authorization:jwt)
* Admin => ('/admin')
  * admins      =>  ('/', POST)
  * logs        =>  ('/logs', POST) =>  query(linecount)
* Auth => ('/auth')
  * login       =>  ('/login', POST)    =>  json(email, password)
  * register    =>  ('/register', POST) =>  json(name, email, password, role, recovery question, recovery password)
* Players => ('/players')
  * highscore   =>  ('/highscore', GET)
  * hs update   =>  ('/highscore/update', POST)
  * count       =>  ('/count', GET)
  * list        =>  ('/list', GET) => json(email/id), query(filter -db object props-) 
* Player => ('/player')
  * create   => ('/', POST)     =>  json(email, password, class)
  * read     => ('/', GET)      =>  json(email/id)
  * update   => ('/', PATCH)    =>  json(email/id, data)
  * delete   => ('/', DELETE)   =>  json(email/id) 
* Feed => ('/feed')
  * create  => ('/', POST)      =>  json(date, sender, message)
  * read    => ('/', GET)
  * update  => ('/', PATCH)     =>  json(news id, message)
  * delete  => ('/', DELETE)    =>  json(news id)
* message
  * send
  * inbox
  * delete
***