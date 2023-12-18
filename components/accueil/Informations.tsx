import Link from 'next/link'
import React from 'react'

type Props = {
    title: string;
    content: string;
    linkTitle: string;
    linkUrl: string;
}

export default function Informations({title, content, linkTitle, linkUrl}: Props) {
  return (
    <div className="xl:flex justify-center xl:px-24">

          <div className="flex justify-between">

            <div className="flex pb-5 xl:w-80 xl:mr-32">
              <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="21.5252" cy="21" rx="21.5252" ry="21" fill="#4970B6"/>
              </svg>
              <h2 className="grand-titre-mobile pl-5 xl:w-80">{title}</h2>
            </div>  

            

          </div>
          

          <div>

            <p className="petit-texte text-gris-foncé">{content}</p>
          
          <div className="flex items-center pt-5">
            <Link href={`/${linkUrl}`} className="underline font-bold mr-2">{linkTitle}</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.0625 11.5L0 10.4375L8.9375 1.5H4V0H11.5V7.5H10V2.5625L1.0625 11.5Z" fill="#1C1B1F"/>
            </svg>
    
  
          </div>

          </div>
          
          
    </div>
  )
}