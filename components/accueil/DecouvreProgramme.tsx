import React from 'react'

type Props = {
    title: string;
    content: string;
}

export default function DecouvreProgramme({title, content}: Props) {
  return (
    <div className="bg-white bg-opacity-20 py-7 px-10 rounded-2xl mb-6 mx-5 md:mx-9 xl:mx-3 xl:max-w-lg effet-marron xl:h-64">
        <h2 className="petit-titre">{title}</h2>
        <p className="petit-texte text-gris-clair pt-2.5">{content}</p>
    </div>
  )
}