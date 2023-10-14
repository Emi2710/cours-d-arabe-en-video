import { GetStaticProps } from 'next';
import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import PortableText from 'react-portable-text';
import { sanityClient } from '../../client/sanity';

import Layout from '../../components/Layout';
import { PageInfo } from '../../typings';

interface Props {
    page: PageInfo;
}




const Page = ({page}: Props) => {
  
  return (
    <div>
      <Head>
          <title>Cours d'arabe en vidéo gratuit - {page.title}</title>
      </Head>
      <div>
      <Layout>
        

        <article className='px-5 md:px-32 2xl:mx-56'>
          <div>            
              <h1 className='grand-titre py-32 text-center'>{page.title}</h1>
          </div>
          
          
          {page.body? (

            <div className='petit-texte mb-24'>
                <PortableText
                dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
                projectId= {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                content={page.body}
                className="portable-text"
                serializers={{
                    h1: (props: any) => (
                        <h1 className='text-2xl md:text-3xl font-bold my-5' {...props} />
                    ),
                    h2: (props: any) => (
                        <h2 className='text-xl md:text-2xl font-bold my-5' {...props} />
                    ),
                    li: ({children}: any) => (
                        <li className='ml-4 list-disc'>{children}</li>
                    ),
                    link: ({href, children}: any) => (
                        <a href={href} className='text-blue-500 hover:underline'>{children}</a>
                    ),
                    
                    

                }}
                />
            </div>  
          ) : ''}

          <div>
            {page.faq?(
                <div>
                    {page.faq.map((faq) => (
                        <div>
                            <h3 className='petit-titre my-5'>📌{faq.question}</h3>
                            <div className='bg-gris-clair mb-16'>
                                
                                <p className='text-gris-foncé py-10 px-12'>{faq.answer}</p>
  
                            </div>
                        </div>
                    ))}
                </div>
            ) : ''}
          </div>
          
          
          <div  className='flex justify-center'>

            <Link href={`${page.buttonCta?.btnUrl}`} className=''>
              <button className='hover-animation max-w-3xl mx-auto mb-28 text-xl bold bg-bleu-foncé py-4 px-6 text-white rounded-[5px] effet-bleu tracking-wide'>{page.buttonCta?.btnText}</button>
            </Link>

          </div>

          
      </article>

      


      </Layout>
      
      
      
      
      
        </div>  
    </div>
    
  )
}


export async function getStaticPaths() {
    const query = 
    `*[_type == 'pages']{
        _id,
        title,
        slug  {
        current
      }
      }`;
      
      const pages = await sanityClient.fetch(query);

      const paths = pages.map((page : PageInfo) => ({
        params: {
            slug: page.slug.current
        }
      }))
    return {
      paths,
      fallback: 'blocking' // false or 'blocking'
    };
  }

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type == 'pages' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        body,
        buttonCta,
        faq,
        
      }
    `
    const page = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
    if(!page){
        return {
            notFound: true
        }
    }
    return {
        props: {
            page,
        },
        revalidate: 60,
    }
}

export default Page