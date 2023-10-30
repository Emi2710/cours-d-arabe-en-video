import {defineField, defineType} from 'sanity'


export default defineType({
  name: 'programmes',
  title: 'Programmes',
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
      name: 'mainImage',
      title: 'Ajouter une image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introShort',
      title: 'Introduction courte',
      type: 'string',
    }),
    defineField({
      name: 'introDetailed',
      title: 'Introduction détaillée',
      type: 'blockContent',
    }),
    defineField({
      name: 'retrouveLesCours',
      title: 'Retrouve également les cours ici',
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
              }
                ]
        }
      ]
    }),
    defineField({
      name: 'cours',
      title: 'Sommaire',
      type: 'array',
      of: [{type: 'reference', to: {type: 'cours'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],

})
