import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory:string = path.join(process.cwd(), 'src/posts');

export function getSortedPostsData(){

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const stringFileName = String(fileName);//型変換

        const id = stringFileName.replace(/\.md$/,'');

        const fullPath = path.join(postsDirectory,stringFileName);
        const fileContents = fs.readFileSync(fullPath,'utf8');

        const matterResult = matter(fileContents);

        return{
            id,
            ...matterResult.data
        }
    });


    return allPostsData.sort((a:any,b:any):number => {

        if(a.date < b.date){
            return 1;
        } else {
            return -1;
        }

    })


}

export function getAllPostsIds(){
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map((filename) => {
        return{
            params: {
                id: filename.replace(/\.md$/, ''),
            }
        }
    })
}

export async function getPostData(id: any){
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath,'utf8')

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml= processedContent.toString()

    return{
        id,
        contentHtml,
        ...matterResult.data,
    }

}