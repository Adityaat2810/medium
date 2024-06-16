import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { decode, verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables:{
    userId:string
  }

}>()

blogRouter.use('/*',async(c,next)=>{
    const token = c.req.header('authorization') || "";
    const user =await verify(token ,c.env.JWT_SECRET)

    if(user){
        c.set("userId",user.id as string)
        await next();
    }else{
        return c.json({
            message:"you are not logged in"
        })
    }

   

})

blogRouter.post('/',async (c)=>{

    const body = await c.req.json();
    const userId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })

    return c.json({
        id:blog.id
    })
})


blogRouter.put('/',async (c)=>{

    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id
    })
})



blogRouter.get('/:id',async (c)=>{
    const id =  c.req.param("id")
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id:id
            },
            
        })
    
        return c.json({
            blog
        })

    }catch(err){

        return c.json({
            err
        })

    }
   
})


// Todo:pagination
blogRouter.get('/all/bulk', async (c) => {

  
    try {

        console.log(' i am here');
        
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogs = await prisma.post.findMany();
        console.log(blogs);
        
        return c.json({
            blogs
        });
    } catch (error) {
        console.log(error);
        
        return c.json({
            error
        });
    }
});