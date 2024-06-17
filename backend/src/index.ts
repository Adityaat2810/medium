import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from 'hono/cors'


// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();
app.use('/api/*',cors())


app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)



// Start the server
export default app;
