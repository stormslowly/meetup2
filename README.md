# meetup2

a [Sails](http://sailsjs.org) application

First sails shall be installed with npm.

Second you also need run below commands to install other packages, it is because in this project we also used some third-party package. **Bower** is an enhanced package
management tool which can handle the package dependence well.

``` bash
$ npm i
```

> deploy it under `root` is really a bad idea, but in case you're basted, try:

``` bash
# npm install --unsafe-perm
# bower i --allow-root
```

Third, mysql is used in this app. So both Mysql and sails-mysql shall be installed.

- `npm install sails-mysql`

## Running by [pm2](https://github.com/Unitech/pm2)

``` bash
$ sudo npm install pm2 -g
$ NODE_ENV=production pm2 -i 1 --name persona start app.js
```

## NOTE:
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

# How to contribute

This project is internal open source project. We welcome anyone to join this project, try to make this project to be cool. You can give contribute via coding or reporting bugs. 
Please contact Shu, Pengfei (Nokia - CN/Hangzhou) or Wang, Gang-Layner (Nokia - CN/Hangzhou) to join this project. 

## Technical required: 
This project is based on sails and Nodejs, so some basic knowledge about Javascript, Nodejs and Sails are needed. The database used in this project is Mysql.  