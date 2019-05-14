import express from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';

const server = express();
const port = parseInt(process.env.PORT, 10) || 4500;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  server.use(cookieParser());
  server.use((req, res, next) => {
    req.token = req.cookies.token; // !!! gets token from cookie, then passes it down to use it in graphql-hooks
    next();
  })
  server.get('*', (req, res) => {
    return handle(req, res)
  })
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});