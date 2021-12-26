import app from './app';
import { sequelize } from './db';

const port = process.env.PORT || 8000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});
