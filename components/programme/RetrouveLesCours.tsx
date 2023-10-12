import React from 'react'
import { RetrouveLesCours } from '../../typings'
import Link from 'next/link'

type Props = {}

export default function RetrouveLesCours({linkTitle, linkUrl}: RetrouveLesCours) {
  return (
    <div className='mb-4 border-3 border-gris-contour text-center py-6 sm:px-5 md:w-3/4 md:mx-2 max-w-[330px] m-auto'>
                  <Link href={linkUrl} target="_blank" rel="noopener noreferrer" className='text-gris-foncé bold underline flex items-center justify-center'>
                    
                    {linkTitle} 
                  
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_541_12067" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                    <rect x="0.5" y="0.5" width="20" height="20" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_541_12067)">
                    <path d="M5.5625 16.5L4.5 15.4375L13.4375 6.5H8.5V5H16V12.5H14.5V7.5625L5.5625 16.5Z" fill="#424242"/>
                    </g>
                    </svg>
                  </Link>
    </div>
  )
}