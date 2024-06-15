import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()


userRouter.post('/signup', async (c) => {
    console.log('Received signup request');
  
    const { DATABASE_URL } = c.env;
    if (!DATABASE_URL) {
      console.error('DATABASE_URL is not defined');
      c.status(500);
      return c.json({ error: 'Internal server error' });
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const body = await c.req.json();
      console.log('Request body:', body);
  
      //TODO use zod validation and bcrypt 
      const { email, password, name } = body;
      if (!email || !password || !name) {
        console.error('Missing required fields');
        c.status(400);
        return c.json({ error: 'Missing required fields' });
      }
  
      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt });
  
      console.log('User created:', user);
      return c.json({ message: 'Signup success' });
    } catch (error) {
      console.error('Error during signup:', error);
      c.status(500);
      return c.json({ error: 'Error during signup' });
    } finally {
      await prisma.$disconnect();
    }
  });
  
  
  userRouter.post('/signin', async (c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const user = await prisma.user.findUnique({
          where: {
              email: body.email,
        password:body.password
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
  })
  