// pages/404.tsx

import Link from 'next/link';

const Custom404Page: React.FC = () => {
  return (
    <div>
      <h1>Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link href="/">Retour à la page d'accueil</Link>
    </div>
  );
};

export default Custom404Page;
