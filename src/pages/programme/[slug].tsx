import { GetStaticProps } from 'next';
import React, { useEffect, useRef, useState } from 'react'
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../../client/sanity';
import Link from 'next/link'

import Layout from '../../../components/Layout';
import { LessonType, Programme } from '../../../typings';
import Lesson from '../../../components/programme/Lesson';
import RetrouveLesCours from '../../../components/programme/RetrouveLesCours';
import Pdf from '../../../components/programme/Pdf';
import Schema from '../../../components/programme/Schema';




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
  const handleCheckboxChange = (chapterName: string, lessonLink: string, isCompleted: boolean) => {
    // Copier l'état actuel de complétion
    const updatedCompletion = { ...chapterCompletion };
    // Vérifier si le chapitre existe déjà
    if (!updatedCompletion[chapterName]) {
      updatedCompletion[chapterName] = [];
    }
    // Mettre à jour la complétion de la leçon spécifiée
    if (isCompleted) {
      
      if (!updatedCompletion[chapterName].includes(lessonLink)) {
        updatedCompletion[chapterName].push(lessonLink);
      }
    } else {
      const index = updatedCompletion[chapterName].indexOf(lessonLink);
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
        ?.lesson?.map((lesson) => lesson.lessonLink) || [];
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

          <div className='sm:flex items-center justify-between max-w-[1090px] m-auto lg:mb-14'>
            <div className='flex items-center justify-between sm:justify-normal'>
              
              <h3 className="petit-titre mb-3 lg:grand-titre" id={cours.slug.current}>
                {cours.name}
              </h3>

              <label className='checkbox-container sm:mb-10 sm:ml-4'>
                
                <input
                type='checkbox'
                checked={chapterCompletion[cours.name]?.length === cours.lesson?.length}
                onChange={(e) => handleChapterCheckboxChange(cours.name, e.target.checked)}
                />
                <span className="checkmark"></span>


              </label>

              
    
            </div>

            <div className='flex flex-col lg:flex-row lg:items-center'>
              <p className='hidden sm:block bold lg:petit-titre'>Progression:</p>
              <div className='flex items-center mb-10 lg:mb-0 lg:ml-2'>
                <progress id='file' max='100' value={calculateChapterProgress(cours.name)} className='progress_bar' />
                <p className='pl-2'>{calculateChapterProgress(cours.name)}%</p>
              </div> 

            </div>
              
          </div>

          

          {cours.ressourcesUtiles ? (
            <div className='mb-16 py-7 px-6 bg-gris-clair max-w-[1090px] m-auto'>
                  <h4 className='petit-titre sm:mb-6'>📚Ressources utiles</h4>
                  <div className='sm:flex justify-around items-center'>

                    {cours.ressourcesUtiles?.map((ressource) => (
                    <div>


                      {ressource.type === 'pdf' && (
                                  <Pdf
                                    linkTitle={ressource.linkTitle}
                                    linkUrl={ressource.linkUrl}
                                    type={ressource.type}
                                  />
                      )}
                      
                      {ressource.type === 'schema' && (
                                  <Schema
                                    linkTitle={ressource.linkTitle}
                                    linkUrl={ressource.linkUrl}
                                    type={ressource.type}
                                  />
                      )}  
                                             
                    </div>
                      
                  ))}

                  <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center justify-center mt-4 bg-white border-gris-contour border-3 w-[225px] mx-auto py-3'>
                      {cours.ressourcesUtiles?.map((ressource) => (
                        <div>
                          {ressource.type === 'anki' && (
                             <a href={ressource.linkUrl} className='flex items-center'>
                                <p className='bold underline text-gris-foncé mr-1'>{ressource.linkTitle}</p>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#424242"/>
                                </svg>
                                
                                <svg className='mx-3' width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.083 19.5834H10.4163C7.76495 19.5834 5.50488 18.649 3.63613 16.7803C1.76738 14.9115 0.833008 12.6515 0.833008 10.0001C0.833008 7.34869 1.76738 5.08862 3.63613 3.21987C5.50488 1.35112 7.76495 0.416748 10.4163 0.416748H18.083V4.25008H10.4163C8.81912 4.25008 7.46148 4.80911 6.34342 5.92717C5.22537 7.04522 4.66634 8.40286 4.66634 10.0001C4.66634 11.5973 5.22537 12.9549 6.34342 14.073C7.46148 15.1911 8.81912 15.7501 10.4163 15.7501H18.083V19.5834ZM12.333 11.9167V8.08342H27.6663V11.9167H12.333ZM21.9163 19.5834V15.7501H29.583C31.1802 15.7501 32.5379 15.1911 33.6559 14.073C34.774 12.9549 35.333 11.5973 35.333 10.0001C35.333 8.40286 34.774 7.04522 33.6559 5.92717C32.5379 4.80911 31.1802 4.25008 29.583 4.25008H21.9163V0.416748H29.583C32.2344 0.416748 34.4945 1.35112 36.3632 3.21987C38.232 5.08862 39.1663 7.34869 39.1663 10.0001C39.1663 12.6515 38.232 14.9115 36.3632 16.7803C34.4945 18.649 32.2344 19.5834 29.583 19.5834H21.9163Z" fill="#C3CFD9"/>
                                </svg>

                             </a>
                          )}                  

                          {ressource.type === 'quizlet' && (
                             <a href={ressource.linkUrl} className='flex items-center'>
                                <p className='bold underline text-gris-foncé mr-1'>{ressource.linkTitle}</p>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#424242"/>
                                </svg>
                             </a>
                          )}                     
                        </div>
                      
                        ))}
                    </div>
                    {cours.ressourcesUtiles && (<p className='mt-3 underline bold text-gris-foncé'>Vocabulaire de ...</p>)} 
                   
                  </div>


                  </div>
                  

                
                </div>

          ) : ''}

          
      

          {cours.lesson?.map((lesson) => (
            <div className='flex items-center justify-center' id={lesson.lessonLink}>

              <div className='w-screen max-w-[920px]'>
                
                <Lesson
                  key={lesson.name}
                  name={lesson.name}
                  lessonLink={lesson.lessonLink}
                  pdfLink={lesson.pdfLink}
                  type={lesson.type}
                  publishedAt={lesson.publishedAt}
                  />


              </div>
              

              <label className="checkbox-container mb-10">

                <input
                  type='checkbox'
                  checked={chapterCompletion[cours.name]?.includes(lesson.lessonLink) || false}
                  onChange={(e) => handleCheckboxChange(cours.name, lesson.lessonLink, e.target.checked)}
                />  
                <span className="checkmark"></span>

              </label>

              

              
            </div>
            
          ))}

          
          <hr className=" min-w-[170px] w-1/4 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>
 
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


/* PERMETTRE A L'UTILISATEUR D'ALLER JUSQUA LA DERNIERE LECON COCHEE COMME COMPLETEE */

const scrollToLastCompletedLesson = () => {
  // Recherchez la dernière leçon complétée
  let lastCompletedLesson = null;
  for (const chapterName in chapterCompletion) {
    const completedLessons = chapterCompletion[chapterName];
    if (completedLessons.length > 0) {
      const lastLessonName = completedLessons[completedLessons.length - 1];
      lastCompletedLesson = document.getElementById(lastLessonName);
    }
  }

  // Si une leçon complétée a été trouvée, faites défiler la page jusqu'à elle
  if (lastCompletedLesson) {
    lastCompletedLesson.scrollIntoView({ behavior: 'smooth' });
  }
};


/* BOUTON TOGGLE ORGANISER PAR */

const [showCategories, setShowCategories] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);

  // Add an event listener to the window to handle clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && event.target instanceof Element && !categoryMenuRef.current.contains(event.target)) {
        // Click occurred outside the category menu
        setShowCategories(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);


  /*SUMMARY BUTTON*/

  //Show summary button down to a certain point only
  const [showButton, setShowButton] = useState(false);

  // Add an event listener to track the scroll position
  useEffect(() => {
  const handleScroll = () => {
    const buttonThreshold = document.querySelector('.content')?.getBoundingClientRect().bottom || 0;
    
    if (window.scrollY > buttonThreshold) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

//Toggle summary 
const [showSummaryBtn, setShowSummaryBtn] = useState(false);


  
  return (
    <Layout>
      <div className='mx-5'>
      <div>

      <div>

              <div className='flex flex-col justify-center items-center mt-7 mb-16'>

                <img
                  src={urlFor(programme.mainImage).url()}
                  alt=''
                  className=""
                />
                  
                <h1 className='petit-titre sm:grand-titre-mobile lg:grand-titre'>{programme.title}</h1>
  
              </div>

          
          {programme.introDetailed? (

            <div className='mb-16 py-7 px-6 bg-gris-clair max-w-[1090px] m-auto'>
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
            <div className='max-w-[1090px] m-auto'>
              <h3 className='petit-titre mb-5'>Retrouve également les cours ici:</h3>
              <div className='sm:flex justify-around'>

                {programme.retrouveLesCours?.map((ressource) => (
                  <RetrouveLesCours linkTitle={ressource.linkTitle} linkUrl={ressource.linkUrl} />
                ))} 

              </div>
              
            </div>

          ) : ''}

          

          <hr className="w-40 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>

            <div className='max-w-[430px] m-auto'>

              <div className='flex flex-col items-center justify-center mb-16 p-4 border-3 border-gris-contour rounded-[100px]'>
                <div className='flex flex-col items-center justify-center sm:flex-row'>
                  <p className='petit-texte bold mb-2 sm: mr-2'>Progression globale :</p>
                  <div className='flex items-center'>
                    <progress id='file' max='100' value={calculateGlobalProgress()} className='progress_bar' />
                    <p className='pl-2'>{calculateGlobalProgress()}%</p>
                  </div>
                </div>
              </div>

            </div>
          

          {programme.cours ? (
            <div className='mb-20'>
              <div className='flex justify-between lg:justify-normal items-center mb-5 sm:max-w-[1090px] m-auto'>
                <h3 className='petit-titre lg:mr-10 sm:grand-titre-mobile lg:grand-titre'>Sommaire</h3>
                <div className=''>
                  <div className='border-3 border-gris-contour' ref={categoryMenuRef}>
                    <div className='flex items-center py-2.5 px-3 sm:px-5 cursor-pointer' onClick={() => setShowCategories(!showCategories)}>
                      <p className='petit-texte pr-1'>Organiser par...</p>
                      <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9549 10.5L0.909668 1.52535L1.94312 0.5L9.9549 8.44927L17.9667 0.5L19.0001 1.52535L9.9549 10.5Z" fill="#1C1B1F"/>
                      </svg>  
                    </div>
                    
                  </div>
                </div>

                {showCategories && (


                <div className='absolute right-0 lg:right-[650px] z-10 sm:mr-5 mt-[300px] w-screen max-w-[330px] bg-white border-gris-contour border-3 mx-auto'>

                      <div onClick={() => {
                        setShowOrderByPublication(false);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(false));

                      }}>
                        <div className='flex items-center'>
                                      <div className='mx-5'>
                                        {showOrderByPublication && <svg className='ml-3' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="5" r="5" fill="#C3CFD9"/>
                                        </svg>
                                        }

                                        {!showOrderByPublication && <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.85416 14.8748L0.8125 7.83316L2.30206 6.34357L7.85416 11.8957L19.6771 0.0727234L21.1667 1.56232L7.85416 14.8748Z" fill="#1AAE9F"/>
                                        </svg>
                                        }

                                      </div>
                                      <div className='p-3 cursor-pointer'>
                                        <p className='bold'>Catégorie</p>
                                        <p className='text-texte-clair'>Les  leçons sont organisées par thèmes séparés</p>  
                                      </div>                    
                          </div>
                      </div>

                      <div onClick={() => {
                        setShowOrderByPublication(true);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(true));

                      }}>
                          <div className='flex items-center'>
                            <div className='mx-5'>
                                        {!showOrderByPublication && <svg className='ml-3' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="5" r="5" fill="#C3CFD9"/>
                                        </svg>
                                        }

                                        {showOrderByPublication && <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.85416 14.8748L0.8125 7.83316L2.30206 6.34357L7.85416 11.8957L19.6771 0.0727234L21.1667 1.56232L7.85416 14.8748Z" fill="#1AAE9F"/>
                                        </svg>
                                        }
                            </div>
                            <div className='p-3 cursor-pointer'>
                              <p className='bold'>Ordre de publication</p>
                              <p className='text-texte-clair'>Les  thèmes sont mélangés selon un ordre logique pour combiner leur bénéfices</p>  
                            </div>                    
                        </div>
                                                
                      </div>

                      

                </div>
                

                )}
                
              </div>

              <div className='relative'>
                {programme.cours?.map((cours) => {

                  const chapterName = cours.name;
                  const progress = calculateChapterProgress(chapterName); // Calculer la progression du chapitre
                  
                  return (
                  <div key={cours.name} className='sm:max-w-[1090px] m-auto'>
                    <div className='flex justify-between sm:justify-normal'>
                      <Link href={`#${cours.slug.current}`} onClick={() => {
                        
                        setShowOrderByPublication(false);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(false));
                      }}>

                        <p className='cursor-pointer mb-3.5 text-gris-foncé underline bold'>
                          {cours.name}
                        </p>  
                      </Link>
                      <div>
                        <p className='text-vert opacity-50 mt-0.5 sm:ml-3'>{progress}%</p>
                      </div>
                      
                    </div>
                  </div>
                )
                
                })}
                <div className='absolute right-0 bottom-0'>
                      <svg className="hidden sm:block lg:hidden" width="132" height="179" viewBox="0 0 132 179" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M140.535 62.0504V176.41L139.86 176.778L133.712 177.101C133.559 177.005 133.381 176.956 133.201 176.962C133.022 176.968 132.848 177.028 132.7 177.135C129.585 177.271 126.467 177.388 123.352 177.55C120.351 177.701 117.35 177.918 114.349 178.069C110.95 178.245 107.548 178.341 104.153 178.554C97.9766 178.947 91.7933 178.922 85.61 178.984C80.1655 179.032 74.7209 178.958 69.2728 178.933C68.9177 178.933 68.5945 178.878 68.2571 178.852L63.8141 178.922L61.7826 178.881L53.5891 178.558L52.9179 178.536L47.1289 178.212L46.4576 178.183C43.9715 177.962 41.4855 177.771 38.9994 177.506C34.9411 177.075 30.8841 176.616 26.8282 176.131C22.8892 175.642 18.9816 174.913 15.1258 173.947C12.5213 173.362 9.97285 172.536 7.51124 171.479C6.16132 170.876 4.85563 170.172 3.60453 169.372C2.7499 168.797 1.9776 168.1 1.31024 167.302C-0.0571126 165.721 -0.319943 163.849 0.361956 161.874C0.636383 161.105 1.00397 160.375 1.45586 159.701C2.30113 158.425 3.94196 157.127 5.28445 156.392C8.64778 154.553 12.2774 153.678 16.003 153.156C17.6296 152.928 19.274 152.854 20.9113 152.696C21.4725 152.641 22.03 152.542 22.5912 152.461H29.0692C29.3951 152.552 29.7277 152.615 30.0636 152.648C35.4549 152.81 40.7787 153.612 46.0989 154.424L49.3628 155.094C48.1375 154.494 47.2034 153.961 46.1309 153.792C44.7422 153.134 43.35 152.483 41.9685 151.814C41.5103 151.593 41.0806 151.321 40.6366 151.078C40.2604 150.971 39.8914 150.839 39.5321 150.681C36.0906 148.894 32.6563 147.089 29.2326 145.298C27.8439 144.562 26.4446 143.893 25.0488 143.191L24.6191 142.97C24.0011 142.235 23.0706 142.04 22.3106 141.547C21.8453 141.249 21.2913 141.087 20.8651 140.569L23.9763 138.341C24.132 138.309 24.2819 138.252 24.4202 138.171C24.5517 138.054 24.85 138.021 24.6972 137.627L23.955 137.708L19.5369 137.962L18.1872 138.006C17.239 137.962 16.2303 138.109 15.346 137.815C14.5433 137.546 13.8934 136.796 13.1724 136.267C12.5586 135.773 11.8713 135.385 11.1374 135.119C11.1338 135.068 11.1162 135.019 11.0866 134.978C11.057 134.937 11.0167 134.906 10.9705 134.888C10.8497 134.696 10.7716 134.45 10.6153 134.332C9.50173 133.473 8.51061 132.455 7.67109 131.31C7.22412 130.725 6.86492 130.075 6.60562 129.379C5.77811 127.144 6.28599 125.22 7.85933 123.58C8.69789 122.649 9.74592 121.947 10.9101 121.536C13.3081 120.723 15.8249 120.349 18.347 120.433C19.2776 121.389 19.6185 122.823 20.478 123.893C20.4977 124.142 20.5794 124.382 20.715 124.589C20.8507 124.796 21.0358 124.962 21.2522 125.073C21.2025 124.595 21.1635 124.217 21.1244 123.834C21.167 122.797 20.7088 121.779 21.0143 120.617C21.2842 120.617 21.5506 120.561 21.8169 120.565C24.4806 120.606 27.1443 120.72 29.8079 120.683C36.3295 120.547 42.8228 121.609 48.9863 123.819C49.3415 123.952 49.7464 124.044 50.1299 124.154C50.4851 124.57 50.9752 124.588 51.4511 124.658C52.6556 125.347 53.9571 125.836 55.3081 126.107C54.2214 125.371 53.1772 124.573 51.8986 124.228L49.8956 123.055C48.1482 121.867 46.3973 120.69 44.6641 119.48C44.2819 119.227 43.9552 118.894 43.7052 118.502C43.3003 117.807 42.9949 117.031 42.6184 116.241C42.8755 116.002 43.1511 115.786 43.4424 115.594C44.0923 115.226 44.7635 114.928 45.4277 114.597C47.3562 113.898 47.3562 113.898 48.063 113.086L45.4312 113.233C44.4332 113.203 43.4388 113.159 42.4444 113.152C41.9511 113.163 41.4628 113.047 41.0238 112.814C40.8511 112.724 40.706 112.587 40.6049 112.417C40.5038 112.246 40.4508 112.05 40.4519 111.85C39.1094 110.437 37.8656 108.927 36.7299 107.331C35.7781 106.048 34.8014 104.786 33.9597 103.419C32.5005 101.133 31.2338 98.7216 30.1738 96.2113C29.5823 94.7496 29.1614 93.2202 28.92 91.6553C28.7515 90.5493 28.8255 89.4182 29.1367 88.3458C29.308 87.5979 29.6816 86.9161 30.2138 86.3801C30.7459 85.8442 31.4145 85.4763 32.1413 85.3195C33.3071 85.049 34.511 85.0029 35.6929 85.1835C38.1096 85.506 40.4838 86.1079 42.7711 86.9779C47.1253 88.64 51.4476 90.394 55.7876 92.0965C56.0855 92.1892 56.3596 92.35 56.5895 92.5671C56.8194 92.7841 56.9993 93.0518 57.1159 93.3504C57.4391 94.2219 57.7835 95.0824 58.1174 95.9502L59.7121 99.1751L60.1169 100.569C60.1169 100.679 60.1169 100.83 60.1738 100.896C60.2306 100.962 60.465 101.15 60.5289 101.109C60.8024 100.973 60.7384 100.767 60.5289 100.591L60.3265 99.1199C60.188 97.4946 60.0494 95.873 59.9003 94.1006C60.25 94.1371 60.5959 94.206 60.9338 94.3065C62.9795 95.1706 64.9932 96.1157 67.0531 96.9247C70.6047 98.322 74.1562 99.7524 77.9209 100.37C78.5875 100.523 79.2803 100.504 79.9382 100.315C80.6769 100.061 80.9752 99.5501 80.6804 98.8441C80.413 98.2645 80.1081 97.7043 79.7677 97.1673C79.4075 96.644 79.0778 96.0988 78.7804 95.5347C77.1538 91.8575 75.5556 88.162 73.9538 84.4738C73.8957 84.3106 73.8483 84.1435 73.8117 83.9737C72.828 81.6019 71.8087 79.2449 70.871 76.8547C67.975 69.6419 65.4731 62.2661 63.3773 54.7623C62.4425 51.4353 61.7305 48.0455 61.2463 44.617C60.9516 42.4019 60.898 40.1595 61.0865 37.9319C61.2108 36.4905 61.772 35.2145 62.3722 33.9533C62.5945 33.6218 62.9004 33.3598 63.2565 33.1958C64.7127 32.3427 66.286 32.328 67.8736 32.5817C71.4661 33.1903 74.9236 34.4633 78.0807 36.3397C81.6819 38.466 85.0526 40.9858 88.1352 43.8559C88.3967 44.0787 88.6062 44.3598 88.7483 44.6781C88.8903 44.9964 88.9612 45.3438 88.9556 45.6944C88.9804 46.7976 89.0444 47.9265 89.0906 49.0406V50.5998C89.2999 50.4917 89.4794 50.3304 89.6123 50.1311C89.7452 49.9318 89.8272 49.7008 89.8506 49.4598L91.2712 47.1543C91.5059 47.3086 91.7302 47.4794 91.9425 47.6654C93.0363 48.7685 94.1255 49.8803 95.2099 51.0006C95.3767 51.1586 95.5192 51.3421 95.6325 51.5448C96.4635 53.2473 98.0298 54.3211 99.0562 55.8581C99.344 56.2064 99.668 56.5208 100.022 56.7958C100.003 56.9028 100.008 57.0129 100.035 57.118C100.062 57.2231 100.111 57.3207 100.179 57.4037C100.247 57.4867 100.332 57.5531 100.428 57.598C100.523 57.643 100.627 57.6654 100.733 57.6636C100.811 58.274 101.262 58.5866 101.67 58.9285C101.69 59.0429 101.69 59.1599 101.67 59.2742L102.427 59.8772C103.023 60.8811 103.577 61.9217 104.618 62.5321C104.78 63.1477 105.076 63.7164 105.485 64.1942C105.712 64.7752 105.996 65.2717 106.905 65.2422L106.369 64.22L105.378 62.4182C105.215 61.9254 105.08 61.4216 104.881 60.9473C104.021 58.8366 103.141 56.7369 102.277 54.6262C102.16 54.2989 102.06 53.965 101.979 53.6261C101.871 53.4939 101.779 53.3496 101.702 53.1959C99.2445 46.8785 97.0531 40.4655 95.6858 33.7878C95.217 31.4969 94.9399 29.1656 94.6203 26.8453C94.5845 26.3017 94.5845 25.7562 94.6203 25.2126C96.0409 24.7272 97.5397 24.8449 98.9532 24.4772C99.1734 24.5728 99.4149 24.5728 99.4327 24.2897C99.4327 24.1757 99.1556 24.047 99.0065 23.9219C97.6315 22.7922 96.1968 21.7426 94.7091 20.778C94.6513 20.6337 94.6247 20.4781 94.631 20.322C94.818 18.2149 95.3275 16.152 96.1404 14.2106C97.0851 12.0484 98.7224 10.5334 100.367 8.99636C103.087 7.63581 105.857 6.81579 108.89 7.92997C110.443 8.502 111.906 9.30868 113.23 10.3238C115.411 12.0252 117.37 14.0114 119.059 16.233C120.124 17.6046 121.115 19.0387 122.141 20.447C122.172 20.7278 122.161 21.0117 122.109 21.2891C121.712 22.3923 121.815 23.5175 121.8 24.6427C121.751 24.6684 121.673 24.6831 121.655 24.7272C121.026 26.2202 120.898 27.8087 120.824 29.4524C121.598 28.7958 122.263 28.0119 122.791 27.1321C122.887 26.963 122.791 26.6835 122.791 26.4518C123.281 26.4518 123.587 26.1283 123.942 25.8378C124.798 25.1354 125.121 25.2678 125.551 26.4408C125.781 26.6026 125.986 26.7997 126.158 27.0255C126.986 28.5625 127.781 30.118 128.591 31.6624C129.301 32.9972 130.012 34.3247 130.722 35.6595C130.828 35.8586 130.924 36.0636 131.01 36.2735C131.223 36.8141 131.365 37.3767 131.631 37.8988C133.339 41.4105 134.888 44.9921 136.305 48.6398C136.852 50.0519 137.456 51.4418 137.992 52.8612C138.503 54.2181 139.018 55.5823 139.413 56.9796C139.768 58.1563 139.626 59.3257 138.731 60.256C138.364 60.6973 137.926 61.0704 137.438 61.3591C137.928 61.1238 138.926 62.4623 139.484 62.3851C139.852 62.3481 140.21 62.2343 140.535 62.0504Z" fill="url(#paint0_linear_281_5409)"/>
                      <path d="M138.759 25.8341C139.342 25.9732 139.936 26.0532 140.534 26.0731V62.0505C140.205 62.2349 139.842 62.3476 139.469 62.3814C138.911 62.4476 137.913 61.1202 137.423 61.3555C137.912 61.0667 138.349 60.6937 138.716 60.2524C139.611 59.3221 139.735 58.1527 139.398 56.976C138.997 55.5787 138.482 54.2145 137.977 52.8576C137.441 51.4382 136.837 50.0482 136.29 48.6362C134.87 44.9885 133.325 41.4069 131.617 37.8952C131.364 37.3767 131.208 36.7921 130.995 36.2699C130.91 36.06 130.814 35.855 130.707 35.6558C129.997 34.321 129.287 32.9936 128.576 31.6588C127.767 30.1143 126.971 28.5589 126.144 27.0219C125.971 26.7961 125.766 26.5989 125.536 26.4372C125.107 25.2642 124.783 25.1318 123.927 25.8341C123.572 26.1246 123.267 26.4593 122.777 26.4482L121.786 24.639C121.786 23.5138 121.697 22.3813 122.095 21.2855C122.147 21.0081 122.158 20.7241 122.127 20.4434C123.367 20.2425 124.636 20.369 125.817 20.8111C127.685 21.4951 129.542 22.2097 131.389 22.9549C131.689 23.1039 131.945 23.3322 132.131 23.6168C132.348 23.959 132.54 24.318 132.703 24.6905C132.7 24.9368 132.762 25.1792 132.882 25.3918C133.002 25.6043 133.176 25.7789 133.385 25.8966C133.307 25.3966 133.25 25.0325 133.197 24.6648C133.243 24.4515 133.293 24.2382 133.367 23.8999C133.723 24.0029 133.957 24.0654 134.202 24.1573C135.726 24.6979 137.228 25.3156 138.759 25.8341Z" fill="#EE6D10"/>
                      <defs>
                      <linearGradient id="paint0_linear_281_5409" x1="24.2462" y1="61.6827" x2="137.123" y2="148.522" gradientUnits="userSpaceOnUse">
                      <stop offset="0.01" stop-color="#F39008"/>
                      <stop offset="1" stop-color="#EE6C10"/>
                      </linearGradient>
                      </defs>
                      </svg>

                      <svg className="hidden lg:block" width="278" height="330" viewBox="0 0 278 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M277.531 105.209V324.912L276.199 325.618L264.058 326.24C263.755 326.054 263.404 325.961 263.049 325.973C262.694 325.984 262.35 326.099 262.059 326.304C255.908 326.565 249.75 326.791 243.599 327.102C237.672 327.392 231.746 327.808 225.819 328.098C219.107 328.437 212.388 328.621 205.683 329.031C193.486 329.786 181.275 329.737 169.064 329.857C158.312 329.949 147.56 329.808 136.801 329.758C136.1 329.758 135.462 329.652 134.796 329.603L126.021 329.737L122.01 329.659L105.829 329.038L104.503 328.995L93.0711 328.374L91.7455 328.317C86.8359 327.893 81.9264 327.526 77.0168 327.017C69.0025 326.188 60.9905 325.308 52.9808 324.375C45.2021 323.437 37.4853 322.035 29.8708 320.179C24.7274 319.056 19.6946 317.47 14.8334 315.439C12.1675 314.28 9.589 312.927 7.1183 311.391C5.43057 310.285 3.90541 308.946 2.58748 307.413C-0.112787 304.376 -0.631831 300.78 0.714797 296.986C1.25674 295.508 1.98266 294.105 2.87507 292.811C4.54433 290.36 7.78467 287.866 10.4358 286.453C17.0778 282.921 24.2458 281.24 31.6031 280.237C34.8154 279.799 38.0628 279.657 41.2961 279.354C42.4043 279.248 43.5054 279.057 44.6136 278.901H57.4065C58.05 279.077 58.7068 279.197 59.3703 279.262C70.0171 279.573 80.5306 281.113 91.0371 282.674L97.4828 283.96C95.063 282.808 93.2184 281.784 91.1002 281.459C88.3579 280.194 85.6085 278.944 82.8802 277.658C81.9754 277.234 81.1268 276.712 80.2501 276.245C79.507 276.04 78.7783 275.785 78.0688 275.482C71.2726 272.049 64.4903 268.58 57.7291 265.14C54.9868 263.727 52.2234 262.441 49.467 261.092L48.6183 260.668C47.398 259.255 45.5604 258.881 44.0594 257.934C43.1406 257.362 42.0466 257.051 41.2049 256.055L47.3489 251.774C47.6564 251.713 47.9524 251.604 48.2256 251.449C48.4851 251.223 49.0742 251.16 48.7726 250.404L47.3068 250.559L38.5818 251.047L35.9166 251.131C34.0439 251.047 32.052 251.329 30.3056 250.764C28.7205 250.248 27.437 248.807 26.0132 247.79C24.801 246.841 23.4437 246.096 21.9944 245.586C21.9873 245.488 21.9525 245.394 21.8941 245.315C21.8356 245.236 21.7561 245.175 21.6647 245.141C21.4262 244.773 21.2719 244.3 20.9633 244.074C18.7642 242.423 16.8069 240.468 15.149 238.267C14.2664 237.144 13.557 235.894 13.0449 234.558C11.4107 230.263 12.4137 226.568 15.5208 223.418C17.1768 221.628 19.2464 220.279 21.5455 219.49C26.2812 217.927 31.2514 217.21 36.2321 217.37C38.0697 219.207 38.743 221.962 40.4404 224.018C40.4793 224.497 40.6406 224.957 40.9085 225.355C41.1764 225.752 41.5419 226.073 41.9694 226.286C41.8712 225.367 41.794 224.64 41.7169 223.905C41.8011 221.913 40.8963 219.956 41.4994 217.724C42.0325 217.724 42.5585 217.618 43.0845 217.625C48.3448 217.702 53.6051 217.921 58.8653 217.851C71.7443 217.589 84.5674 219.63 96.7393 223.877C97.4406 224.131 98.2402 224.308 98.9977 224.52C99.699 225.318 100.667 225.353 101.607 225.487C103.985 226.811 106.556 227.75 109.224 228.271C107.077 226.858 105.015 225.325 102.491 224.661L98.5348 222.407C95.0841 220.126 91.6263 217.865 88.2037 215.541C87.4489 215.055 86.8037 214.415 86.3099 213.662C85.5104 212.326 84.9072 210.836 84.1638 209.317C84.6715 208.858 85.2157 208.443 85.7909 208.074C87.0744 207.367 88.4 206.795 89.7115 206.159C93.52 204.817 93.52 204.817 94.9157 203.256L89.7186 203.538C87.7477 203.482 85.7839 203.397 83.8201 203.383C82.8459 203.404 81.8816 203.181 81.0146 202.733C80.6736 202.562 80.387 202.297 80.1874 201.97C79.9878 201.643 79.8832 201.266 79.8853 200.882C77.234 198.167 74.7777 195.266 72.535 192.2C70.6553 189.734 68.7266 187.311 67.0644 184.683C64.1827 180.292 61.6812 175.66 59.5878 170.837C58.4198 168.029 57.5886 165.091 57.1119 162.084C56.7791 159.96 56.9253 157.787 57.5397 155.726C57.8781 154.29 58.6159 152.98 59.6668 151.95C60.7177 150.92 62.0381 150.214 63.4734 149.912C65.7756 149.393 68.153 149.304 70.4871 149.651C75.2597 150.271 79.9483 151.427 84.4653 153.098C93.0641 156.292 101.6 159.661 110.171 162.932C110.759 163.11 111.3 163.419 111.754 163.836C112.208 164.253 112.563 164.767 112.794 165.341C113.432 167.015 114.112 168.668 114.771 170.336L117.921 176.531L118.72 179.208C118.72 179.42 118.72 179.71 118.832 179.837C118.945 179.964 119.408 180.325 119.534 180.247C120.074 179.986 119.948 179.59 119.534 179.251L119.134 176.425C118.86 173.303 118.587 170.187 118.292 166.782C118.983 166.852 119.666 166.985 120.333 167.178C124.373 168.838 128.35 170.654 132.418 172.208C139.432 174.892 146.445 177.64 153.88 178.827C155.196 179.121 156.564 179.084 157.864 178.721C159.322 178.234 159.912 177.252 159.329 175.895C158.801 174.782 158.199 173.706 157.527 172.674C156.816 171.668 156.164 170.621 155.577 169.537C152.365 162.473 149.209 155.373 146.046 148.288C145.931 147.974 145.837 147.653 145.765 147.327C143.822 142.77 141.809 138.242 139.958 133.65C134.238 119.793 129.298 105.623 125.159 91.2071C123.313 84.8154 121.907 78.303 120.951 71.7164C120.369 67.4607 120.263 63.1527 120.635 58.8733C120.88 56.1041 121.989 53.6527 123.174 51.2296C123.613 50.5928 124.217 50.0894 124.92 49.7743C127.796 48.1354 130.903 48.1071 134.038 48.5946C141.133 49.7639 147.961 52.2094 154.195 55.8144C161.307 59.8994 167.964 64.7402 174.051 70.2541C174.568 70.6822 174.981 71.2222 175.262 71.8337C175.542 72.4453 175.682 73.1127 175.671 73.7863C175.72 75.9056 175.847 78.0743 175.938 80.2149V83.2102C176.351 83.0026 176.706 82.6928 176.968 82.3098C177.231 81.9269 177.393 81.4832 177.439 81.0202L180.244 76.5909C180.708 76.8874 181.151 77.2154 181.57 77.5728C183.73 79.6921 185.881 81.8279 188.022 83.9802C188.352 84.2838 188.633 84.6364 188.857 85.0258C190.498 88.2966 193.591 90.3594 195.618 93.3123C196.187 93.9814 196.826 94.5855 197.526 95.1137C197.489 95.3194 197.497 95.5308 197.551 95.7328C197.604 95.9347 197.701 96.1222 197.836 96.2817C197.97 96.4412 198.137 96.5687 198.326 96.655C198.516 96.7413 198.721 96.7843 198.929 96.7809C199.083 97.9536 199.974 98.5541 200.78 99.2111C200.819 99.4307 200.819 99.6555 200.78 99.8751L202.274 101.034C203.453 102.962 204.547 104.962 206.602 106.134C206.921 107.317 207.507 108.409 208.313 109.327C208.762 110.444 209.323 111.397 211.119 111.341L210.06 109.377L208.103 105.915C207.78 104.969 207.514 104.001 207.121 103.089C205.423 99.0345 203.684 95.0007 201.98 90.9457C201.748 90.3169 201.551 89.6754 201.391 89.0242C201.178 88.7702 200.995 88.493 200.844 88.1977C195.99 76.061 191.663 63.7407 188.962 50.9117C188.036 46.5106 187.489 42.0317 186.858 37.5741C186.787 36.5298 186.787 35.4818 186.858 34.4375C189.664 33.505 192.623 33.731 195.415 33.0246C195.85 33.2083 196.327 33.2083 196.362 32.6643C196.362 32.4453 195.815 32.1981 195.52 31.9579C192.805 29.7874 189.971 27.771 187.034 25.9178C186.919 25.6406 186.867 25.3416 186.879 25.0418C187.249 20.9937 188.255 17.0306 189.86 13.3008C191.726 9.14689 194.959 6.23636 198.206 3.28343C203.579 0.669598 209.05 -0.905783 215.039 1.23473C218.106 2.3337 220.994 3.88345 223.61 5.83367C227.916 9.10233 231.785 12.9181 235.119 17.1862C237.224 19.8212 239.18 22.5764 241.207 25.282C241.268 25.8214 241.247 26.3669 241.144 26.8998C240.359 29.0191 240.562 31.1808 240.534 33.3425C240.436 33.392 240.281 33.4202 240.246 33.505C239.005 36.3731 238.752 39.425 238.605 42.5828C240.134 41.3213 241.447 39.8154 242.491 38.1251C242.68 37.8002 242.491 37.2632 242.491 36.8182C243.459 36.8182 244.062 36.1965 244.763 35.6384C246.454 34.2891 247.092 34.5435 247.94 36.797C248.395 37.1078 248.799 37.4865 249.14 37.9202C250.774 40.8732 252.345 43.8614 253.944 46.8285C255.347 49.3929 256.75 51.9431 258.152 54.5075C258.363 54.8901 258.552 55.2839 258.72 55.6872C259.141 56.7257 259.422 57.8066 259.948 58.8097C263.321 65.5562 266.379 72.437 269.178 79.4449C270.258 82.1576 271.45 84.8279 272.509 87.5548C273.519 90.1616 274.536 92.7825 275.315 95.4669C276.016 97.7276 275.736 99.974 273.968 101.761C273.243 102.609 272.38 103.326 271.415 103.881C272.383 103.429 274.354 106 275.455 105.852C276.183 105.781 276.889 105.562 277.531 105.209Z" fill="url(#paint0_linear_178_1882)"/>
                      <defs>
                      <linearGradient id="paint0_linear_178_1882" x1="47.8819" y1="104.502" x2="266.196" y2="277.149" gradientUnits="userSpaceOnUse">
                      <stop offset="0.01" stop-color="#F39008"/>
                      <stop offset="1" stop-color="#EE6C10"/>
                      </linearGradient>
                      </defs>
                      </svg>


                </div>
              </div>

              {/* Button to navigate to the last completed chapter */}
              <div className='flex items-center mt-6 max-w-[1090px] m-auto'>
                
                <button onClick={scrollToLastCompletedLesson} className='underline bold text-vert opacity-70 pr-1'>Aller au dernier cours vu</button>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#1AAE9F" fill-opacity="0.5"/>
                </svg>

              </div>

            </div>
          ) : ''}



          <div>

          <div className='content'>
            {showButton && (

              <div className='fixed-button z-10'
              
              onClick={() => {
                        setShowSummaryBtn(!showSummaryBtn);
                        console.log("ça marche 2")

              }} 
              
              >

                <svg width="23" height="11" viewBox="0 0 23 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.891013 11C0.642185 11 0.431476 10.9265 0.258886 10.7794C0.0862953 10.6324 0 10.4502 0 10.2329C0 10.0155 0.0841641 9.83144 0.252493 9.68068C0.420821 9.52992 0.629399 9.45454 0.878228 9.45454C1.12706 9.45454 1.33777 9.52806 1.51036 9.67509C1.68295 9.82213 1.76924 10.0043 1.76924 10.2217C1.76924 10.439 1.68508 10.6231 1.51675 10.7739C1.34842 10.9246 1.13984 11 0.891013 11ZM0.891013 6.27273C0.642185 6.27273 0.431476 6.19921 0.258886 6.05218C0.0862953 5.90514 0 5.72294 0 5.50559C0 5.28823 0.0841641 5.10417 0.252493 4.95341C0.420821 4.80265 0.629399 4.72727 0.878228 4.72727C1.12706 4.72727 1.33777 4.80079 1.51036 4.94782C1.68295 5.09486 1.76924 5.27706 1.76924 5.49442C1.76924 5.71177 1.68508 5.89583 1.51675 6.04659C1.34842 6.19735 1.13984 6.27273 0.891013 6.27273ZM0.891013 1.54546C0.642185 1.54546 0.431476 1.47194 0.258886 1.32491C0.0862953 1.17787 0 0.995671 0 0.778315C0 0.560959 0.0841641 0.376901 0.252493 0.22614C0.420821 0.07538 0.629399 0 0.878228 0C1.12706 0 1.33777 0.0735188 1.51036 0.220557C1.68295 0.367594 1.76924 0.549791 1.76924 0.767147C1.76924 0.984503 1.68508 1.16856 1.51675 1.31932C1.34842 1.47008 1.13984 1.54546 0.891013 1.54546ZM5.04752 10.8182V9.63636H23V10.8182H5.04752ZM5.04752 6.09091V4.90909H23V6.09091H5.04752ZM5.04752 1.36364V0.181822H23V1.36364H5.04752Z" fill="#424242"/>
                </svg>

              </div>  
            )}
            
          </div>

         
          {showSummaryBtn && (

            <div className='bg-white h-screen z-50 w-screen fixed top-0 right-0 sm:max-w-[430px] sm:h-[730px] effet-gris rounded-3xl'>
            
            <svg 
              onClick={() => {setShowSummaryBtn(false)}} 
              className='absolute top-10 right-10 cursor-pointer' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.26634 18.5417L0.458008 16.7334L7.69134 9.50004L0.458008 2.26671L2.26634 0.458374L9.49967 7.69171L16.733 0.458374L18.5413 2.26671L11.308 9.50004L18.5413 16.7334L16.733 18.5417L9.49967 11.3084L2.26634 18.5417Z" fill="#424242"/>
            </svg>



            {programme.cours ? (
            <div className='p-10 mt-16 sm:mt-0'>
              <div className='flex sm:flex-col sm:items-start justify-between lg:justify-normal items-center mb-5 sm:max-w-[1090px] m-auto'>
                <h3 className='petit-titre sm:mb-3 lg:mr-10 sm:grand-titre-mobile lg:grand-titre'>Sommaire</h3>
                <div className=''>
                  <div className='border-3 border-gris-contour' ref={categoryMenuRef}>
                    <div className='flex items-center py-2.5 px-3 sm:px-5 cursor-pointer' onClick={() => setShowCategories(!showCategories)}>
                      <p className='petit-texte pr-1'>Organiser par...</p>
                      <svg width="19" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.9549 10.5L0.909668 1.52535L1.94312 0.5L9.9549 8.44927L17.9667 0.5L19.0001 1.52535L9.9549 10.5Z" fill="#1C1B1F"/>
                      </svg>  
                    </div>
                    
                  </div>
                </div>

                {showCategories && (


                <div className='absolute right-0 z-10 mt-[300px] sm:mt-[125px] w-screen max-w-[330px] bg-white border-gris-contour border-3 mx-auto sm:mr-[60px]'>

                      <div onClick={() => {
                        setShowOrderByPublication(false);
                        setShowSummaryBtn(false);
                        setShowCategories(false);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(false));

                      }}>
                        <div className='flex items-center'>
                                      <div className='mx-5'>
                                        {showOrderByPublication && <svg className='ml-3' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="5" r="5" fill="#C3CFD9"/>
                                        </svg>
                                        }

                                        {!showOrderByPublication && <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.85416 14.8748L0.8125 7.83316L2.30206 6.34357L7.85416 11.8957L19.6771 0.0727234L21.1667 1.56232L7.85416 14.8748Z" fill="#1AAE9F"/>
                                        </svg>
                                        }

                                      </div>
                                      <div className='p-3 cursor-pointer'>
                                        <p className='bold'>Catégorie</p>
                                        <p className='text-texte-clair'>Les  leçons sont organisées par thèmes séparés</p>  
                                      </div>                    
                          </div>
                      </div>

                      <div onClick={() => {
                        setShowOrderByPublication(true);
                        setShowSummaryBtn(false);
                        setShowCategories(false);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(true));

                      }}>
                          <div className='flex items-center'>
                            <div className='mx-5'>
                                        {!showOrderByPublication && <svg className='ml-3' width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="5" r="5" fill="#C3CFD9"/>
                                        </svg>
                                        }

                                        {showOrderByPublication && <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.85416 14.8748L0.8125 7.83316L2.30206 6.34357L7.85416 11.8957L19.6771 0.0727234L21.1667 1.56232L7.85416 14.8748Z" fill="#1AAE9F"/>
                                        </svg>
                                        }
                            </div>
                            <div className='p-3 cursor-pointer'>
                              <p className='bold'>Ordre de publication</p>
                              <p className='text-texte-clair'>Les  thèmes sont mélangés selon un ordre logique pour combiner leur bénéfices</p>  
                            </div>                    
                        </div>
                                                
                      </div>

                      

                </div>
                

                )}
                
              </div>

              <div className='relative'>
                {programme.cours?.map((cours) => {

                  const chapterName = cours.name;
                  const progress = calculateChapterProgress(chapterName); // Calculer la progression du chapitre
                  
                  return (
                  <div key={cours.name} className='sm:max-w-[1090px] m-auto'>
                    <div className='flex justify-between sm:justify-normal'>
                      <Link href={`#${cours.slug.current}`} onClick={() => {
                        
                        setShowOrderByPublication(false);
                        setShowSummaryBtn(false);
                        // Sauvegardez la préférence de l'utilisateur dans localStorage
                        localStorage.setItem('showOrderByPublication', JSON.stringify(false));
                      }}>

                        <p className='cursor-pointer mb-3.5 text-gris-foncé underline bold'>
                          {cours.name}
                        </p>  
                      </Link>
                      <div>
                        <p className='text-vert opacity-50 mt-0.5 sm:ml-3'>{progress}%</p>
                      </div>
                      
                    </div>
                  </div>
                )
                
                })}
                
              </div>

              {/* Button to navigate to the last completed chapter */}
              <div className='flex items-center mt-6 max-w-[1090px] m-auto'>
                
                <button onClick={() => {
                        
                        scrollToLastCompletedLesson();
                        setShowSummaryBtn(false);
                      }} 
                      
                      className='underline bold text-vert opacity-70 pr-1'>Aller au dernier cours vu</button>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#1AAE9F" fill-opacity="0.5"/>
                </svg>

              </div>

            </div>
          ) : ''}
              
            </div>

          )}
            
          




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
                          
                          <hr className=" min-w-[170px] w-1/4 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>

                          <div className='sm:flex items-center justify-between max-w-[1090px] m-auto lg:mb-14'>
                            <div className='flex items-center justify-between'>
                              <h3 className="petit-titre mb-3 lg:grand-titre">{chapterName}</h3>
                              <label className='checkbox-container sm:mb-10 sm:ml-4'>
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
                                <span className="checkmark"></span>

                              </label>
                              

                            

                            </div>

                            <div className='flex flex-col lg:flex-row lg:items-center'>
                              <p className='hidden sm:block bold lg:petit-titre'>Progression:</p>
                              <div className='flex items-center mb-10 lg:mb-0 lg:ml-2'>
                                <progress id='file' max='100' value={calculateChapterProgress(chapterName)} className='progress_bar' />
                                <p className='pl-2'>{calculateChapterProgress(chapterName)}%</p>
                              </div> 

                            </div>

                            

                          </div>
                          
                          
                          
                {chapterRessources ? (
                            <div className='mb-16 py-7 px-6 bg-gris-clair max-w-[1090px] m-auto'>
                                  <h4 className='petit-titre sm:mb-6'>📚Ressources utiles</h4>
                                  <div className='sm:flex justify-around items-center'>

                                    {chapterRessources?.map((ressource) => (
                                    <div>


                                      {ressource.type === 'pdf' && (
                                                  <Pdf
                                                    linkTitle={ressource.linkTitle}
                                                    linkUrl={ressource.linkUrl}
                                                    type={ressource.type}
                                                  />
                                      )}
                                      
                                      {ressource.type === 'schema' && (
                                                  <Schema
                                                    linkTitle={ressource.linkTitle}
                                                    linkUrl={ressource.linkUrl}
                                                    type={ressource.type}
                                                  />
                                      )}  
                                                            
                                    </div>
                                      
                                  ))}

                                  <div className='flex flex-col items-center justify-center'>
                                    <div className='flex items-center justify-center mt-4 bg-white border-gris-contour border-3 w-[225px] mx-auto py-3'>
                                      {chapterRessources?.map((ressource) => (
                                        <div>
                                          {ressource.type === 'anki' && (
                                            <a href={ressource.linkUrl} className='flex items-center'>
                                                <p className='bold underline text-gris-foncé mr-1'>{ressource.linkTitle}</p>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#424242"/>
                                                </svg>
                                                
                                                <svg className='mx-3' width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.083 19.5834H10.4163C7.76495 19.5834 5.50488 18.649 3.63613 16.7803C1.76738 14.9115 0.833008 12.6515 0.833008 10.0001C0.833008 7.34869 1.76738 5.08862 3.63613 3.21987C5.50488 1.35112 7.76495 0.416748 10.4163 0.416748H18.083V4.25008H10.4163C8.81912 4.25008 7.46148 4.80911 6.34342 5.92717C5.22537 7.04522 4.66634 8.40286 4.66634 10.0001C4.66634 11.5973 5.22537 12.9549 6.34342 14.073C7.46148 15.1911 8.81912 15.7501 10.4163 15.7501H18.083V19.5834ZM12.333 11.9167V8.08342H27.6663V11.9167H12.333ZM21.9163 19.5834V15.7501H29.583C31.1802 15.7501 32.5379 15.1911 33.6559 14.073C34.774 12.9549 35.333 11.5973 35.333 10.0001C35.333 8.40286 34.774 7.04522 33.6559 5.92717C32.5379 4.80911 31.1802 4.25008 29.583 4.25008H21.9163V0.416748H29.583C32.2344 0.416748 34.4945 1.35112 36.3632 3.21987C38.232 5.08862 39.1663 7.34869 39.1663 10.0001C39.1663 12.6515 38.232 14.9115 36.3632 16.7803C34.4945 18.649 32.2344 19.5834 29.583 19.5834H21.9163Z" fill="#C3CFD9"/>
                                                </svg>

                                            </a>
                                          )}                  

                                          {ressource.type === 'quizlet' && (
                                            <a href={ressource.linkUrl} className='flex items-center'>
                                                <p className='bold underline text-gris-foncé mr-1'>{ressource.linkTitle}</p>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#424242"/>
                                                </svg>
                                            </a>
                                          )}                     
                                        </div>
                                      
                                        ))}
                                    </div>
                                    {chapterRessources && (<p className='mt-3 underline bold text-gris-foncé'>Vocabulaire de ...</p>)} 
                                  
                                  </div>


                                  </div>
                                  

                                
                                </div>

                          ) : ''}

                          <div className='flex items-center justify-center'>

                              <div className='w-screen max-w-[920px]' id={lesson.lessonLink}>
                                
                                <Lesson
                                  key={lesson.name}
                                  name={lesson.name}
                                  lessonLink={lesson.lessonLink}
                                  pdfLink={lesson.pdfLink}
                                  type={lesson.type}
                                  publishedAt={lesson.publishedAt}
                                  />


                              </div>
                              

                              <label className="checkbox-container mb-10">

                                <input
                                  type='checkbox'
                                  checked={chapterCompletion[chapterName]?.includes(lesson.lessonLink) || false}
                                  onChange={(e) => handleCheckboxChange(chapterName, lesson.lessonLink, e.target.checked)}
                                />  
                                <span className="checkmark"></span>

                              </label>

                              
                            </div>
                          

                        </div>
                      );
                    }
                  }


                return (
                  <div key={lesson.name}>
                      
                    {/* Afficher le nom du chapitre uniquement s'il est différent du précédent */}
                    {isDifferentChapter && 
                    <div>

                        <hr className=" min-w-[170px] w-1/4 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>


                        <div className='sm:flex items-center justify-between max-w-[1090px] m-auto lg:mb-14'>
                        <div className='flex items-center justify-between sm:justify-normal'>
                            <h3 className="petit-titre mb-3 lg:grand-titre">{chapterName}</h3>
                            <label className='checkbox-container sm:mb-10 sm:ml-4'>
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
                                    <span className="checkmark"></span>
                            </label> 
                          </div>

                          <div className='flex flex-col lg:flex-row lg:items-center'>
                            <p className='hidden sm:block bold lg:petit-titre'>Progression:</p>
                            <div className='flex items-center mb-10 lg:mb-0 lg:ml-2'>
                              <progress id='file' max='100' value={calculateChapterProgress(chapterName)} className='progress_bar' />
                              <p className='pl-2'>{calculateChapterProgress(chapterName)}%</p>
                            </div> 

                          </div>
                          
                      </div>
                      
                    </div>
                    }

                    
                  <div className='flex items-center justify-center' id={lesson.lessonLink}>

                    <div className='w-screen max-w-[920px]'>
                      
                      <Lesson
                        key={lesson.name}
                        name={lesson.name}
                        lessonLink={lesson.lessonLink}
                        pdfLink={lesson.pdfLink}
                        type={lesson.type}
                        publishedAt={lesson.publishedAt}
                        />


                    </div>
                    

                    <label className="checkbox-container mb-10">

                      <input
                        type='checkbox'
                        checked={chapterCompletion[chapterName]?.includes(lesson.lessonLink) || false}
                        onChange={(e) => handleCheckboxChange(chapterName, lesson.lessonLink, e.target.checked)}
                      />  
                      <span className="checkmark"></span>

                    </label>

                                
                  </div>
                  
                  </div>
                );
                
              })
            : renderDefaultView()}

      </div>  
        </div>

      </div>
      
        </div>  
    </Layout>
    
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