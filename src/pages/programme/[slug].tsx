import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react'
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../../client/sanity';
import Link from 'next/link'

import Layout from '../../../components/Layout';
import { CoursDetails, LessonType, Programme } from '../../../typings';
import Lesson from '../../../components/programme/Lesson';
import RetrouveLesCours from '../../../components/programme/RetrouveLesCours';
import Pdf from '../../../components/programme/Pdf';
import Vocab from '../../../components/programme/Vocab';




interface Props {
    programme: Programme;
}


const Page = ({programme}: Props) => {


  

    

  /* LOGIQUE DE PROGRESSION DES LECONS */

  // État local pour stocker la progression de chaque chapitre
  const [chapterCompletion, setChapterCompletion] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Récupérer la progression de l'utilisateur depuis le localStorage
    const storedProgress = localStorage.getItem('chapterCompletion');
    if (storedProgress) {
      setChapterCompletion(JSON.parse(storedProgress));
    }
  }, []);

  // Mettre à jour la progression de l'utilisateur lorsque la checkbox est cochée ou décochée
  const handleCheckboxChange = (chapterName: string, lessonName: string, isCompleted: boolean) => {
    // Copier l'état actuel de complétion
    const updatedCompletion = { ...chapterCompletion };
    // Vérifier si le chapitre existe déjà
    if (!updatedCompletion[chapterName]) {
      updatedCompletion[chapterName] = [];
    }
    // Mettre à jour la complétion de la leçon spécifiée
    if (isCompleted) {
      if (!updatedCompletion[chapterName].includes(lessonName)) {
        updatedCompletion[chapterName].push(lessonName);
      }
    } else {
      const index = updatedCompletion[chapterName].indexOf(lessonName);
      if (index !== -1) {
        updatedCompletion[chapterName].splice(index, 1);
      }
    }
    // Mettre à jour l'état local
    setChapterCompletion(updatedCompletion);
    // Sauvegarder la progression dans le localStorage
    localStorage.setItem('chapterCompletion', JSON.stringify(updatedCompletion));
  };

/* LOGIQUE DE PROGRESSION DES CHAPITRES */

  // Mettre à jour la progression de l'utilisateur lorsque la checkbox du chapitre est cochée ou décochée
  const handleChapterCheckboxChange = (chapterName: string, isCompleted: boolean) => {
    // Copier l'état actuel de complétion
    const updatedCompletion = { ...chapterCompletion };
    // Mettre à jour la complétion de toutes les leçons à l'intérieur du chapitre spécifié
    if (isCompleted) {
      updatedCompletion[chapterName] = programme.cours
        .find((cours) => cours.name === chapterName)
        ?.lesson?.map((lesson) => lesson.name) || [];
    } else {
      updatedCompletion[chapterName] = [];
    }
    // Mettre à jour l'état local
    setChapterCompletion(updatedCompletion);
    // Sauvegarder la progression dans le localStorage
    localStorage.setItem('chapterCompletion', JSON.stringify(updatedCompletion));
  };

/* SYSTEME DE TRI DES COURS */

// État local pour stocker la préférence de l'utilisateur
  // État local pour stocker la préférence de l'utilisateur
  const [showOrderByPublication, setShowOrderByPublication] = useState(false);

  // Utilisez useEffect pour sauvegarder la préférence de l'utilisateur dans localStorage
  useEffect(() => {
    // Vérifiez si localStorage est disponible (côté client)
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('showOrderByPublication');
      if (storedPreference !== null) {
        // Convertissez la chaîne en booléen
        setShowOrderByPublication(storedPreference === 'true');
      }
    }
  }, []);

  


const renderDefaultView = () => {

  console.log('Rendering default view');
  return (
    <div>
      {programme.cours.map((cours) => (
        <div key={cours._id}>

          <div className='flex'>
            
            <h3 className="petit-titre mb-3" id={cours.slug.current}>
              {cours.name}
            </h3>
            <input
              type='checkbox'
              checked={chapterCompletion[cours.name]?.length === cours.lesson?.length}
              onChange={(e) => handleChapterCheckboxChange(cours.name, e.target.checked)}
            />
  
          </div>
          <div className='flex items-center mb-10'>
            <progress id='file' max='100' value={calculateChapterProgress(cours.name)} className='progress_bar' />
                <p className='pl-2'>{calculateChapterProgress(cours.name)}%</p>
          </div>

          {cours.ressourcesUtiles ? (
            <div className='mb-16 py-7 px-6 bg-gris-clair'>
                  <h4 className='petit-titre'>📚Ressources utiles</h4>
                  {cours.ressourcesUtiles?.map((ressource) => (
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

          
      

          {cours.lesson?.map((lesson) => (
            <div className='flex'>

              <Lesson
              key={lesson.name}
              name={lesson.name}
              lessonLink={lesson.lessonLink}
              pdfLink={lesson.pdfLink}
              type={lesson.type}
              publishedAt={lesson.publishedAt}
              />

              <input
                type='checkbox'
                checked={chapterCompletion[cours.name]?.includes(lesson.name) || false}
                onChange={(e) => handleCheckboxChange(cours.name, lesson.name, e.target.checked)}
              />

              
            </div>
            
          ))}
        </div>
      ))}
    </div>
  );
};



// Flatten the lessons from all chapters into a single array
  const allLessons: LessonType[] = programme.cours.reduce((acc: LessonType[], cours) => {
  if (cours.lesson && Array.isArray(cours.lesson)) {
    acc.push(...cours.lesson.map((lesson) => ({ ...lesson, chapterName: cours.name })));
  }
  return acc;
}, []);


  // Sort the lessons based on their publication date
  const sortedLessons = allLessons
    .filter((lesson) => lesson.publishedAt) // Filter out lessons with no publication date
    .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());


    let previousChapterName = ''; // Variable pour stocker le nom du chapitre précédent



/* AFFICHER BARRE DE PROGRESSION A COTE DE CHAQUE CHAPITRE */

const calculateChapterProgress = (chapterName: string) => {
  const completedLessons = chapterCompletion[chapterName] || [];
  const totalLessons = programme.cours
    .find((cours) => cours.name === chapterName)?.lesson?.map((lesson) => lesson.name) || [];

  if (totalLessons.length === 0) {
    return '0';
  }

  const progress = Math.round((completedLessons.length / totalLessons.length) * 100);
  return progress.toString();
};



/* AFFICHER LA PROGRESSION GLOBALE */

const calculateGlobalProgress = () => {
  let totalCompletedLessons = 0;
  let totalLessons = 0;

  programme.cours.forEach((cours) => {
    const chapterCompletedLessons = chapterCompletion[cours.name] || [];
    const chapterTotalLessons = cours.lesson?.length || 0;

    totalCompletedLessons += chapterCompletedLessons.length;
    totalLessons += chapterTotalLessons;
  });

  if (totalLessons === 0) {
    return '0';
  }

  const progress = Math.round((totalCompletedLessons / totalLessons) * 100);
  return progress.toString(); // Convertit le nombre en chaîne de caractères
};

/* CONTROLER L'AFFICHE DES RESSOURCES UTILES DANS LA BOUCLE DES COURS PUBLIES SELON LEUR DATE DE PUBLICATION */

const displayedChapters = new Set();

/* FIND CORRECT RESSOURCES UTILES FOR CHAPTER */
const findChapterResources = (chapterName: string) => {
  const course = programme.cours.find((cours) => cours.name === chapterName);
  return course?.ressourcesUtiles || null;
};

  
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
            <div className='flex items-center mb-10'>
              <p className='petit-texte bold mb-2'>Progression globale :</p>
              <div className='flex items-center'>
                <progress id='file' max='100' value={calculateGlobalProgress()} className='progress_bar' />
                <p className='pl-2'>{calculateGlobalProgress()}%</p>
              </div>
            </div>
          </div>

          {programme.cours ? (
            <div className='mx-5 mb-20'>
              <div>
                <h3 className='petit-titre mb-5'>Sommaire</h3>
                <div></div>
              </div>

              <div>
                {programme.cours?.map((cours) => {
                  
                  return (
                  <div className='flex justify-between' key={cours.name}>
                    <div>
                      <Link href={`#${cours.slug}`} onClick={() => {
                        
                        setShowOrderByPublication(false);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(false));
                      }}>

                        <p className='cursor-pointer mb-3.5 text-gris-foncé underline bold'>
                          {cours.name}
                        </p>  
                      </Link>
                      
                    </div>
                  </div>
                )
                
                })}
              </div>
            </div>
          ) : ''}


          <div>
        {/* Button to toggle between default and publication order */}
          <button onClick={() => {
            const newValue = !showOrderByPublication;
            // Mettez à jour l'état local
            setShowOrderByPublication(newValue);
            // Sauvegardez la préférence de l'utilisateur dans localStorage
            localStorage.setItem('showOrderByPublication', JSON.stringify(newValue));
          }}>
            {showOrderByPublication ? 'Afficher par défaut' : 'Afficher par ordre de publication'}
          </button>


        {/* Render lessons based on the selected view */}
          {showOrderByPublication
            ? sortedLessons.map((lesson) => {
                // Function to find the parent course of the lesson
                const findParentCourse = (lessonName: string, lessonLink: string) => {
                  for (const course of programme.cours) {
                    if (
                      course.lesson &&
                      course.lesson.some(
                        (coursLesson) =>
                          coursLesson.name === lessonName && coursLesson.lessonLink === lessonLink
                      )                    ) {
                      return course.name; // Return the course name as the chapter name
                    }
                  }
                  return ''; // Default to an empty string if no parent course is found
                };

                const chapterName = findParentCourse(lesson.name, lesson.lessonLink); // Obtenir le nom du chapitre correct
                // Check if the chapter name is different from the previous one
                const isDifferentChapter = chapterName !== previousChapterName;

                // Update the previousChapterName with the current chapter name
                previousChapterName = chapterName;

                

                const findParentRessources = () => {
                  for (const course of programme.cours) {
                    if (
                      course.lesson &&
                      course.lesson.some((coursLesson) => coursLesson.name === lesson.name)
                    ) {
                      return course.ressourcesUtiles; // Return the course name as the chapter name
                    }
                  }
                  return ''; // Default to an empty string if no parent course is found
                };

                // Vérifiez si le nom du chapitre actuel a déjà été affiché
                const isChapterDisplayed = displayedChapters.has(chapterName);
                
                if (!isChapterDisplayed) {
                    // Marquez le chapitre comme déjà affiché
                    displayedChapters.add(chapterName);

                    // Affichez ici les ressources utiles pour ce chapitre
                    const chapterRessources = findChapterResources(chapterName);


                    if (chapterRessources) {
                      return (
                        <div key={chapterName}>
                          <div>
                            <div className='flex items-center'>
                              <h3 className="petit-titre mb-3">{chapterName}</h3>
                              <input
                                type='checkbox'
                                checked={
                                  chapterCompletion[chapterName]?.length ===
                                  programme.cours
                                    .find((cours) => cours.name === chapterName)
                                    ?.lesson?.length
                                }
                                onChange={(e) => handleChapterCheckboxChange(chapterName, e.target.checked)}
                              />  
                            </div>

                            <div className='flex items-center mb-10'>
                              <progress id='file' max='100' value={calculateChapterProgress(chapterName)} className='progress_bar' />
                              <p className='pl-2'>{calculateChapterProgress(chapterName)}%</p>
                            </div>

                            

                          </div>
                          
                          {chapterRessources ? (
                            <div className='mb-16 py-7 px-6 bg-gris-clair'>
                            <h4 className='petit-titre'>📚 Ressources utiles</h4>
                            {chapterRessources?.map((ressource, index) => (
                              <div key={index}>
                                {ressource.type === 'pdf' && (
                                  <Pdf
                                    linkTitle={ressource.linkTitle}
                                    linkUrl={ressource.linkUrl}
                                    type={ressource.type}
                                  />
                                )}
                                {ressource.type === 'vocab' && (
                                  <Vocab
                                    linkTitle={ressource.linkTitle}
                                    linkUrl={ressource.linkUrl}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                          ) : '' }
                          

                          <div className='flex'>

                              <Lesson
                                key={lesson.name}
                                name={lesson.name}
                                lessonLink={lesson.lessonLink}
                                pdfLink={lesson.pdfLink}
                                type={lesson.type}
                                publishedAt={lesson.publishedAt}
                              />  

                              <input
                                type='checkbox'
                                checked={chapterCompletion[chapterName]?.includes(lesson.name) || false}
                                onChange={(e) => handleCheckboxChange(chapterName, lesson.name, e.target.checked)}
                              />

                              
                          </div>
                        </div>
                      );
                    }
                  }


                return (
                  <div key={lesson.name}>
                    {/* Afficher le nom du chapitre uniquement s'il est différent du précédent */}
                    {isDifferentChapter && <div>
                      <div className='flex items-center'>
                        <h3 className="petit-titre mb-3">{chapterName}</h3>
                        <input
                          type='checkbox'
                          checked={
                            chapterCompletion[chapterName]?.length ===
                            programme.cours
                              .find((cours) => cours.name === chapterName)
                              ?.lesson?.length
                          }
                          onChange={(e) => handleChapterCheckboxChange(chapterName, e.target.checked)}
                        />  
                      </div>

                      <div className='flex items-center mb-10'>
                        <progress id='file' max='100' value={calculateChapterProgress(chapterName)} className='progress_bar' />
                        <p className='pl-2'>{calculateChapterProgress(chapterName)}%</p>
                      </div>
                      
                  </div>}

                    
                  <div className='flex'>

                      <Lesson
                        key={lesson.name}
                        name={lesson.name}
                        lessonLink={lesson.lessonLink}
                        pdfLink={lesson.pdfLink}
                        type={lesson.type}
                        publishedAt={lesson.publishedAt}
                      />  

                      <input
                        type='checkbox'
                        checked={chapterCompletion[chapterName]?.includes(lesson.name) || false}
                        onChange={(e) => handleCheckboxChange(chapterName, lesson.name, e.target.checked)}
                      />

                      
                  </div>
                    
                  </div>
                );
              })
            : renderDefaultView()}

      </div>  
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
          slug,
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