import {ConvexError, v} from "convex/values";
import {mutation, query} from "./_generated/server";


export const getTodos=query({
    args:{},
    handler:async(ctx)=>{
        const todos=await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
})


export const addTodos=mutation({
    args:{text:v.string()},
    handler:async(ctx,args)=>{
        const todoid=await ctx.db.insert("todos",{
            text:args.text,
            iscompleted:false,
        })

        return todoid;
    }
})

export const toggleTodos=mutation({
    args:{id:v.id("todos")},
    handler:async(ctx,args)=>{
        const todo=await ctx.db.get(args.id);

        if(!todo){
             throw new ConvexError("Todo is not found")
        }

        await ctx.db.patch(args.id,{
            iscompleted:!todo.iscompleted,
        })


    }
})

export const updateToods =mutation({
    args:{
        id:v.id("todos"),
        text:v.string(),

    },
    handler:async(ctx,args)=>{

        const todo=await ctx.db.get(args.id);

        if(!todo){
            throw new ConvexError("Todo is not found");
        }

        await ctx.db.patch(args.id,{
            text:args.text
        })
    }
})
export const deleteTodos=mutation({
    args:{id:v.id("todos")},
    handler:async(ctx ,args)=>{
        const removetodo=await ctx.db.delete(args.id);
        
        return removetodo;
    }
})


export const deleteAlltodos=mutation({
    args:{},
    handler:async(ctx)=>{

        const todos=await ctx.db.query("todos").collect();


        for(const todo of todos){
            await ctx.db.delete(todo._id);
        }
        return {deletecount: todos.length}

    }
})