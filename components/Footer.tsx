import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
    <div>
        <div className='bg-orange w-screen effet-orange absolute right-0 z-20 text-white underline py-10'>

            <div>
                <div className='flex flex-col justify-center items-center liens text-center lg:flex-row lg:text-left lg:items-start'>

                  <div className='flex flex-col lg:pr-28'>
                    <Link href="/" className='pb-4'>Page d&apos;accueil</Link>
                    <Link href="/mentions-legales" className='pb-4'>Mentions légales</Link>
                    <Link href="/signaler-bug" className='pb-4 hidden items-center lg:flex'><p className='pr-2'>Signaler un bug </p>
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50016 15.5C6.59738 15.5 5.76058 15.2778 4.98975 14.8333C4.21891 14.3889 3.61127 13.7778 3.16683 13H0.833496V11.3333H2.5835C2.54183 11.0556 2.51752 10.7778 2.51058 10.5C2.50363 10.2222 2.50016 9.94444 2.50016 9.66667H0.833496V8H2.50016C2.50016 7.72222 2.50363 7.44444 2.51058 7.16667C2.51752 6.88889 2.54183 6.61111 2.5835 6.33333H0.833496V4.66667H3.16683C3.36127 4.34722 3.58002 4.04861 3.82308 3.77083C4.06613 3.49306 4.34738 3.25 4.66683 3.04167L3.3335 1.66667L4.50016 0.5L6.29183 2.29167C6.68072 2.16667 7.07655 2.10417 7.47933 2.10417C7.88211 2.10417 8.27794 2.16667 8.66683 2.29167L10.5002 0.5L11.6668 1.66667L10.2918 3.04167C10.6113 3.25 10.8995 3.48958 11.1564 3.76042C11.4134 4.03125 11.6391 4.33333 11.8335 4.66667H14.1668V6.33333H12.4168C12.4585 6.61111 12.4828 6.88889 12.4897 7.16667C12.4967 7.44444 12.5002 7.72222 12.5002 8H14.1668V9.66667H12.5002C12.5002 9.94444 12.4967 10.2222 12.4897 10.5C12.4828 10.7778 12.4585 11.0556 12.4168 11.3333H14.1668V13H11.8335C11.3891 13.7778 10.7814 14.3889 10.0106 14.8333C9.23975 15.2778 8.40294 15.5 7.50016 15.5ZM7.50016 13.8333C8.41683 13.8333 9.20155 13.5069 9.85433 12.8542C10.5071 12.2014 10.8335 11.4167 10.8335 10.5V7.16667C10.8335 6.25 10.5071 5.46528 9.85433 4.8125C9.20155 4.15972 8.41683 3.83333 7.50016 3.83333C6.5835 3.83333 5.79877 4.15972 5.146 4.8125C4.49322 5.46528 4.16683 6.25 4.16683 7.16667V10.5C4.16683 11.4167 4.49322 12.2014 5.146 12.8542C5.79877 13.5069 6.5835 13.8333 7.50016 13.8333ZM5.8335 11.3333H9.16683V9.66667H5.8335V11.3333ZM5.8335 8H9.16683V6.33333H5.8335V8Z" fill="white"/></svg>
                    </Link>
                  </div>

                  <div className='flex flex-col lg:pr-28'>
                    <Link href="/programmes" className='pb-4'>Programmes</Link>
                    <Link href="/programme/cours-d-arabe-en-video" className='pb-4'>Langue arabe</Link>
                    <Link href="/programme/principes-des-sciences-legiferees" className='pb-4'>Principe des sciences légiférées</Link>
                    <Link href="/programme/cours-religieux-en-francais" className='pb-4'>Cours religieux en français</Link>
                  </div>

                  <div className='flex flex-col lg:pr-28'>
                    <Link href="/bien-commencer-son-apprentissage" className='pb-4'>Bien commencer son apprentissage</Link>
                    <Link href="/qui-suis-je" className='pb-4'>Qui suis-je ?</Link>
                    <Link href="/faq" className='pb-4'>FAQ</Link>
                  </div>

                  
                    
                    
                  <div className='flex flex-col justify-center items-center'>
                    <Link href="/contact" className='pb-4'>Me contacter</Link>
                    <Link href="/signaler-bug" className='pb-4 flex items-center lg:hidden'><p className='pr-2'>Signaler un bug </p>
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50016 15.5C6.59738 15.5 5.76058 15.2778 4.98975 14.8333C4.21891 14.3889 3.61127 13.7778 3.16683 13H0.833496V11.3333H2.5835C2.54183 11.0556 2.51752 10.7778 2.51058 10.5C2.50363 10.2222 2.50016 9.94444 2.50016 9.66667H0.833496V8H2.50016C2.50016 7.72222 2.50363 7.44444 2.51058 7.16667C2.51752 6.88889 2.54183 6.61111 2.5835 6.33333H0.833496V4.66667H3.16683C3.36127 4.34722 3.58002 4.04861 3.82308 3.77083C4.06613 3.49306 4.34738 3.25 4.66683 3.04167L3.3335 1.66667L4.50016 0.5L6.29183 2.29167C6.68072 2.16667 7.07655 2.10417 7.47933 2.10417C7.88211 2.10417 8.27794 2.16667 8.66683 2.29167L10.5002 0.5L11.6668 1.66667L10.2918 3.04167C10.6113 3.25 10.8995 3.48958 11.1564 3.76042C11.4134 4.03125 11.6391 4.33333 11.8335 4.66667H14.1668V6.33333H12.4168C12.4585 6.61111 12.4828 6.88889 12.4897 7.16667C12.4967 7.44444 12.5002 7.72222 12.5002 8H14.1668V9.66667H12.5002C12.5002 9.94444 12.4967 10.2222 12.4897 10.5C12.4828 10.7778 12.4585 11.0556 12.4168 11.3333H14.1668V13H11.8335C11.3891 13.7778 10.7814 14.3889 10.0106 14.8333C9.23975 15.2778 8.40294 15.5 7.50016 15.5ZM7.50016 13.8333C8.41683 13.8333 9.20155 13.5069 9.85433 12.8542C10.5071 12.2014 10.8335 11.4167 10.8335 10.5V7.16667C10.8335 6.25 10.5071 5.46528 9.85433 4.8125C9.20155 4.15972 8.41683 3.83333 7.50016 3.83333C6.5835 3.83333 5.79877 4.15972 5.146 4.8125C4.49322 5.46528 4.16683 6.25 4.16683 7.16667V10.5C4.16683 11.4167 4.49322 12.2014 5.146 12.8542C5.79877 13.5069 6.5835 13.8333 7.50016 13.8333ZM5.8335 11.3333H9.16683V9.66667H5.8335V11.3333ZM5.8335 8H9.16683V6.33333H5.8335V8Z" fill="white"/></svg>
                    </Link>
                  </div> 
                        
                </div>

                <div className='socials flex justify-center items-center mt-10'>
                    <Link href="https://t.me/livresdemedine" target="_blank" rel="noopener noreferrer" className='pr-5'>
                        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.1875 0C8.52016 0 0.6875 7.83266 0.6875 17.5C0.6875 27.1673 8.52016 35 18.1875 35C27.8548 35 35.6875 27.1673 35.6875 17.5C35.6875 7.83266 27.8548 0 18.1875 0ZM26.7823 11.9889L23.9103 25.5232C23.6986 26.4829 23.127 26.7157 22.3296 26.2641L17.9546 23.0393L15.8448 25.0716C15.6119 25.3044 15.4143 25.502 14.9627 25.502L15.2732 21.0494L23.381 13.7248C23.7339 13.4143 23.3034 13.2379 22.8377 13.5484L12.8175 19.8569L8.49899 18.5091C7.56048 18.2127 7.53931 17.5706 8.69657 17.119L25.5685 10.6129C26.3518 10.3306 27.0363 10.8034 26.7823 11.9889Z" fill="white"/>
                        </svg>
                    </Link>

                    <Link href="https://www.youtube.com/@coursarabeenvideo/featured" target="_blank" rel="noopener noreferrer" className='pr-5'>
                        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_469_1558)">
                        <path d="M34.9235 9.07599C34.7222 8.33366 34.3301 7.65693 33.7862 7.11306C33.2423 6.56919 32.5656 6.1771 31.8233 5.97575C29.1053 5.23364 18.1656 5.23364 18.1656 5.23364C18.1656 5.23364 7.22539 5.25552 4.50688 5.99763C3.76454 6.19897 3.08782 6.59106 2.54395 7.13494C2.00008 7.67881 1.60799 8.35553 1.40664 9.09786C0.6875 11.8164 0.6875 17.5 0.6875 17.5C0.6875 17.5 0.6875 23.1837 1.42906 25.9241C1.63041 26.6664 2.0225 27.3432 2.56637 27.887C3.11024 28.4309 3.78697 28.823 4.5293 29.0243C7.24727 29.7665 18.1875 29.7665 18.1875 29.7665C18.1875 29.7665 29.1277 29.7665 31.8463 29.0249C32.5886 28.8235 33.2653 28.4315 33.8092 27.8876C34.353 27.3437 34.7451 26.667 34.9465 25.9247C35.6875 23.2061 35.6875 17.5 35.6875 17.5C35.6875 17.5 35.6656 11.8164 34.9235 9.07599Z" fill="white"/>
                        <path d="M14.6832 22.7565L23.7586 17.5L14.6826 12.2434L14.6832 22.7565Z" fill="#F47559"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_469_1558">
                        <rect width="35" height="35" fill="white" transform="translate(0.6875)"/>
                        </clipPath>
                        </defs>
                        </svg>

                    </Link>

                    <Link href="https://x.com/coursvideo?s=11&t=7B3VSoYz1fxWBm2EVLVHxw" target="_blank" rel="noopener noreferrer" className='pr-5'>
                        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.6638 15.8561L31.0874 4H28.6174L19.5665 14.2945L12.3377 4H4L14.9315 19.5671L4 32H6.47021L16.0281 21.1287L23.6623 32H32L20.6632 15.8561H20.6638ZM17.2805 19.7042L16.1729 18.1541L7.36026 5.81955H11.1543L18.2663 15.7739L19.3739 17.324L28.6185 30.2632H24.8244L17.2805 19.7048V19.7042Z" fill="white"/>
                        </svg>

                    </Link>

                    <Link href="https://instagram.com/abd_ar_rahman_abu_imran?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">
                        <svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_469_1563)">
                        <path d="M16.0068 9.63867C11.6592 9.63867 8.15234 13.1455 8.15234 17.4932C8.15234 21.8408 11.6592 25.3477 16.0068 25.3477C20.3545 25.3477 23.8613 21.8408 23.8613 17.4932C23.8613 13.1455 20.3545 9.63867 16.0068 9.63867ZM16.0068 22.5996C13.1973 22.5996 10.9004 20.3096 10.9004 17.4932C10.9004 14.6768 13.1904 12.3867 16.0068 12.3867C18.8232 12.3867 21.1133 14.6768 21.1133 17.4932C21.1133 20.3096 18.8164 22.5996 16.0068 22.5996ZM26.0146 9.31738C26.0146 10.3359 25.1943 11.1494 24.1826 11.1494C23.1641 11.1494 22.3506 10.3291 22.3506 9.31738C22.3506 8.30566 23.1709 7.48535 24.1826 7.48535C25.1943 7.48535 26.0146 8.30566 26.0146 9.31738ZM31.2168 11.1768C31.1006 8.72266 30.54 6.54883 28.7422 4.75781C26.9512 2.9668 24.7773 2.40625 22.3232 2.2832C19.7939 2.13965 12.2129 2.13965 9.68359 2.2832C7.23633 2.39941 5.0625 2.95996 3.26465 4.75098C1.4668 6.54199 0.913086 8.71582 0.790039 11.1699C0.646484 13.6992 0.646484 21.2803 0.790039 23.8096C0.90625 26.2637 1.4668 28.4375 3.26465 30.2285C5.0625 32.0195 7.22949 32.5801 9.68359 32.7031C12.2129 32.8467 19.7939 32.8467 22.3232 32.7031C24.7773 32.5869 26.9512 32.0264 28.7422 30.2285C30.5332 28.4375 31.0938 26.2637 31.2168 23.8096C31.3604 21.2803 31.3604 13.7061 31.2168 11.1768ZM27.9492 26.5234C27.416 27.8633 26.3838 28.8955 25.0371 29.4355C23.0205 30.2353 18.2354 30.0508 16.0068 30.0508C13.7783 30.0508 8.98633 30.2285 6.97656 29.4355C5.63672 28.9023 4.60449 27.8701 4.06445 26.5234C3.26465 24.5068 3.44922 19.7217 3.44922 17.4932C3.44922 15.2646 3.27148 10.4727 4.06445 8.46289C4.59766 7.12305 5.62988 6.09082 6.97656 5.55078C8.99316 4.75098 13.7783 4.93555 16.0068 4.93555C18.2354 4.93555 23.0273 4.75781 25.0371 5.55078C26.377 6.08398 27.4092 7.11621 27.9492 8.46289C28.749 10.4795 28.5645 15.2646 28.5645 17.4932C28.5645 19.7217 28.749 24.5137 27.9492 26.5234Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_469_1563">
                        <rect width="30.625" height="35" fill="white" transform="translate(0.6875)"/>
                        </clipPath>
                        </defs>
                        </svg>

                    </Link>



                </div> 
            </div>


        </div>
    </div>
  )
}