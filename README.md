
# CaffeineHunt

A client & server app to find a coffee shop in a nearby location

## Stacks

Client
```
Language: JavaScript
Framework: React
```

Server
```
Language: JavaScript (Node.js)
Framework: Express
Database: MongoDB
```

Both
```
Build tool: npm
Others: GraphQL, Docker
```

## Usage

Import data to mongodb
```
mongorestore --host 127.0.0.1 --port 27017 -d caffeinehunt -c restaurants server/data/restaurants.bson
```

Run client normally
```
cd client && npm i && npm run dev
```

Run server normally
```
cd server && npm i && npm run dev
```

Run server via Docker
```
docker build -t caffeinehunt/server .
docker run --rm -p 4000:4000 --name caffeinehunt-server caffeinehunt/server
```

Access at
```
Client: http://localhost:3000
Server: http://localhost:4000
```

Sample running app at ```https://caffeinehunt.herokuapp.com/```
