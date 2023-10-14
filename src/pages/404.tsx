// pages/404.tsx

import Link from 'next/link';
import Layout from '../../components/Layout';

const Custom404Page: React.FC = () => {
  return (
    <Layout>
      
      <div className='contact_hero--header h-[856px] sm:h-[896px]'>
        <h1 className='titan-titre-mobile lg:titan-titre my-16 text-center'>404- Page introuvable</h1>
        <p className='text-gris-foncé text-center mb-16'>La page que vous recherchez n’existe pas / plus.</p>
        <div className='flex items-center justify-center flex-wrap max-w-[550px] m-auto mb-24'>
          <Link href="/">
            <button 
              className='hover-animation w-[190px] mx-2 mt-5 text-lg bold bg-bleu-foncé py-2 text-white rounded-[5px] effet-bleu tracking-wide'>
              Accueil
            </button>
          </Link>

          <Link href="/programmes">
            <button 
              className='hover-animation w-[190px] mx-2 mt-5 text-lg bold bg-orange py-2 text-white rounded-[5px] effet-orange tracking-wide'>
              Programmes
            </button>
          </Link>

          <Link href="/contact">
            <button 
              className='hover-animation flex items-center justify-center w-[190px] mx-2 mt-5 text-lg bold bg-gris-contour py-2 text-white rounded-[5px] tracking-wide'>
              <p className='mr-1'>Signaler un bug</p>
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.9987 15.5C6.09592 15.5 5.25911 15.2778 4.48828 14.8333C3.71745 14.3889 3.10981 13.7778 2.66536 13H0.332031V11.3333H2.08203C2.04036 11.0556 2.01606 10.7778 2.00911 10.5C2.00217 10.2222 1.9987 9.94444 1.9987 9.66667H0.332031V8H1.9987C1.9987 7.72222 2.00217 7.44444 2.00911 7.16667C2.01606 6.88889 2.04036 6.61111 2.08203 6.33333H0.332031V4.66667H2.66536C2.85981 4.34722 3.07856 4.04861 3.32161 3.77083C3.56467 3.49306 3.84592 3.25 4.16536 3.04167L2.83203 1.66667L3.9987 0.5L5.79036 2.29167C6.17925 2.16667 6.57509 2.10417 6.97786 2.10417C7.38064 2.10417 7.77648 2.16667 8.16536 2.29167L9.9987 0.5L11.1654 1.66667L9.79036 3.04167C10.1098 3.25 10.398 3.48958 10.6549 3.76042C10.9119 4.03125 11.1376 4.33333 11.332 4.66667H13.6654V6.33333H11.9154C11.957 6.61111 11.9813 6.88889 11.9883 7.16667C11.9952 7.44444 11.9987 7.72222 11.9987 8H13.6654V9.66667H11.9987C11.9987 9.94444 11.9952 10.2222 11.9883 10.5C11.9813 10.7778 11.957 11.0556 11.9154 11.3333H13.6654V13H11.332C10.8876 13.7778 10.2799 14.3889 9.50911 14.8333C8.73828 15.2778 7.90147 15.5 6.9987 15.5ZM6.9987 13.8333C7.91536 13.8333 8.70009 13.5069 9.35286 12.8542C10.0056 12.2014 10.332 11.4167 10.332 10.5V7.16667C10.332 6.25 10.0056 5.46528 9.35286 4.8125C8.70009 4.15972 7.91536 3.83333 6.9987 3.83333C6.08203 3.83333 5.29731 4.15972 4.64453 4.8125C3.99175 5.46528 3.66536 6.25 3.66536 7.16667V10.5C3.66536 11.4167 3.99175 12.2014 4.64453 12.8542C5.29731 13.5069 6.08203 13.8333 6.9987 13.8333ZM5.33203 11.3333H8.66536V9.66667H5.33203V11.3333ZM5.33203 8H8.66536V6.33333H5.33203V8Z" fill="white"/>
              </svg>
            </button>
          </Link>
        </div>  
      </div>
      
    </Layout>
  );
};

export default Custom404Page;
