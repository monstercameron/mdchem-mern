# Mdchem
## Web Links:
* https://www.mdchem.app
## Download The App
* https://play.google.com/store/apps/details?id=com.mdchem&hl=en_US
* https://github.com/tvvizzle/MDChem
## Objectives:
* Player Data CRUD
* Player Data visualization
## Dependencies:
## Setup:
***
## Views
* / (Home Page)
* /admin (Admin Panel)
  * / (dashboard)
  * /students (list of students)
  * /students/:studentId (specified student)
  * /settings (settings)
***
## API:
* Admin => ('/admin')
  * admins      =>  ('/', POST)
  * logs        =>  ('/logs', POST) =>  query(linecount)
* Auth => ('/auth')
  * login       =>  ('/in', POST)   =>  json(email, password)
  * logout      =>  ('/out', POST)  =>  json(email, password)
* Players => ('/players')
  * highscore   =>  ('/highscore', POST)
  * hs update   =>  ('/highscore/update', POST)
  * list        =>  ('/list', POST) => ('/', POST) => json(email/id), query(filter -db object props-) 
* Player => ('/player')
  * create   => ('/', PUT)      =>  json(email, password, class)
  * read     => ('/', POST)     =>  json(email/id)
  * update   => ('/', PATCH)    =>  json(email/id, data)
  * delete   => ('/', DELETE)   =>  json(email/id) 
* Feed => ('/feed')
  * create  => ('/', PUT)       =>  json(date, sender, message)
  * read    => ('/', POST)
  * update  => ('/', PATCH)     =>  json(news id, message)
  * delete  => ('/', DELETE)    =>  json(news id)
* message
  * send
  * inbox
  * delete