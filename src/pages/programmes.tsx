import React from 'react'
import Layout from '../../components/Layout'
import { ProgrammeIntro } from '../../typings'
import { sanityClient, urlFor } from '../../client/sanity';
import Link from "next/link"
import Image from "next/image"
import Head from "next/head"


interface Props {
  programmes: [ProgrammeIntro];
}

function programmes({programmes}: Props) {
  return (
    <Layout>
      <Head>
          <title>Programmes de cours d&apos;arabe, principe des sciences légiférées, cours religieux...</title>
          <meta name="description" content='Si vous suivez de manière sérieuse et assidue les cours ainsi que les exercices, au fil des 
            programmes vous verrez votre niveau d’arabe s’améliorer et vous serez bientôt capable de 
            comprendre les cours des savants en langue arabe, lire le Qur’an en le comprenant, vous 
            exprimer de manière éloquente avec des arabophones… et la réussite appartient à Allah' />
      </Head>
      <div className='mb-32'>
        <div className='md:flex justify-around items-center'>

              <svg className='absolute left-5 mt-3 md:block' width="55" height="67" viewBox="0 0 55 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 62.3719C0.28517 61.5493 0.337024 60.866 0.693486 60.468C2.63783 58.2789 3.09799 55.9173 1.74991 53.2306C1.56258 52.6747 1.4407 52.098 1.38693 51.5125C2.03505 51.4661 2.57299 51.2405 2.93593 51.4263C5.84596 52.9056 8.47731 52.8259 10.8429 50.2852C11.0957 50.0066 11.7503 50.1128 12.4762 50C12.4762 51.3267 12.6187 52.5142 12.5345 53.6485C12.4735 54.2836 12.5875 54.9234 12.8635 55.4956C13.1396 56.0677 13.5667 56.5493 14.0965 56.8858C14.602 57.2573 15.1529 57.5492 15.6195 57.9737C16.0862 58.3983 16.4361 58.8626 17 59.4796C16.6155 59.8545 16.2086 60.2045 15.7815 60.5277C15.5097 60.6874 15.2063 60.7827 14.8936 60.8063C12.3012 61.0916 10.8883 62.5709 10.5189 65.231C10.4216 65.8943 10.1948 66.7567 9.35876 66.9624C8.41899 67.1945 8.2051 66.299 7.76438 65.7418C7.61899 65.5921 7.49465 65.4224 7.39496 65.2376C6.44223 63.1414 4.85437 62.3453 2.63134 62.5841C1.74963 62.599 0.868541 62.528 0 62.3719Z" fill="#9EC3F9"/>
              <path d="M22 17V14.8143L26.6701 14.5572L29.1641 9.48178L35.1809 10.492C36.5901 8.98589 36.3905 6.85532 37.3195 5.04924C39.533 4.96352 41.6218 6.34105 44.0098 5.93085C44.8266 4.75537 45.6559 3.57376 46.5786 2.25746L51.5292 2.67378C51.8223 2.17175 52.2027 1.51666 52.5893 0.837083C53.0756 0.0350602 53.6243 -0.179224 54.2852 0.145259C54.9461 0.469741 55.1767 1.03914 54.8587 1.89627C54.4535 2.98604 53.9422 4.03908 53.4933 5.07375C51.6914 5.68598 50.0079 4.96353 48.2933 5.17169C47.1273 5.63086 46.6846 6.80637 45.98 7.71859C45.6715 8.16348 45.2327 8.50586 44.7217 8.70046C44.2106 8.89506 43.6515 8.93268 43.1182 8.80834C41.8711 8.61243 40.674 7.87777 39.0903 8.33082L37.1325 13.4735L30.9535 12.3777C29.4758 13.6021 29.5008 15.6531 28.154 16.9694L22 17Z" fill="#F48F82"/>
              </svg>

              
              <h1 className='grand-titre-mobile py-16 text-center lg:hidden'>Découvre tout nos programmes</h1>
              <h1 className='titan-titre py-16 text-center hidden lg:block'>Découvre tout nos programmes</h1>

              <svg className='absolute right-10 top-3 mt-48 md:block' width="45" height="55" viewBox="0 0 45 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.3688 44.4625C7.12824 43.9279 5.23336 43.694 3.51138 42.6382C3.05263 40.3928 4.22943 38.7088 5.50595 37.1852C6.46618 36.1997 7.51445 35.305 8.63747 34.5122C9.50842 33.9069 10.3329 33.2368 11.1041 32.5074C13.0986 30.2688 12.4936 28.0969 9.62145 27.1614C8.72389 26.874 7.75981 26.8206 6.83566 26.6201C6.25869 26.5191 5.72917 26.2348 5.32472 25.8091C4.92028 25.3833 4.66228 24.8385 4.58853 24.2545C4.45545 23.6734 4.54241 23.0634 4.83249 22.5433C5.12257 22.0232 5.59497 21.6302 6.15758 21.4411C6.93507 21.1138 7.77555 20.9654 8.61751 21.0068C11.3729 21.1574 14.055 21.9538 16.4495 23.3323C19.827 25.4106 20.6115 28.3843 19.5943 32.1733C19.1776 33.8505 18.1535 35.3112 16.7221 36.2697C16.0107 36.7375 15.3924 37.3656 14.6876 37.8C12.1944 39.3637 10.1999 41.3284 9.3688 44.4625Z" fill="#F7CD82"/>
              <path d="M4.3029 54.3526C1.94931 54.5865 -0.058533 52.5082 0.00130399 49.9689C0.0612292 48.8541 0.506515 47.7954 1.26033 46.9756C2.01414 46.1557 3.02913 45.6261 4.13003 45.4782C6.43708 45.2911 8.38511 47.4162 8.53137 49.9087C8.68429 52.5083 6.53682 54.64 4.3029 54.3526Z" fill="#F7CD82"/>
              <path d="M40.3867 10.521L38.711 15C36.6214 14.5129 36.6757 12.2937 34.9457 11.2517L30 10.9201C30.1272 10.2375 30.3344 9.57212 30.6174 8.93773C31.0297 8.44846 31.4836 7.9957 31.9742 7.58455C32.2807 7.2761 32.4897 6.88477 32.5753 6.45904C32.6609 6.0333 32.6194 5.59188 32.4559 5.18944C32.1837 4.48522 31.9571 3.7643 31.7775 3.03111C31.7245 2.43237 31.7245 1.83014 31.7775 1.2314L36.479 2.70636L40.8006 0C41.92 1.7862 40.8752 3.61297 41.5197 5.21649C42.4288 6.48171 44.2334 6.88089 45 8.55207C43.6839 9.79023 41.8656 9.58728 40.3867 10.521Z" fill="#F2870F"/>
              </svg>

  
          </div>

        {programmes.map((programme) => {
          return <div key={programme._id}>
              <div className='flex flex-col justify-center items-center bg-gris-clair px-6 py-12 m-5 md:m-8 lg:flex-row lg:px-12 lg:max-w-6xl lg:mx-auto'>
                
                <img
                  src={urlFor(programme.mainImage).url()}
                  alt={programme.title}
                  className="lg:w-96 lg:mr-12 w-1/2"
                />
                <div className='flex flex-col justify-center items-center lg:items-start lg:justify-start'>
                  <h3 className='petit-titre py-4 text-center lg:text-left'>{programme.title}</h3> 
                  <p className='text-gris-foncé text-center lg:text-left'>{programme.introShort}</p>
                  <Link href={`/programme/${programme.slug.current}`}><button className='hover-animation max-w-3xl mx-auto mt-5 bold bg-bleu-foncé py-3 px-8 text-white rounded-[5px] effet-bleu tracking-wide'>Commencer</button></Link>  
                </div>
                
              </div>
          </div>
        })}

        

      </div>
      <div className='flex justify-end relative'>
        <svg width="450" height="254" viewBox="0 0 450 254" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M123.094 111.581C123.842 110.405 124.6 109.229 125.334 108.043C126.299 106.52 127.202 104.996 127.612 103.195C127.887 101.979 128.341 100.803 128.645 99.5927C129.519 96.174 129.225 92.6759 128.993 89.2373C128.77 86.9641 128.188 84.7435 127.269 82.6628C126.439 80.6185 125.242 78.8322 124.127 76.9715C123.884 76.4928 123.679 75.9951 123.514 75.4829C124.44 75.4432 125.362 75.3787 126.285 75.3787H221.701C222.551 75.3787 223.401 75.3787 224.25 75.3787C228.068 75.4597 231.733 76.9335 234.591 79.5368C240.283 84.5929 242.46 93.5492 239.081 101.28C236.797 106.51 232.998 110.008 227.494 111.313C225.98 111.606 224.439 111.726 222.899 111.67C190.393 111.69 157.887 111.69 125.382 111.67C124.634 111.665 123.866 111.61 123.094 111.581Z" fill="#F9E0B2"/>
<path d="M113.998 178.616C112.111 176.443 112.174 173.297 112.328 170.374C112.454 168.087 112.241 165.779 112.4 163.492C112.618 160.341 113.675 157.473 116.002 155.29C117.127 154.233 118.438 153.406 119.864 152.854C122.314 151.907 124.918 151.449 127.535 151.504C134.231 151.569 140.926 151.504 147.627 151.504H148.11C149.167 151.464 150.263 151.837 151.257 151.172C153.845 151.712 156.462 151.588 159.068 151.588H241.62V155.335C235.059 155.335 228.498 155.24 221.938 155.389C215.662 155.533 210.554 160.068 209.821 166.881C209.631 168.66 209.808 170.46 210.338 172.165C210.868 173.87 211.74 175.441 212.898 176.777C214.056 178.114 215.474 179.186 217.06 179.924C218.646 180.662 220.366 181.05 222.107 181.062C228.204 181.062 234.301 181.062 240.398 181.062C240.857 181.062 241.32 181.007 241.779 180.978H241.953H242.127H257.927C258.695 181.003 259.462 181.052 260.23 181.052H319.126C319.894 181.052 320.661 181.003 321.429 180.978L322.279 181.057L325.001 184.774C324.152 184.774 323.302 184.774 322.452 184.774C256.926 184.774 191.4 184.774 125.874 184.774C125.029 184.774 124.18 184.709 123.335 184.674C121.771 185.136 120.322 187.617 118.874 183.434H118.898C118.506 183.335 118.138 183.154 117.818 182.902C117.497 182.65 117.23 182.333 117.035 181.97H117.059L116.48 181.474C116.2 181.265 115.833 181.136 115.635 180.839C115.14 180.06 114.593 179.317 113.998 178.616Z" fill="#86B0F1"/>
<path d="M249.59 73.3245C250.435 73.3642 251.28 73.4287 252.125 73.4337C261.973 73.4337 271.826 73.5031 281.674 73.3989C285.43 73.3593 289.031 73.7661 292.468 75.3539C293.154 75.9097 293.83 76.4753 294.742 76.5795C295.062 77.0134 295.411 77.4246 295.785 77.8101C299.682 81.2712 302.107 86.1611 302.544 91.4354C303.152 97.8859 301.284 103.493 296.929 108.152C294.722 110.623 291.822 112.326 288.631 113.025C286.98 113.521 285.285 113.446 283.595 113.446H156.742C155.052 113.446 153.362 113.392 151.706 113.848C150.973 113.208 150.089 113.481 149.293 113.481C140.693 113.455 132.094 113.455 123.494 113.481C122.731 113.481 121.964 113.565 121.201 113.605C120.718 113.427 120.337 113.109 120.535 112.563C120.602 112.389 120.704 112.232 120.834 112.1C120.963 111.969 121.118 111.866 121.288 111.799C121.888 111.676 122.497 111.603 123.108 111.581C123.88 111.61 124.648 111.665 125.42 111.665C157.926 111.665 190.432 111.665 222.937 111.665C224.477 111.721 226.019 111.601 227.533 111.308C233.032 110.003 236.831 106.505 239.119 101.275C242.498 93.5591 240.316 84.6029 234.625 79.5269C231.767 76.9236 228.102 75.4498 224.284 75.3688C223.434 75.3688 222.585 75.3688 221.735 75.3688H126.284C125.362 75.3688 124.44 75.4333 123.513 75.473C122.924 75.4284 122.331 75.3986 121.742 75.344C120.805 75.2547 120.713 75.1058 120.728 73.8108L121.182 73.4783C122.186 73.4783 123.19 73.4436 124.189 73.4436C164.219 73.4436 204.248 73.4436 244.275 73.4436C246.047 73.4238 247.818 73.3593 249.59 73.3245Z" fill="#4970B6"/>
<path d="M151.702 113.843C153.357 113.387 155.047 113.441 156.737 113.441H283.595C285.285 113.441 286.975 113.491 288.631 113.02C289.35 113.709 290.238 113.412 291.044 113.417C298.411 113.441 305.783 113.417 313.155 113.417C313.768 113.417 314.386 113.392 314.994 113.446C316.172 113.551 316.65 114.344 316.157 115.401C315.79 116.175 315.317 116.89 314.892 117.649C314.043 117.649 313.193 117.59 312.348 117.59H210.197C209.425 117.59 208.652 117.59 207.88 117.614C202.425 117.724 196.603 121.753 194.87 128.312C194.449 130.087 194.287 131.917 194.387 133.741C194.604 142.002 201.261 147.758 207.981 147.842C208.754 147.842 209.526 147.842 210.298 147.842L241.567 147.877C241.567 149.103 241.567 150.333 241.591 151.559H159.039C156.433 151.559 153.816 151.683 151.228 151.142L148.53 150.561L147.564 150.204L147.12 150.085L146.198 149.683C146.152 149.632 146.094 149.594 146.03 149.573C145.966 149.551 145.898 149.546 145.831 149.559L145.271 149.251C145.221 149.195 145.159 149.152 145.089 149.126C145.019 149.1 144.944 149.092 144.871 149.103L144.344 148.785C144.299 148.726 144.239 148.68 144.172 148.652C144.104 148.623 144.031 148.612 143.958 148.621L143.417 148.269L142.36 147.703L142.022 147.366L140.492 146.274L140.168 145.937C139.58 145.441 138.865 145.068 138.431 144.448C137.399 143.108 136.485 141.677 135.698 140.171C133.328 135.249 133.222 130.352 135.462 125.35C136.579 122.855 138.208 120.638 140.236 118.85C140.66 118.529 141.107 118.242 141.573 117.991C141.675 117.892 142.79 117.148 142.79 117.148L142.93 117.074L143.297 116.736C144.002 116.071 144.928 115.927 145.783 115.62L146.512 115.277L147.207 114.915L147.526 114.811L148.602 114.434L148.935 114.34L149.471 114.285L151.702 113.843Z" fill="#38558A"/>
<path d="M61.0594 188.386C59.9828 188.306 59.9828 188.306 59.1284 187.517L58.438 187.021C56.956 186.183 55.4835 185.329 53.987 184.54C50.4468 182.618 46.9066 180.71 43.3664 178.814C39.237 176.501 34.9817 174.433 30.6216 172.622C30.4385 172.582 30.2495 172.582 30.0664 172.622C29.463 173.778 30.1002 175.128 29.1733 176.358L27.5223 171.555C22.3617 169.426 17.2396 167.7 11.8617 166.945C9.57102 166.535 7.22098 166.638 4.97277 167.248C2.55899 167.992 0.975549 169.59 0.376931 172.116C-0.0212279 173.651 -0.105065 175.254 0.130725 176.825C0.585797 179.329 1.62068 181.685 3.14795 183.692C4.99285 186.14 7.14539 188.325 9.5493 190.192C10.203 190.751 11.0305 191.051 11.881 191.035C13.7348 191.035 15.5838 191.105 17.4375 191.149C17.732 191.149 18.0555 191.149 18.0458 191.735C17.2058 192.117 16.2886 192.504 15.3955 192.946C15.0735 193.16 14.7727 193.406 14.4975 193.68C15.3182 194.216 15.9458 194.672 16.612 195.05C18.7748 196.275 20.923 197.53 23.1244 198.667C31.2872 202.802 39.7475 206.286 48.4305 209.087C52.6787 210.501 56.9994 211.707 61.2766 213.026C61.8125 213.19 62.4835 213.185 62.7876 213.959C61.6152 214.029 60.439 213.972 59.278 213.791C54.4505 213.394 49.5939 212.962 44.7471 212.59C43.6802 212.505 42.594 212.59 41.5174 212.615C35.903 212.143 26.7837 212.897 24.3747 214.029C24.2637 215.056 25.4996 215.666 25.2823 217.006C24.4423 216.604 23.7568 216.301 23.0858 215.959C20.3148 214.56 20.3099 214.545 17.5437 216.073C16.9295 216.403 16.3447 216.789 15.7962 217.224C15.2569 217.67 14.7606 218.169 14.3141 218.713C13.479 219.769 12.9966 221.074 12.9382 222.434C12.8127 223.987 13.4886 225.193 14.6231 226.161C16.1966 227.46 17.9999 228.434 19.9334 229.029C22.7961 229.956 25.7265 230.765 28.623 231.509C31.2395 232.184 33.885 232.715 36.5112 233.311C36.8878 233.311 37.274 233.365 37.6554 233.365H59.6304C60.089 233.365 60.5525 233.296 61.0111 233.256C61.7014 233.291 62.387 233.36 63.0773 233.36C74.6634 233.36 86.2609 233.36 97.8695 233.36C98.5599 233.36 99.2454 233.291 99.9357 233.251H105.946V232.522C101.949 231.197 98.9557 228.552 96.7737 224.93C95.6744 223.022 94.9802 220.896 94.7365 218.693C94.0171 213.16 94.413 207.613 94.4178 202.081C94.468 199.058 95.2194 196.091 96.6095 193.427C97.6012 191.57 98.9733 189.957 100.631 188.698C101.848 187.745 103.166 186.936 104.561 186.287C106.49 185.306 108.616 184.805 110.769 184.823C113.834 184.888 116.9 184.783 119.941 184.749C119.652 184.262 119.292 183.824 118.874 183.449C118.207 183.032 117.586 182.543 117.02 181.99C116.837 181.831 116.649 181.682 116.465 181.528L115.62 180.893C114.833 180.128 113.99 179.425 113.1 178.789C112.907 178.675 102.914 170.85 98.0192 167.198C89.6275 160.825 80.9076 154.922 71.8973 149.514C67.573 146.916 63.081 144.625 58.4525 142.657C57.767 142.374 57.1104 141.853 56.1353 142.066C55.8842 143.376 55.6187 144.721 55.2953 146.378C54.2863 144.394 54.3298 142.374 53.2725 140.628C51.2836 140.186 49.2753 139.586 47.2284 139.313C44.0036 138.886 40.774 138.901 37.7712 140.523C36.6512 140.637 35.763 141.287 34.8747 141.893C32.4609 143.535 31.1285 145.862 31.2444 148.839C31.2938 150.101 31.4652 151.354 31.7561 152.581C32.3284 154.717 33.1914 156.76 34.3195 158.649C36.3947 162.262 38.7966 165.666 41.4933 168.816C45.6813 173.775 50.1634 178.463 54.9139 182.853C56.2173 184.079 57.5015 185.334 58.7759 186.555C58.9087 186.56 59.0346 186.617 59.1284 186.714" fill="url(#paint0_linear_160_1809)"/>
<path d="M99.9069 233.266H105.917L107.708 233.301C109.712 233.345 111.72 233.425 113.723 233.425C187.031 233.425 260.341 233.425 333.653 233.425C334.497 233.425 335.347 233.425 336.197 233.385C337.134 234.051 337.802 235.047 338.075 236.184C337.23 236.208 336.38 236.258 335.535 236.258C226.365 236.258 117.196 236.258 8.02871 236.258C6.9763 236.258 5.86596 236.595 4.87149 235.921C4.86925 235.897 4.86151 235.875 4.84895 235.855C4.83639 235.836 4.81939 235.82 4.79941 235.809C4.77944 235.797 4.75709 235.791 4.73432 235.791C4.71155 235.791 4.68903 235.796 4.66873 235.807C4.40871 235.628 4.22818 235.35 4.16666 235.035C4.10514 234.72 4.16763 234.392 4.34046 234.124C4.47504 233.884 4.67251 233.686 4.91053 233.555C5.14856 233.423 5.41764 233.363 5.68735 233.38H7.54113H33.4796C34.4789 233.38 35.4831 233.35 36.4824 233.336C36.8589 233.336 37.2451 233.39 37.6265 233.39H59.6016C60.0602 233.39 60.5236 233.321 60.9822 233.281C61.6726 233.316 62.3581 233.385 63.0484 233.385C74.6346 233.385 86.232 233.385 97.8407 233.385C98.531 233.385 99.2165 233.316 99.9069 233.266Z" fill="#1C4655"/>
<path d="M338.074 236.194C337.802 235.057 337.134 234.063 336.196 233.4C334.538 230.837 332.666 228.426 330.601 226.195C327.85 222.62 325.1 219.042 322.351 215.463C321.981 215.063 321.481 214.818 320.946 214.773C321.217 214.322 321.265 213.885 320.797 213.543C319.556 212.649 318.45 211.558 317.031 210.928C315.853 210.407 314.699 209.816 313.536 209.26C313.762 209.212 313.991 209.18 314.221 209.166C318.837 209.166 323.452 209.122 328.067 209.206C329.294 209.259 330.507 209.503 331.663 209.93C335.539 211.316 338.967 213.775 341.57 217.036C342.308 217.944 343.018 218.896 343.737 219.809C345.504 221.993 347.274 224.171 349.047 226.344C350.013 227.644 350.906 228.974 351.905 230.229C352.803 231.366 353.798 232.423 354.754 233.514C355.247 234.643 356.053 235.597 357.071 236.258C357.029 236.452 357.051 236.656 357.134 236.835C357.217 237.015 357.356 237.161 357.529 237.25C358.934 239.111 360.329 240.982 361.758 242.828C364.481 246.351 367.217 249.869 369.965 253.382C369.999 253.426 369.965 253.521 369.965 253.59C369.859 253.689 369.763 253.873 369.661 253.873C363.868 253.873 358.075 253.873 352.282 253.873C351.167 252.751 350.399 251.392 349.414 250.211C348.43 249.03 347.527 247.814 346.585 246.614C345.48 245.214 344.374 243.81 343.332 242.361C342.612 241.369 341.487 240.689 341.13 239.414C340.049 238.833 339.711 237.608 338.943 236.754L338.523 236.407L338.074 236.194Z" fill="#375985"/>
<path d="M357.086 236.243C356.068 235.582 355.262 234.628 354.768 233.499C355.69 233.474 356.612 233.425 357.534 233.425C373.028 233.425 388.518 233.425 404.005 233.425C404.922 233.425 405.844 233.336 406.766 233.291L414.543 233.336H415.509L416.522 233.311C417.676 233.336 418.835 233.375 419.993 233.375H489.708C490.481 233.375 491.253 233.375 492.021 233.44C492.324 233.498 492.602 233.656 492.81 233.891C493.018 234.125 493.146 234.424 493.174 234.74C493.159 235.057 493.052 235.362 492.869 235.617C492.685 235.872 492.432 236.066 492.141 236.174C491.84 236.243 491.533 236.274 491.224 236.268C490.606 236.268 489.988 236.268 489.37 236.268H435.64C434.79 236.268 433.945 236.333 433.1 236.367C432.41 236.333 431.72 236.268 431.029 236.268H360.079C359.388 236.268 358.698 236.333 358.008 236.367L357.086 236.243Z" fill="#1C4655"/>
<path d="M357.085 236.243L358.008 236.362L357.085 236.243Z" fill="#F9FBFE"/>
<path d="M401.702 192.013C401.263 193.105 400.852 194.206 400.384 195.288C399.212 198.127 398.39 201.106 397.936 204.155C397.905 204.548 397.905 204.943 397.936 205.336C397.936 205.539 397.893 205.743 397.869 205.946C397.869 206.383 397.869 206.819 397.869 207.256C397.869 207.693 397.738 208.035 397.724 208.427C397.507 213.66 398.526 218.87 400.693 223.61C401.074 224.459 401.335 225.362 401.658 226.24H352.046C351.046 226.24 350.047 226.305 349.053 226.339C347.276 224.163 345.506 221.984 343.742 219.804C343.004 218.892 342.294 217.939 341.575 217.031C338.968 213.777 335.539 211.325 331.664 209.945C330.507 209.518 329.295 209.274 328.067 209.221C323.452 209.136 318.837 209.181 314.222 209.181C313.991 209.195 313.762 209.227 313.536 209.275H310.717L309.785 209.568C307.54 210.357 306.444 211.95 306.556 214.401C306.556 214.748 306.739 214.843 307.038 214.773H320.946C321.481 214.818 321.981 215.063 322.351 215.463C325.09 219.062 327.84 222.639 330.602 226.195C325.895 226.195 321.188 226.24 316.481 226.24C292.556 226.24 268.629 226.24 244.7 226.24C242.772 226.273 240.849 226.024 238.989 225.501C234.95 224.277 231.511 221.525 229.367 217.8C227.223 214.075 226.531 209.653 227.432 205.425C227.913 203.002 228.914 200.721 230.363 198.747C231.811 196.772 233.669 195.155 235.803 194.013C238.481 192.576 241.472 191.865 244.492 191.948C296.282 191.978 348.071 191.986 399.858 191.973L401.702 192.013Z" fill="#F9DFB1"/>
<path d="M406.52 185.051C406.433 185.394 406.447 185.672 406.322 185.811C404.808 187.502 403.474 189.355 402.344 191.338C402.154 191.586 401.938 191.812 401.702 192.013C401.263 193.105 400.852 194.206 400.384 195.288C399.212 198.127 398.39 201.106 397.936 204.155C397.905 204.548 397.905 204.943 397.936 205.336L399.008 205.405C399.723 205.132 400.456 204.909 401.147 204.581C407.394 201.386 413.632 198.176 419.863 194.95C420.121 194.79 420.366 194.609 420.597 194.41C421.5 193.983 422.431 193.601 423.3 193.11C424.169 192.618 425.299 192.38 426.004 191.363L422.045 188.669C421.985 188.628 421.942 188.566 421.924 188.495C421.926 188.378 421.943 188.261 421.973 188.148C422.402 188.148 422.851 188.148 423.3 188.148C425.614 188.253 427.925 188.366 430.233 188.485C430.997 188.61 431.78 188.482 432.468 188.118C435.302 186.327 438.053 184.431 440.361 181.935C441.337 180.915 442.123 179.719 442.678 178.407C443.074 177.497 443.226 176.494 443.119 175.503C443.011 174.512 442.647 173.569 442.065 172.771C441.074 171.34 439.698 170.238 438.107 169.6C435.127 168.367 431.905 167.881 428.707 168.181C427.998 169.486 427.302 170.801 426.569 172.091C426.342 172.396 426.085 172.676 425.801 172.925C425.444 171.257 426.284 169.804 425.97 168.399C425.774 168.312 425.568 168.248 425.357 168.211C419.265 168.375 413.167 168.424 407.085 168.771C403.77 168.952 400.497 169.62 397.367 170.756C394.677 171.398 392.041 172.258 389.483 173.326C388.924 173.642 388.279 173.759 387.649 173.659C389.237 172.706 388.272 173.202 389.58 172.483C391.815 171.084 394.084 169.744 396.266 168.26C397.331 167.48 398.325 166.601 399.235 165.636C399.971 164.925 400.453 163.982 400.606 162.956C399.954 162.619 399.418 162.321 398.863 162.063C397.666 161.517 396.449 161.001 395.262 160.445C394.958 160.302 394.499 160.212 394.663 159.542H402.03C407.031 153.901 411.545 148.006 414.683 141.109C415.302 139.747 415.809 138.335 416.199 136.886C416.682 135.05 416.981 133.18 416.489 131.26C415.861 128.779 414.461 127.399 411.96 127.245C410.423 127.137 408.879 127.214 407.36 127.474C405.306 127.88 403.278 128.411 401.287 129.066C395.894 130.744 390.743 133.081 385.496 135.16C385.032 135.332 384.611 135.607 384.261 135.964C383.912 136.321 383.643 136.753 383.473 137.229C382.57 139.412 381.619 141.58 380.649 143.739C380.475 144.121 380.451 144.677 379.847 144.801C379.698 142.434 380.605 140.117 380.224 137.765C379.302 137.541 378.66 138.082 377.97 138.375C372.983 140.499 368.01 142.657 362.787 144.091C361.447 144.452 360.084 144.713 358.708 144.87C357.819 144.979 356.733 145.143 356.236 144.091C355.811 143.208 356.328 142.349 356.873 141.694C358.051 140.28 358.727 138.598 359.461 136.946C360.806 133.919 362.137 130.886 363.453 127.846C363.728 127.201 363.936 126.511 364.139 125.861C364.416 125.395 364.671 124.915 364.901 124.422C368.03 116.835 370.994 109.184 373.562 101.374C375.657 94.9931 377.55 88.5476 378.616 81.8838C379.058 79.4679 379.266 77.0131 379.239 74.5551C379.237 72.8071 378.909 71.0756 378.274 69.4543C377.381 67.3802 375.86 66.2191 373.596 66.2042C373.113 66.2042 372.669 66.2043 372.205 66.239C369.281 66.4873 366.416 67.2248 363.723 68.4222C358.819 70.4715 354.459 73.4436 350.366 76.8574C349.052 77.949 347.792 79.1101 346.552 80.2017C346.494 82.4247 346.436 84.4789 346.378 86.5381C346.379 86.5744 346.374 86.6107 346.361 86.6448C346.349 86.6789 346.33 86.7101 346.306 86.7365C346.252 86.7812 346.161 86.7812 345.987 86.8259L343.766 83.164C343.25 83.6155 342.801 83.938 342.458 84.3102C338.601 88.3068 334.952 92.5087 331.524 96.8985C331.34 97.1549 331.179 97.4272 331.041 97.7122L327.84 101.508C327.447 102.603 326.781 103.573 325.909 104.321C325.817 104.093 325.682 103.925 325.721 103.825C326.204 102.714 326.754 101.617 327.271 100.511C328.178 98.3474 329.084 96.1823 329.988 94.0156C330.746 92.1996 331.548 90.4034 332.253 88.5576C335.226 80.8071 337.819 72.9326 339.219 64.7008C339.6 62.4531 340.083 60.1954 339.875 57.8385C339.006 57.3175 338.065 57.3423 337.162 57.258C336.259 57.1736 335.352 57.1736 334.333 56.5782C336.163 55.0102 338.166 53.9583 339.919 52.3308C339.557 48.1777 338.47 44.2876 335.511 41.1864C331.567 37.0333 326.262 35.8871 321.13 38.6558C319.835 39.3593 318.601 40.1761 317.442 41.0971C313.493 44.238 310.485 48.2472 307.642 52.435C308.231 55.7446 308.81 58.9996 309.462 62.6763C309.061 62.361 308.679 62.0213 308.317 61.6592C307.405 60.5874 306.526 59.4759 305.609 58.4091C305.251 58.0578 304.867 57.7359 304.46 57.4465C302.718 60.6172 300.815 63.5 299.56 66.7501C299.289 67.1204 299.04 67.5082 298.817 67.9111C297.441 70.799 296.089 73.6967 294.728 76.5895C295.048 77.0234 295.396 77.4345 295.771 77.82C299.667 81.2811 302.093 86.171 302.529 91.4454C303.138 97.8958 301.269 103.503 296.915 108.162C294.708 110.633 291.808 112.336 288.616 113.035C289.336 113.724 290.224 113.427 291.03 113.432C298.397 113.456 305.769 113.432 313.14 113.432C313.753 113.432 314.371 113.407 314.98 113.461C316.157 113.565 316.635 114.359 316.143 115.416C315.776 116.19 315.303 116.905 314.878 117.664C314.091 120.061 313.145 122.417 312.551 124.864C310.9 131.602 311.47 138.226 313.903 144.711C314.289 145.743 314.674 146.777 315.057 147.812C315.39 148.343 315.723 148.869 316.051 149.405C316.238 149.707 316.35 150.051 316.376 150.408C316.402 150.765 316.342 151.122 316.201 151.45H324.528C324.915 152.065 324.528 152.303 324.331 152.596L322.259 155.364C322.057 155.861 321.878 156.387 321.646 156.853C318.187 164.187 318.105 171.558 321.4 178.968C321.627 179.464 321.835 179.961 322.052 180.457L322.274 181.027L324.997 184.744C326.078 184.744 327.159 184.798 328.236 184.798H403.758C404.666 184.853 405.574 184.719 406.52 185.051Z" fill="url(#paint1_linear_160_1809)"/>
<path d="M447.969 223.417C446.713 224.588 445.298 225.565 443.769 226.319C440.497 227.917 437.066 229.142 433.535 229.971C429.19 231.073 424.802 231.882 420.38 232.537C419.086 232.725 417.816 233.063 416.517 233.331L415.499 233.355C415.175 232.944 414.862 232.988 414.533 233.355L406.756 233.311C406.734 233.156 406.685 233.006 406.611 232.869C405.107 231.025 403.723 229.081 402.469 227.049C402.224 226.753 401.947 226.487 401.644 226.255C401.325 225.377 401.064 224.474 400.678 223.625C398.511 218.884 397.492 213.675 397.709 208.442C397.709 208.05 397.806 207.663 397.854 207.271C400.751 206.894 403.647 206.497 406.544 206.149C414.656 205.086 422.861 205.009 430.991 205.921C434.284 206.286 437.525 207.047 440.646 208.189C442.396 208.812 444.064 209.659 445.608 210.709C447.175 211.738 448.467 213.152 449.369 214.823C451.01 218.003 450.528 220.966 447.969 223.417Z" fill="url(#paint2_linear_160_1809)"/>
<path d="M292.468 75.3539C289.031 73.7661 285.43 73.3692 281.674 73.3989C271.826 73.5032 261.973 73.4387 252.125 73.4337C251.28 73.4337 250.435 73.3642 249.59 73.3245C249.59 72.4066 250.652 43.4688 250.976 39.4398C251.518 31.8458 253.158 24.3773 255.842 17.28C256.957 14.4494 258.38 11.7577 260.085 9.25661C260.84 8.08161 261.741 7.01246 262.764 6.07604C264.031 4.89292 265.424 3.8609 266.916 2.99967C269.277 1.68239 271.838 0.786456 274.491 0.350022C280.284 -0.458766 285.874 -0.0221196 290.962 3.32716C291.362 3.55673 291.778 3.75414 292.208 3.91762C293.241 4.86038 294.322 5.75352 295.312 6.7459C297.988 9.441 299.783 12.9245 300.448 16.7143C299.044 18.5998 297.069 19.9346 295.563 21.8995C296.615 22.0732 297.286 21.4331 298.049 21.1453C298.812 20.8575 299.604 20.4903 300.555 20.0785C300.686 20.528 300.772 20.9902 300.811 21.4579C300.685 24.3854 300.637 27.3278 300.357 30.2404C299.097 43.2654 296.557 56.0671 293.888 68.8439C293.434 71.0123 292.946 73.1906 292.468 75.3539Z" fill="url(#paint3_linear_160_1809)"/>
<path d="M397.859 205.946C397.883 205.742 397.903 205.539 397.927 205.336L398.998 205.405L397.859 205.946Z" fill="#F2870F"/>
<path d="M401.702 192.013H399.848C348.064 192.013 296.276 192.005 244.483 191.988C241.462 191.905 238.471 192.615 235.793 194.052C233.66 195.195 231.801 196.812 230.353 198.786C228.905 200.76 227.903 203.042 227.422 205.465C226.521 209.693 227.213 214.115 229.357 217.84C231.502 221.565 234.94 224.317 238.979 225.54C240.839 226.064 242.762 226.313 244.69 226.28C268.616 226.26 292.543 226.26 316.471 226.28C321.178 226.28 325.885 226.25 330.592 226.235C332.656 228.466 334.528 230.876 336.187 233.44C335.337 233.44 334.488 233.474 333.643 233.474C260.332 233.474 187.022 233.474 113.714 233.474C111.71 233.474 109.702 233.395 107.699 233.355C107.168 232.944 106.632 232.532 105.908 232.586C101.91 231.261 98.9172 228.617 96.7352 224.995C95.641 223.064 94.9597 220.916 94.7365 218.693C94.0172 213.16 94.4131 207.613 94.4179 202.081C94.4681 199.058 95.2195 196.091 96.6096 193.427C97.598 191.569 98.9687 189.956 100.626 188.698C101.843 187.745 103.162 186.936 104.556 186.287C106.485 185.306 108.612 184.805 110.764 184.823C113.83 184.888 116.895 184.783 119.936 184.749L123.316 184.709C124.161 184.744 125.01 184.808 125.855 184.808C191.381 184.808 256.907 184.808 322.433 184.808C323.283 184.808 324.133 184.808 324.982 184.808C326.064 184.808 327.145 184.863 328.222 184.863H403.744C404.637 184.863 405.559 184.729 406.505 185.061C406.418 185.404 406.433 185.682 406.307 185.82C404.794 187.512 403.46 189.365 402.329 191.348C402.143 191.591 401.933 191.814 401.702 192.013Z" fill="#B75743"/>
<path d="M322.259 155.364C322.057 155.861 321.878 156.387 321.646 156.853C318.187 164.187 318.105 171.558 321.4 178.968C321.627 179.464 321.835 179.96 322.052 180.457L321.424 180.953C320.657 180.978 319.889 181.027 319.122 181.027H260.225C259.458 181.027 258.69 180.978 257.923 180.953L257.469 180.536C257.469 175.539 257.43 170.543 257.43 165.546C257.43 162.137 257.469 158.729 257.488 155.32L322.259 155.364Z" fill="#F9E0B2"/>
<path d="M241.76 180.978C241.301 181.007 240.838 181.062 240.379 181.062C234.282 181.062 228.185 181.062 222.088 181.062C220.346 181.05 218.627 180.662 217.041 179.924C215.455 179.186 214.037 178.114 212.879 176.777C211.721 175.441 210.849 173.869 210.319 172.165C209.788 170.46 209.612 168.66 209.801 166.881C210.535 160.068 215.638 155.533 221.919 155.389C228.479 155.24 235.04 155.345 241.601 155.335C241.63 156.124 241.688 156.917 241.688 157.706C241.688 164.594 241.688 171.481 241.688 178.368C241.683 179.241 241.736 180.109 241.76 180.978Z" fill="#F9E0B2"/>
<path d="M241.76 180.978C241.76 180.109 241.683 179.241 241.683 178.368C241.683 171.481 241.683 164.594 241.683 157.706C241.683 156.917 241.625 156.124 241.596 155.335V151.588C241.596 150.363 241.596 149.132 241.596 147.907C241.634 144.07 241.671 140.234 241.707 136.4C241.737 136.049 241.66 135.696 241.487 135.391C241.314 135.087 241.054 134.844 240.741 134.698L240.259 133.021C244.261 132.991 248.267 132.852 252.27 132.971C255.649 133.071 257.406 135.184 257.43 138.633C257.43 141.719 257.498 144.806 257.532 147.892C257.512 149.129 257.496 150.364 257.483 151.598V155.364C257.483 158.773 257.425 162.182 257.425 165.591C257.425 170.587 257.425 175.584 257.464 180.581C256.687 180.725 256.146 180.223 255.586 179.827C254.138 178.794 252.69 177.713 251.241 176.686C249.412 175.391 249.31 175.405 247.611 176.686C247.302 176.919 246.974 177.127 246.67 177.365C245.149 178.566 243.633 179.777 242.117 180.983H241.943L241.76 180.978Z" fill="#F47559"/>
<path d="M242.107 180.973C243.623 179.767 245.139 178.556 246.66 177.355C246.964 177.117 247.292 176.909 247.601 176.676C249.305 175.396 249.402 175.381 251.231 176.676C252.68 177.703 254.128 178.784 255.576 179.817C256.136 180.213 256.677 180.715 257.454 180.571L257.908 180.988L242.107 180.973Z" fill="#F9DFB1"/>
<path d="M321.424 180.988L322.052 180.491L322.274 181.062L321.424 180.988Z" fill="#F9DFB1"/>
<path d="M257.517 147.892C257.483 144.805 257.44 141.719 257.416 138.633C257.391 135.184 255.61 133.071 252.255 132.971C248.253 132.852 244.246 132.971 240.244 133.021C238.704 132.986 237.164 132.872 235.629 132.947C234.872 133.041 234.137 133.264 233.452 133.606C233.094 133.755 232.867 134.103 233.229 134.743C235.643 134.782 238.178 134.832 240.702 134.698C241.015 134.844 241.275 135.087 241.448 135.391C241.621 135.696 241.698 136.049 241.668 136.4C241.629 140.237 241.592 144.073 241.557 147.907L210.284 147.872C209.512 147.872 208.739 147.872 207.967 147.872C201.247 147.788 194.59 142.032 194.372 133.77C194.272 131.946 194.435 130.117 194.855 128.342C196.598 121.772 202.425 117.743 207.88 117.654C208.652 117.654 209.425 117.629 210.197 117.629H312.353C313.198 117.629 314.048 117.669 314.897 117.689C314.11 120.085 313.164 122.442 312.57 124.888C310.919 131.627 311.489 138.251 313.922 144.736C314.308 145.768 314.693 146.802 315.076 147.837C314.154 147.862 313.232 147.912 312.305 147.912L257.517 147.892Z" fill="#F9E0B2"/>
<path d="M105.917 232.547C106.641 232.492 107.177 232.904 107.708 233.316L105.917 233.276V232.547Z" fill="#EE6F11"/>
<path d="M401.653 226.24C401.957 226.472 402.234 226.738 402.479 227.034C403.733 229.066 405.116 231.011 406.621 232.854C406.694 232.991 406.743 233.141 406.766 233.296C405.844 233.34 404.922 233.43 404.004 233.43C388.511 233.43 373.021 233.43 357.534 233.43C356.612 233.43 355.69 233.479 354.768 233.504C353.803 232.413 352.837 231.356 351.92 230.219C350.921 228.964 349.989 227.634 349.062 226.334C350.056 226.3 351.056 226.235 352.055 226.235L401.653 226.24Z" fill="#B75743"/>
<path d="M320.946 214.773H307.038L306.555 214.401C306.444 211.95 307.521 210.357 309.785 209.568L310.717 209.275H313.536C314.699 209.831 315.853 210.421 317.031 210.942C318.45 211.573 319.556 212.664 320.797 213.557C321.265 213.885 321.217 214.322 320.946 214.773Z" fill="#1C4655"/>
<path d="M414.543 233.34C414.857 232.963 415.171 232.919 415.508 233.34H414.543Z" fill="#B75743"/>
<path d="M257.474 155.364V151.608C258.396 151.608 259.323 151.608 260.249 151.608C277.909 151.608 295.568 151.608 313.227 151.608C314.226 151.608 315.226 151.519 316.225 151.469H324.528C324.915 152.085 324.528 152.323 324.331 152.615L322.26 155.364H257.474Z" fill="#86B0F1"/>
<path d="M316.22 151.435C315.221 151.484 314.222 151.573 313.222 151.573C295.563 151.573 277.904 151.573 260.245 151.573C259.318 151.573 258.391 151.573 257.469 151.573C257.469 150.336 257.485 149.101 257.517 147.867H312.305C313.232 147.867 314.154 147.817 315.076 147.793C315.409 148.323 315.742 148.849 316.07 149.385C316.258 149.688 316.37 150.033 316.397 150.391C316.423 150.748 316.362 151.107 316.22 151.435Z" fill="#38558A"/>
<path d="M306.555 214.411L307.038 214.783C306.739 214.843 306.555 214.748 306.555 214.411Z" fill="#375985"/>
<path d="M240.703 134.698C238.178 134.832 235.653 134.782 233.23 134.743C232.868 134.123 233.094 133.75 233.452 133.607C234.137 133.264 234.873 133.041 235.629 132.947C237.164 132.872 238.704 132.986 240.244 133.021C240.399 133.582 240.553 134.137 240.703 134.698Z" fill="#EE6F11"/>
<defs>
<linearGradient id="paint0_linear_160_1809" x1="85.4772" y1="138.246" x2="22.9677" y2="255.742" gradientUnits="userSpaceOnUse">
<stop stop-color="#F38D0A"/>
<stop offset="0.9" stop-color="#ED6712"/>
</linearGradient>
<linearGradient id="paint1_linear_160_1809" x1="331.031" y1="173.575" x2="429.479" y2="51.113" gradientUnits="userSpaceOnUse">
<stop stop-color="#F0780F"/>
<stop offset="0.52" stop-color="#F4910A"/>
</linearGradient>
<linearGradient id="paint2_linear_160_1809" x1="397.7" y1="219.303" x2="450.344" y2="219.303" gradientUnits="userSpaceOnUse">
<stop offset="0.01" stop-color="#F39008"/>
<stop offset="1" stop-color="#EE6C10"/>
</linearGradient>
<linearGradient id="paint3_linear_160_1809" x1="274.273" y1="81.9681" x2="277.16" y2="-19.9943" gradientUnits="userSpaceOnUse">
<stop stop-color="#EF7210"/>
<stop offset="1" stop-color="#ED6811"/>
</linearGradient>
</defs>
        </svg>

      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const query = `*[_type == 'programmes']{
    _id,
    title,
    slug,
    introShort,
    mainImage,
    
  }`

  const programmes = await sanityClient.fetch(query)
  return {
    props: {programmes}, // will be passed to the page component as props
  }
}

export default programmes