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
      <div>
      <Layout>
        

        <article className='px-5 md:px-32 2xl:mx-56'>
          <div className=''>

              <svg className='absolute mt-12' width="55" height="67" viewBox="0 0 55 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 62.3719C0.28517 61.5493 0.337024 60.866 0.693486 60.468C2.63783 58.2789 3.09799 55.9173 1.74991 53.2306C1.56258 52.6747 1.4407 52.098 1.38693 51.5125C2.03505 51.4661 2.57299 51.2405 2.93593 51.4263C5.84596 52.9056 8.47731 52.8259 10.8429 50.2852C11.0957 50.0066 11.7503 50.1128 12.4762 50C12.4762 51.3267 12.6187 52.5142 12.5345 53.6485C12.4735 54.2836 12.5875 54.9234 12.8635 55.4956C13.1396 56.0677 13.5667 56.5493 14.0965 56.8858C14.602 57.2573 15.1529 57.5492 15.6195 57.9737C16.0862 58.3983 16.4361 58.8626 17 59.4796C16.6155 59.8545 16.2086 60.2045 15.7815 60.5277C15.5097 60.6874 15.2063 60.7827 14.8936 60.8063C12.3012 61.0916 10.8883 62.5709 10.5189 65.231C10.4216 65.8943 10.1948 66.7567 9.35876 66.9624C8.41899 67.1945 8.2051 66.299 7.76438 65.7418C7.61899 65.5921 7.49465 65.4224 7.39496 65.2376C6.44223 63.1414 4.85437 62.3453 2.63134 62.5841C1.74963 62.599 0.868541 62.528 0 62.3719Z" fill="#9EC3F9"/>
              <path d="M22 17V14.8143L26.6701 14.5572L29.1641 9.48178L35.1809 10.492C36.5901 8.98589 36.3905 6.85532 37.3195 5.04924C39.533 4.96352 41.6218 6.34105 44.0098 5.93085C44.8266 4.75537 45.6559 3.57376 46.5786 2.25746L51.5292 2.67378C51.8223 2.17175 52.2027 1.51666 52.5893 0.837083C53.0756 0.0350602 53.6243 -0.179224 54.2852 0.145259C54.9461 0.469741 55.1767 1.03914 54.8587 1.89627C54.4535 2.98604 53.9422 4.03908 53.4933 5.07375C51.6914 5.68598 50.0079 4.96353 48.2933 5.17169C47.1273 5.63086 46.6846 6.80637 45.98 7.71859C45.6715 8.16348 45.2327 8.50586 44.7217 8.70046C44.2106 8.89506 43.6515 8.93268 43.1182 8.80834C41.8711 8.61243 40.674 7.87777 39.0903 8.33082L37.1325 13.4735L30.9535 12.3777C29.4758 13.6021 29.5008 15.6531 28.154 16.9694L22 17Z" fill="#F48F82"/>
              </svg>

              
              <h1 className='grand-titre py-32 text-center'>{page.title}</h1>

              <svg className='absolute right-10 top-1/3 mt-18' width="45" height="55" viewBox="0 0 45 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.3688 44.4625C7.12824 43.9279 5.23336 43.694 3.51138 42.6382C3.05263 40.3928 4.22943 38.7088 5.50595 37.1852C6.46618 36.1997 7.51445 35.305 8.63747 34.5122C9.50842 33.9069 10.3329 33.2368 11.1041 32.5074C13.0986 30.2688 12.4936 28.0969 9.62145 27.1614C8.72389 26.874 7.75981 26.8206 6.83566 26.6201C6.25869 26.5191 5.72917 26.2348 5.32472 25.8091C4.92028 25.3833 4.66228 24.8385 4.58853 24.2545C4.45545 23.6734 4.54241 23.0634 4.83249 22.5433C5.12257 22.0232 5.59497 21.6302 6.15758 21.4411C6.93507 21.1138 7.77555 20.9654 8.61751 21.0068C11.3729 21.1574 14.055 21.9538 16.4495 23.3323C19.827 25.4106 20.6115 28.3843 19.5943 32.1733C19.1776 33.8505 18.1535 35.3112 16.7221 36.2697C16.0107 36.7375 15.3924 37.3656 14.6876 37.8C12.1944 39.3637 10.1999 41.3284 9.3688 44.4625Z" fill="#F7CD82"/>
              <path d="M4.3029 54.3526C1.94931 54.5865 -0.058533 52.5082 0.00130399 49.9689C0.0612292 48.8541 0.506515 47.7954 1.26033 46.9756C2.01414 46.1557 3.02913 45.6261 4.13003 45.4782C6.43708 45.2911 8.38511 47.4162 8.53137 49.9087C8.68429 52.5083 6.53682 54.64 4.3029 54.3526Z" fill="#F7CD82"/>
              <path d="M40.3867 10.521L38.711 15C36.6214 14.5129 36.6757 12.2937 34.9457 11.2517L30 10.9201C30.1272 10.2375 30.3344 9.57212 30.6174 8.93773C31.0297 8.44846 31.4836 7.9957 31.9742 7.58455C32.2807 7.2761 32.4897 6.88477 32.5753 6.45904C32.6609 6.0333 32.6194 5.59188 32.4559 5.18944C32.1837 4.48522 31.9571 3.7643 31.7775 3.03111C31.7245 2.43237 31.7245 1.83014 31.7775 1.2314L36.479 2.70636L40.8006 0C41.92 1.7862 40.8752 3.61297 41.5197 5.21649C42.4288 6.48171 44.2334 6.88089 45 8.55207C43.6839 9.79023 41.8656 9.58728 40.3867 10.521Z" fill="#F2870F"/>
              </svg>

  
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

            <Link href={`${page.buttonCta.btnUrl}`} className=''>
              <button className='max-w-3xl mx-auto mb-28 text-xl bold bg-bleu-foncé py-4 px-6 text-white rounded-[5px] effet-bleu tracking-wide'>{page.buttonCta.btnText}</button>
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