import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { signUpInput ,signInInput} from '@adityaat2810/medium-blog';


export const userRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()


userRouter.post('/signup', async (c) => {
   
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const body = await c.req.json();
      const { success } = signUpInput.safeParse(body)
      if(!success){

        c.status(411);
        return c.json({
          message:"input not correct"
        })
      }
      
  
   
      const user = await prisma.user.create({
        data: {
          email:body.email,
          password:body.password,
          name:body.name,
        },
      });
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });

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
  