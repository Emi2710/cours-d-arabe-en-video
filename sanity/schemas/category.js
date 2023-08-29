import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Catégories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la catégorie',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Ajouter une image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
