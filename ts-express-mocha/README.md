## How to run backend

### Using Docker Compose (recommended)

Make sure you have Docker installed and running. From the *ts-express-mocha* folder:

- Run `docker compose up`
- The server should be running at `http://localhost:8000`

### Using Docker

Make sure you have Docker installed and running. From the *ts-express-mocha* folder:

- Build the image with `docker build -t spotlist-api .`
- Run the image with `docker run -p 8000:8000 -v "${PWD}/src:/app/src" spotlist-api`
- The server should be running at `http://localhost:8000`

### Directly in your machine

From the *ts-express-mocha* folder:

- Install dependencies with `npm install`
- Run the server with `npm run dev`
- The server should be running at `http://localhost:8000`

## Note about the database initialization

There is a **sqlite::memory:** file which already has all the needed tables created by you. Don't worry if you delete it, when running the server all the tables will be automatically created and stored again in that file.

But what about the data? If you run the backend directly in your machine, you will have to manually seed the database. It's easy, just run the command `npm run db:seed` from the *ts-express-mocha* folder. If this command throws an error, it can be due to one of these reasons:

- The tables are not created: this can be solved by just running the backend via `npm run dev` command. After that, try again to run the seed command and it should work.
- The seed is already present in the database: in this case the data has been successfully inserted into the database so there's no need to run the command again.

Finally, note that this seed command must only be used if you are running the server in your local machine, not using Docker. If you are using Docker or Docker Compose to run the app then all this is done for you so that you don't have to make any extra step. That's why we recommend you to use the Docker way.

## Run tests

To run the tests you only have to execute the command `npm run integration` from the *ts-express-mocha* folder. Please note that the database should be first populated with all the tables and initial data. Also that the backend must be running when running the tests, otherwise they will not work.