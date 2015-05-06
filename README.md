# meetup2

a [Sails](http://sailsjs.org) application. It is used inside NOKIA to public group and event. Group is a abstract concept used to organize relevant events. The events can be
one contest, workshop or training....It is the bridge between event organizer and other people. People can join the interested group and event with his own needs. Previously
the communication is mainly rely on newsletter which is not so efficient.

# How to contribute

This project is internal open source project. We welcome anyone to join this project, try to make this project to be cool. You can give contribution via coding or reporting bugs. 
Please contact Shu, Pengfei (Nokia - CN/Hangzhou) or Wang, Gang-Layner (Nokia - CN/Hangzhou) to join this project. 

**Skill required:**

This project is based on sails and Nodejs, so some basic knowledge about Javascript, Nodejs and Sails are needed. The database used in this project is Mysql.

**NOTE:**
There might be problem during install the package in office networks environment, especially in Mainland China where is behind GFW. Before installing those package, you need config proxy in system environment, `git`, `npm` and `bower` as well.

The command to set git proxy:

- `git config --global http.proxy http://10.144.1.10:8080`

The command to set npm proxy is:

- `npm config set proxy http://10.144.1.10:8080`
- `npm config set https-proxy http://10.144.1.10:8080`

And you can edit `.bowerrc` to set the proxy for `bower`, below is one example:

```
{
  "directory": "assets/vender/",
  "proxy": "http://10.144.1.10:8080",
  "https-proxy": "http://10.144.1.10:8080"
}
```

And python is also needed because sometime node-gyp will be used. The prefer python version is 2.7.* 

Also **Git** shall be installed as well. It is because some packages are located in github which will be installed for this project. More important is the whole project files are located in gitlab. So git will be used as scm tool.

http://git-scm.com/downloads

**Step 1** Install nodejs and npm:

https://nodejs.org/download/

And npm has been imbedded with nodejs, and it will be installed with nodejs installation.

**Step 2** Install sails:
``` bash
$ npm -g install sails
```

**Step 3** Install Dependency and devDependency packages:

Move to the project root directory, and run below commands to install other packages, it is because in this project we also used some third-party package. **Bower** is an enhanced package
management tool which can handle the package dependence well.

``` bash
$ npm -g install bower
$ npm i
```

> deploy it under `root` is really a bad idea, but in case you're basted, try:

``` bash
# npm install --unsafe-perm
# bower i --allow-root
```

**Step4** In development mode, you can use 'localDiskDb'. Then no need to install database in development mode. But in production mode, mysql is used in this project. 
So mysql and sails-mysql shall be installed when it is running in production mode. 

- `npm install sails-mysql`

### Run in local environment:
In local, you can run 'sails lift' or 'sails console' in the root directory of this project to startup the server. Suppose the port 1337 used by server to listen the connect request, then you can visit the server in 
browser with url 'http://localhost:1337'. 

### Troubleshooting tips:
You can run 'sails lift --silly', then all detail log will be printed in console.



Now it has been deployed in the server hzegsav40. You can visit it via http://hzegsav40:1339/, and use the NOKIA intera account and password to login the system. Now you can public group and event. 
Also you can select your favorite group and event to join. Please use chorme to visit this web.

### Files Tree

```
`-- readme.md
    bower.json
    package.json
    .tmp
    |-- api
    |   |-- controllers
    |   |-- models
    |   
    |-- assets
    |-- node_modules
    |-- config
    |    |-- connections.js
    |    |-- models.js
    |    |-- routes.js
    |
    `-- views
```

* `readme.md` is the project introduction. 'bower.json' and 'package.json' define the needed packages which will be installed by 
'npm -i' and 'bower -i' commands. 
* folder `api/controllers` is the Controllers (the C in MVC). They are the principle objects in this project that are responsible for responding to requests from a web browser. They act as a middleman between your models and views. 
The controllers will contain the bulk of project’s business logic.
* folder `api/models` is the M part in MVC. It defines the attributes of tables and records in database. 
* folder 'assets' contains the static resouce used in this project, includes js, css and images files. Also the third part JS library is in this folder.
* folder 'node_modules' contains the packages used in this project.
* folder 'config' contains the overall config info for the project. The most important file is connections.js, models.js and routes.js. Connections.js define which database will be used.
And the models.js defines the database config info.  routes.js is one important file which define the url mapping way between url and the action in controllers.
* folder 'views' is the V part in MVC. It will be render and showed in web browser. 




## Deployment: 

running by [pm2](https://github.com/Unitech/pm2)

``` bash
$ sudo npm install pm2 -g
$ NODE_ENV=production pm2 -i 1 --name meetup start app.js
```