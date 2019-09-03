/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Profile from "views/examples/Profile.jsx"
// import Maps from "views/examples/Maps.jsx"
// import Tables from "views/examples/Tables.jsx"
// import Icons from "views/examples/Icons.jsx"
import Index from "views/production/Index.jsx"
import Register from "views/production/Register.jsx"
import Login from "views/production/Login.jsx"
import Students from "views/production/Students.jsx"
import SingleStudent from "views/production/SingleStudent.jsx"
import MyGroups from "views/production/MyGroups.jsx"
import Settings from "views/production/Settings.jsx"
import Admins from "views/production/Admins.jsx"

var routes = [{
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-red",
    component: Index,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  {
    path: "/student/:id",
    name: "Student",
    icon: "fa fa-user text-red",
    component: SingleStudent,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/students/:group",
    name: "Students",
    icon: "fa fa-users text-red",
    component: Students,
    layout: "/admin",
    hidden: true
  },
  {
    path: "/students",
    name: "Students",
    icon: "fa fa-users text-red",
    component: Students,
    layout: "/admin"
  },
  {
    path: "/groups",
    name: "Groups",
    icon: "fa fa-list-ol text-red",
    component: MyGroups,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "fa fa-grav text-red",
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "fa fa-cogs text-red",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;