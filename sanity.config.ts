import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'project',
        title: 'Project',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
          },
          {
            name: 'emoji',
            title: 'Emoji',
            type: 'string',
          },
          {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
          },
          {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
          },
          {
            name: 'liveUrl',
            title: 'Live URL',
            type: 'url',
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
          },
        ],
      },
      {
        name: 'skill',
        title: 'Skill',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                { title: 'Frontend', value: 'frontend' },
                { title: 'Backend', value: 'backend' },
                { title: 'Tools', value: 'tools' },
                { title: 'Design', value: 'design' },
              ],
            },
          },
        ],
      },
      {
        name: 'education',
        title: 'Education',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'institution',
            title: 'Institution',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'year',
            title: 'Year',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
          },
          {
            name: 'emoji',
            title: 'Emoji',
            type: 'string',
          },
        ],
      },
      {
        name: 'profile',
        title: 'Profile',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'cvUrl',
            title: 'CV URL',
            type: 'url',
          },
          {
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
          },
          {
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url',
          },
          {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
    ],
  },
})

