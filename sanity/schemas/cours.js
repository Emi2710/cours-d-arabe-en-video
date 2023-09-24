import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'cours',
  title: 'Cours',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du cours',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'ressourcesUtiles',
      title: 'Ressources utiles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
                name: 'linkTitle',
                title: 'Nom de la ressource',
                type: 'string'
              },
              {
                name: 'linkUrl',
                title: 'Lien vers la ressource',
                type: 'url'
              },
              {
                title: 'Type',
                name: 'type',
                type: 'string',
                options: {
                  list: [
                    {title: 'Pdf', value: 'pdf'},
                    {title: 'Vocabulaire', value: 'vocab'},
                    {title: 'Schéma', value: 'schema'}
                  ], 
                  layout: 'radio' 
                }
              }

                ]
        },

        
      ]
    }),

    defineField({
      name: 'lesson',
      title: 'Ajouter une leçon',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
                name: 'name',
                title: "Nom de la leçon (ou de l'examen)",
                type: 'string'
              },
              {
                name: 'lessonLink',
                title: "Lien vers la leçon (ou l'examen)",
                type: 'url'
              },
              {
                name: 'pdfLink',
                title: 'Lien vers le pdf',
                type: 'url'
              },
              {
                title: 'Est-ce une leçon ou un examen ?',
                name: 'type',
                type: 'string',
                options: {
                  list: [
                    {title: 'Leçon', value: 'lesson'},
                    {title: 'Examen', value: 'exam'},
                  ], 
                  layout: 'radio' 
                }
              },
              defineField({
                name: 'publishedAt',
                title: 'Date de publication',
                type: 'datetime',
              }),

                ]
        },

        
      ]
    }),
    defineField({
      name: 'category',
      title: 'Catégories',
      type: 'reference',
      to: {type: 'category'},
    }),

    
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      media: 'category.mainImage',
    },
    prepare(selection) {
      const {category} = selection
      return {...selection, subtitle: category && `${category}`}
    },
  },
  
})
