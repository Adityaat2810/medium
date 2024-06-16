import z from 'zod'

export const signUpInput = z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string().min(6)
});

export const signInInput = z.object({
    email:z.string().email(),
    password:z.string().min(6)
});

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
});


export const updateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
});



// type inference in zod 
// froontend will need it 
export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>