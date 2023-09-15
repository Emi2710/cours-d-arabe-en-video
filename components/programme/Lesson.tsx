import React from 'react'
import { Lesson } from '../../typings'
import Link from 'next/link'

type Props = {}

export default function Lesson({name, lessonLink, pdfLink, type, publishedAt}: Lesson) {
  return (
    <div>

      {type == 'lesson' &&
      
        <div className='border-3 border-gris-contour py-6 px-5 mb-6'>
            <p>{name}</p>

            <hr className="border-2 mx-auto my-3 bg-gris-contour text-gris-contour"/>
            
            <div className='flex items-center'>
              <div className='flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 14.5L14.5 10L7.5 5.5V14.5ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#5E6D7A"/>
                </svg>

                <a href={lessonLink} target="_blank" rel="noopener noreferrer" className='text-texte-clair pl-2'>Vidéo</a>
              </div>

              <div className='flex items-center ml-5'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2ZM8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12Z" fill="#5E6D7A"/>
                </svg>
      
                <a href={pdfLink} target="_blank" rel="noopener noreferrer" className='text-texte-clair pl-2'>PDF</a>
              </div>
              

            </div>
        </div>
      
      }

      {type == 'exam' &&
      
        <div className='flex justify-center'>
          <button className='max-w-3xl mx-auto mt-5 petit-texte-gras bg-bleu-foncé py-3 px-8 text-white rounded-[5px] effet-bleu tracking-wide'>
            <a href={lessonLink} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          </button>
        </div>
      
      }
       
    </div>
    
  )
}