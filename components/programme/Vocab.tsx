import React from 'react'
import { Ressources } from '../../typings'


export default function Vocab({linkTitle, linkUrl}: Ressources) {
  return (
    <div className='flex justify-center items-center'>
        <div className='flex justify-center items-center'>
            <a>{linkTitle}</a>
        </div>
        <div>
          test
        </div>
    </div>
  )
}