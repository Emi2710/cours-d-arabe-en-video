import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react'
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../../client/sanity';

import Layout from '../../../components/Layout';
import { CoursDetails, LessonType, Programme } from '../../../typings';
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

  const [currentChapterProgress, setCurrentChapterProgress] = useState<LessonProgress>({});

  // Add a state variable to track whether all lessons in the chapter are completed
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);
  
  const handleCourseClick = (course: CoursDetails) => {
    setSelectedCourse(course);

    // Retrieve the progress for the selected chapter from localStorage
    const chapterName = course.name; // Assuming the chapter name is used as the identifier
    const storedProgress = localStorage.getItem(chapterName);

    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setCurrentChapterProgress(parsedProgress);
    } else {
      // If no progress is stored, initialize an empty progress object for the chapter
      setCurrentChapterProgress({});
    }
};



  /*Logique de progression*/
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({});

  const handleLessonComplete = (lessonName: string) => {
    // Update the lesson progress for the current chapter
    const updatedLessonProgress = {
      ...currentChapterProgress,
      [lessonName]: currentChapterProgress[lessonName] === 'completed' ? 'incomplete' : 'completed',
    };

    // Update localStorage with the current chapter's progress
    const chapterName = selectedCourse?.name; // Assuming the chapter name is used as the identifier
    if (chapterName) {
      localStorage.setItem(chapterName, JSON.stringify(updatedLessonProgress));
    }

    // Update the state with the new lesson progress
    setLessonProgress(updatedLessonProgress);
    setCurrentChapterProgress(updatedLessonProgress);
  };



useEffect(() => {
    const storedProgress = localStorage.getItem(selectedCourse?.name || '');

    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      setLessonProgress(parsedProgress);
      setCurrentChapterProgress(parsedProgress);
    } else {
      // If no progress is stored, initialize an empty progress object for the chapter
      setLessonProgress({});
      setCurrentChapterProgress({});
    }
  }, [selectedCourse]);



/*Calculer la progression */
  const totalLessons = selectedCourse?.lesson?.length || 1; // Éviter la division par zéro
  const completedLessons = Object.values(lessonProgress).filter(
    (progress) => progress === 'completed'
  ).length;

  const globalProgress = (completedLessons / totalLessons) * 100;



// Create a function to handle the checkbox state change
const handleAllLessonsCompleteToggle = () => {
  // Check if all lessons are already marked as completed
  const isAllCompleted = Object.values(lessonProgress).every(progress => progress === 'completed');
  
  // If all lessons are already completed, set them all to incomplete; otherwise, mark them as completed
  const updatedLessonProgress: LessonProgress = { ...currentChapterProgress };

  for (const lesson of selectedCourse?.lesson || []) {
  updatedLessonProgress[lesson.name] = isAllCompleted ? 'incomplete' : 'completed';
}


  // Update localStorage with the new lesson progress
  if (selectedCourse) {
  const chapterName = selectedCourse.name;
  if (chapterName) {
    localStorage.setItem(chapterName, JSON.stringify(updatedLessonProgress));
  }
}


  // Update the state variables
  setLessonProgress(updatedLessonProgress);
  setCurrentChapterProgress(updatedLessonProgress);
  setAllLessonsCompleted(!isAllCompleted); // Toggle the checkbox state
};


/* SYSTEME DE TRI DES COURS */

const [showDefaultView, setShowDefaultView] = useState(true);
const [showOrderByPublication, setShowOrderByPublication] = useState(false);

const renderDefaultView = () => {

  console.log('Rendering default view');
  return (
    <div>
      {programme.cours.map((cours) => (
        <div key={cours._id}>
          <h3>{cours.name}</h3>
          {cours.lesson?.map((lesson) => (
            <Lesson
              key={lesson.name}
              name={lesson.name}
              lessonLink={lesson.lessonLink}
              pdfLink={lesson.pdfLink}
              type={lesson.type}
              publishedAt={lesson.publishedAt}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const renderOrderByPublicationView = () => {

  console.log('Rendering orderByPublication view');

  return (
    <div>
      {programme.cours.map((cours) => (
        <div key={cours._id}>
          <h3>{cours.name}</h3>
          {cours.lesson && Array.isArray(cours.lesson) ? (
            cours.lesson
              .slice()
              .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
              .map((lesson) => (
                <Lesson
                  key={lesson.name}
                  name={lesson.name}
                  lessonLink={lesson.lessonLink}
                  pdfLink={lesson.pdfLink}
                  type={lesson.type}
                  publishedAt={lesson.publishedAt}
                />
              ))
          ) : (
            <p>No lessons available.</p>
          )}
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
                      <p className='cursor-pointer mb-3.5 text-gris-foncé underline bold' onClick={() => handleCourseClick(cours)}>
                        {cours.name}
                      </p>
                    </div>
                  </div>
                )
                
                })}
              </div>
            </div>
          ) : ''}



          {selectedCourse ? (
          <div className='mx-5'>
              <h3 className="petit-titre mb-3">{selectedCourse?.name}</h3>
              <div className='flex items-center mb-10'>
              <input
                type='checkbox'
                checked={allLessonsCompleted}
                onChange={handleAllLessonsCompleteToggle}
              />
            </div>

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
                      onChange={() => {
                        console.log('Checkbox clicked');
                        handleLessonComplete(lesson.name);
                      }}
                    />

                </div>
                    
              ))}

              <hr className="w-40 border-2 mx-auto my-16 bg-gris-contour text-gris-contour"/>
              
          </div>
          ) : null} 


          <div>
        {/* Button to toggle between default and publication order */}
        <button onClick={() => setShowOrderByPublication(!showOrderByPublication)}>
          {showOrderByPublication ? 'Afficher par défaut' : 'Afficher par ordre de publication'}
        </button>

        {/* Render lessons based on the selected view */}
        {showOrderByPublication
          ? sortedLessons.map((lesson) => {
              // Function to find the parent course of the lesson
              const findParentCourse = () => {
                for (const course of programme.cours) {
                  if (
                    course.lesson &&
                    course.lesson.some((coursLesson) => coursLesson.name === lesson.name)
                  ) {
                    return course.name; // Return the course name as the chapter name
                  }
                }
                return ''; // Default to an empty string if no parent course is found
              };

              const chapterName = findParentCourse(); // Get the chapter name dynamically

              return (
                <div key={lesson.name}>
                  <h3>{chapterName}</h3>
                  <Lesson
                    key={lesson.name}
                    name={lesson.name}
                    lessonLink={lesson.lessonLink}
                    pdfLink={lesson.pdfLink}
                    type={lesson.type}
                    publishedAt={lesson.publishedAt}
                  />
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