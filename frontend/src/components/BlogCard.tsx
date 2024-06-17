interface BlogCardProps{

    authorName:string;
    title:string;
    content:string;
    publishedDate:string;

}

export default function BlogCard({
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) {
  return (
    <div>

        <div className="flex">
            <div className="flex justify-center flex-col">
               <Avatar name={authorName}/>
            </div>
          

            <div className="font-extralight pl-2 mt-1">
                {authorName} 
             </div>
             <div className="pl-2 mt-1 font-thin text-slate-500">
             . {publishedDate}
             </div>
            
            
        </div>

        <div className="text-xl font-semibold ">
            {title}
        </div>

        <div className="text-md font-thin">
            {content.slice(0,100)}.....
        </div>

        <div className=" text-slate-400">
            {`${Math.ceil(content.length/100)} minutes`} read
        </div>

        <div className="bg-slate-200 h-0.5 w-full"></div>

    </div>
  )
}

function Avatar({name}:{name:string}){
    return(
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-xs text-sm text-gray-600 dark:text-gray-300 font-light">{`${name[0]}${name[1]}`}</span>
        </div> 
    )
}