import React, { useState } from 'react'
import Layout from '../../components/Layout'
import ContactForm from '../../components/ContactForm';




type Props = {}


export default function contact({}: Props) {

  return (
    <Layout>
      <div>
        <h2 className='petit-titre sm:grand-titre-mobile lg:grand-titre text-center my-16'>Me contacter</h2>
      </div>
      <div id='contact'>
        <ContactForm />
      </div>
      <div>
        <p className='max-w-[650px] mx-5 sm:m-auto text-center text-texte-clair'>(Les messages des sœurs doivent passer par un mahram, également la boîte mail est réservée pour les questions)</p>

        <a href="abdurahmanabuimran@gmail.com" className='text-center underline text-texte-clair flex justify-center mt-16 mb-24'>abdurahmanabuimran@gmail.com</a>
      </div>
    </Layout>
  )
}