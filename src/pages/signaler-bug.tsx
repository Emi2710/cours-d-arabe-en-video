import React, { useState } from 'react'
import Layout from '../../components/Layout'
import BugContactForm from '../../components/BugContactForm'




type Props = {}


export default function signalerBug({}: Props) {

  return (
    <Layout>
      <div>
        <h2 className='petit-titre sm:grand-titre-mobile lg:grand-titre text-center my-16'>Signaler un bug</h2>
      </div>
      <div id='contact'>
        <BugContactForm />
      </div>
      
    </Layout>
  )
}