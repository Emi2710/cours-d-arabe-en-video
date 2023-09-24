import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react'
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../../client/sanity';

import Layout from '../../../components/Layout';
import { CoursDetails, Programme } from '../../../typings';
import Lesson from '../../../components/programme/Lesson';
import RetrouveLesCours from '../../../components/programme/RetrouveLesCours';
import Pdf from '../../../components/programme/Pdf';
import Vocab from '../../../components/programme/Vocab';




interface Props {
    programme: Programme;
}

interface LessonProgress {
  [lessonName: string]: string;
}


const Page = ({programme}: Props) => {


  /*Affichage des cours dynamiques*/
  const [selectedCourse, setSelectedCourse] = useState<CoursDetails | null>(null); // Specify the type
  const [chapterProgress, setChapterProgress] = useState<{ [chapterName: string]: LessonProgress }>({});

  const handleCourseClick = (course: CoursDetails) => {
  setSelectedCourse(course);

  };

  /*Logique de progression*/
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({});

  const handleLessonComplete = (lessonName: string) => {
  // Mettre à jour l'état local
  setLessonProgress((prevProgress: Record<string, string>) => ({
    ...prevProgress,
    [lessonName]: prevProgress[lessonName] === 'completed' ? 'incomplete' : 'completed',
  }));

  // Mettre à jour localStorage
  localStorage.setItem('lessonProgress', JSON.stringify(lessonProgress));
};

useEffect(() => {
  const storedProgress = localStorage.getItem('lessonProgress');

  if (storedProgress) {
    setLessonProgress(JSON.parse(storedProgress));
  }
}, []);


/*Calculer la progression */
  const totalLessons = selectedCourse?.lesson?.length || 1; // Éviter la division par zéro
  const completedLessons = Object.values(lessonProgress).filter(
    (progress) => progress === 'completed'
  ).length;

  const globalProgress = (completedLessons / totalLessons) * 100;



  
  return (
    <div>
      <div>
      <Layout>

      <div>

              <div className='flex flex-col justify-center items-center mt-7 mb-16'>

                <img
                  src={urlFor(programme.mainImage).url()}
                  alt=''
                  className=""
                />
                  
                <h1 className='petit-titre'>{programme.title}</h1>
  
              </div>

          
          {programme.introDetailed? (

            <div className='mb-16 py-7 px-6 bg-gris-clair mx-5'>
              <h3 className='petit-titre mb-5'>💡 Introduction au programme</h3>
                <PortableText
                dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
                projectId= {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                content={programme.introDetailed}
                className="portable-text text-gris-foncé"
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


          {programme.retrouveLesCours? (
            <div className='mx-5'>
              <h3 className='petit-titre mb-5'>Retrouve également les cours ici:</h3>
              {programme.retrouveLesCours?.map((ressource) => (
                <RetrouveLesCours linkTitle={ressource.linkTitle} linkUrl={ressource.linkUrl} />
              ))}
            </div>

          ) : ''}

          

          <hr className="w-40 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>

          <div className='flex flex-col items-center justify-center mb-16 p-4 border-3 border-gris-contour mx-5 rounded-[100px]'>
            <p className='petit-texte bold mb-2'>Progression globale :</p>
            <div className='flex items-center'>
                
                <progress id='file' max='100' value={globalProgress} className='progress_bar' />
                <p className='pl-2'>{globalProgress.toFixed(2)}%</p>

  
            </div>
          </div>

          {programme.cours? (

          <div className='mx-5 mb-20'>
                      <div>
                          <h3 className='petit-titre mb-5'>Sommaire</h3> 
                          <div></div> 
                      </div>
                      
                      <div>
                        {programme.cours?.map((cours) => (
                          <div className='flex justify-between' >
                            <p className='cursor-pointer mb-3.5 text-gris-foncé underline bold' onClick={() => handleCourseClick(cours)}>{cours.name}</p>
                            <p className='text-gris-contour'>0%</p>
                          </div>
                        ))}
                      </div>
                      
          </div> 

          ): ''}

          {selectedCourse ? (
          <div className='mx-5'>
              <h3 className="petit-titre mb-3">{selectedCourse.name}</h3>

              <div className='flex items-center mb-10'>
                
                <progress id='file' max='100' value={globalProgress} className='progress_bar' />
                <p className='pl-2'>{globalProgress.toFixed(2)}%</p>
  
              </div>


              {selectedCourse.ressourcesUtiles? (

                <div className='mb-16 py-7 px-6 bg-gris-clair'>
                  <h4 className='petit-titre'>📚Ressources utiles</h4>
                  {selectedCourse.ressourcesUtiles?.map((ressource) => (
                    <div>
                      <Pdf 
                          linkTitle={ressource.linkTitle} 
                          linkUrl={ressource.linkUrl} 
                          type={ressource.type} 
                        />
                      
                      
                      <div className='flex justify-center items-center'>

                          {ressource.type == 'vocab' && (

                          <Vocab 
                            linkTitle={ressource.linkTitle} 
                            linkUrl={ressource.linkUrl} 
                          />
                          
                          )}
                          

                      </div>                        
                    </div>
                      
                  ))}

                
                </div>

              ) : ''}

              {selectedCourse.lesson?.map((lesson) => (
                <div className='flex'>

                  <Lesson 
                      name={lesson.name} 
                      lessonLink={lesson.lessonLink}
                      pdfLink={lesson.pdfLink}
                      type={lesson.type}
                      publishedAt={lesson.publishedAt}
                    />

                    <input
                        type='checkbox'
                        checked={lessonProgress[lesson.name] === 'completed'}
                        onChange={() => handleLessonComplete(lesson.name)}
                      />
                </div>
                    
              ))}

              <hr className="w-40 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>
              
          </div>
          ) : null}   
      </div>

      </Layout>
      
        </div>  
    </div>
    
  )
}


export async function getStaticPaths() {
    const query = 
    `*[_type == 'programmes']{
        _id,
        title,
        slug  {
        current
      }
      }`;
      
      const programmes = await sanityClient.fetch(query);

      const paths = programmes.map((programme : Programme) => ({
        params: {
            slug: programme.slug.current
        }
      }))
    return {
      paths,
      fallback: 'blocking' // false or 'blocking'
    };
  }

export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type == 'programmes' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        mainImage,
        introShort,
        introDetailed,
        retrouveLesCours,
        cours[] -> {
          _id,
          name,
          "slug":  slug.current,
          ressourcesUtiles,
          lesson,
          category,
        }
        
      }
    `
    const programme = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
    if(!programme){
        return {
            notFound: true
        }
    }
    return {
        props: {
            programme,
        },
        revalidate: 60,
    }
}

export default Page