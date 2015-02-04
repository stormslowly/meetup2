# meetup2

a [Sails](http://sailsjs.org) application

To run this App, You also need run below commands to install other packages:

- npm i bower -g
- bower i
- npm i

And before installing those package, you need config proxy in system environment, git, npm and bower as well.

The command to set git proxy:

- git config --global http.proxy http://10.144.1.10:8080

The command to set npm proxy is:

- npm config set proxy http://proxy.company.com:8080
- npm config set https-proxy http://proxy.company.com:8080

And you can edit .bowerrc to set the proxy for bower, below is one example:

{

  "directory": "assets/vender/",

  "proxy": "http://10.144.1.10:8080",

  "https-proxy": "http://10.144.1.10:8080"

}
