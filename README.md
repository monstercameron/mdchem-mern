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
* Admin
  * admins
  * logs
* Auth
  * login
  * logout
* Players = ('players')
  * highscore           => ('/highscore', POST) => ('/highscore')
  * highscore update    => ('/highscore/update', POST) => ('/highscore/update)
  * list                => ('/list', POST) => ('/', POST)     => json(email/id), query(filter) 
* Player = ('player')
  * add      => ('/', POST)     => json(email, password, class)
  * delete   => ('/', DELETE)   => json(email/id)
  * update   => ('/', PATCH)    => json(email/id, data) 
* Feed
  * news
* message
  * send
  * inbox
  * delete