
## How to run this project
- First of all clone this project from github.
- Then go to project path. and install npm package. 
```
git clone https://github.com/mdshohed/e-commerce-backend-api.git
cd e-commerce-backend-api
npm install
```

- Next, You will need to setup `.env` file where you have to setup this process config file: `PORT, DATABASE_URL`.

```
create .env file in root folder
PORT=5000
DATABASE_URL=database url
```

- To Start this project. you have run npm command 
```
npm run start:dev
```


## How to live this project in vercel: 
- To live this project use vercel CLI and type this command.
- `npm i -g vercel`
- `vercel -v`
- `vercel login`
- `vercel --prod`
  * `setup and deploy: - y`
  * `which scope do you want to deploy to: projects`
  * `link to existing project: no`
  * `what's your project's name: e-commerce-backend-api`
  * `In which directory is your code located: ./`