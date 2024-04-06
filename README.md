After you have clone the project run the command: `npm install` if you need to have a local version on angular 12. If it's not neccessary, go ahead to directory `films-time` and run the `npm install` command inside it. 

## Need to install a local version on Angular 12
The films-time web dev is located in the directory `films-time`, whic was creted useing `@angular/cli@12`, it uses `node14.21.3`. 

So, in order to support it, check that you have installed those versions of Angular and node. Older version of node are not supported by angular v12. You can admin your `node --version` with `nvm`. You can list the lts versions (`nvm list`) and check whic ones are installed (`nvm install 14`) and what version is in use (`nvm use 14`).

You can access to angular v12 in the `node_modules` directory using the command `node_modules/.bin/ng`.

### Optional

You can create a temporal symbolic link if you what to try `ng12 serve` ...

`sudo ln -s <absolute-route-of-the-project>/node_modules/.bin/ng /usr/local/bin/ng12`

