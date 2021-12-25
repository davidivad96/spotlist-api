import app from './app';
import db from './db';

const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
