import {defineField, defineType} from 'sanity'


export default defineType({
  name: 'pages',
  title: "Pages d'informations",
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      title: 'Rédaction',
      type: 'blockContent',
    }),
    defineField({
      name: 'buttonCta',
      title: 'Bouton',
      description: "Ajouter un bouton call to action pour rédiriger l'utilisateur vers une autre page. ",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
                name: 'btnText',
                title: 'Texte du bouton',
                type: 'string'
              },
              {
                name: 'btnUrl',
                title: 'Lien vers la page',
                type: 'url'
              }
                ]
        }
      ]
    }),
    defineField({
      name: 'faq',
      title: 'Partie FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
                name: 'question',
                title: 'Question',
                type: 'string'
              },
              {
                name: 'answer',
                title: 'Réponse',
                type: 'string'
              }
                ]
        }
      ]
    }),
    
  ],

})
