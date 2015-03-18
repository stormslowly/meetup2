# meetup2

a [Sails](http://sailsjs.org) application

First sails shall be installed with npm.

Second you also need run below commands to install other packages, it is because in this project we also used some third-party package. **Bower** is an enhanced package
management tool which can handle the package dependience well. 

- `npm i bower -g`
- `bower i`
- `npm i`

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