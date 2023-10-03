/* GENERAL */
interface Image {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
}

/* PAGE INFO */

export interface PageInfo {
  _id: string;
  title: string;
  slug: {
        current: string;
  };
  body?: [object];
  buttonCta: ButtonCta;
  faq?: FAQ[];

};

type ButtonCta = {
  _id: string;
  btnText:string;
  btnUrl: string;
};

type FAQ = {
  _id: string;
  question: string;
  answer: string;
};

/* PROGRAMMES INTRO */

export interface ProgrammeIntro {
    _id : string;
    _createdAt: string;
    title: string;
    slug: {
        current: string;
    };
    mainImage?: Image;
    introShort?: string;  
    
}


/* PROGRAMMES */

export interface Programme {
  _id : string;
  _createdAt: string;
  title: string;
  slug: {
        current: string;
  };
  mainImage?: Image;
  introShort?: string;
  introDetailed?: [object];
  retrouveLesCours?: RetrouveLesCours[];
  cours: Cours[];
  
}

export type RetrouveLesCours = {
  _id?: string;
  linkTitle: string;
  linkUrl: string;

}

type Cours = {
  _id: string;
  name: string;
  slug: {
        current: string;
  };
  lesson: LessonType[];

}


/* COURS */

export interface CoursDetails {
  _id : string;
  name: string;
  slug: {
        current: string;
  };
  ressourcesUtiles?: Ressources[];
  lesson: LessonType[];
  category?: string;
  
}

export type Ressources = {
  _id?: string;
  linkTitle?: string;
  linkUrl?: string;
  type?: 'pdf' | 'vocab' | 'schema';

}

export type LessonType = {
  name: string;
  lessonLink: string;
  pdfLink?: string;
  type?: 'lesson' | 'exam';
  publishedAt?: Date;
}






