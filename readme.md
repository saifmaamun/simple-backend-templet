## add .env file and save the db user and password
## add a .gitignore file, and write node_modules and .env in it
## install vercel globally `npm i -g vercel`
## in the root folder create vercel.json file and add those line

```
{
    "version": 2,
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
       
        "src": "/(.*)",
        "dest": "index.js"
      }
    ]
  }
```

## `vercel login` to login into vercel
## `vercel` to deploy the code