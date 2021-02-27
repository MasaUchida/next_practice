import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostsIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';


const Post:React.FC = ({ postData }: any) => {
    return(
        <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </Layout>
    )
}

export async function getStaticPaths(){ //idがとりうる値のリストを返す
    const paths = getAllPostsIds(); //全postのidを取得
    return {
        paths, //全てのidを返す
        fallback: false
    }
}

export async function getStaticProps({ params }:any){//ここのparamsにはpostがひとつひとつ入る
    const postData = await getPostData(params.id);
    return{
        props: {
            postData
        }
    }
}

export default Post;