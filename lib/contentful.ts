import { createClient } from 'contentful'

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

if (!space || !accessToken) {
  console.warn('Contentful environment variables are missing. Blog features may not work.')
}

export const contentfulClient = createClient({
  space: space || '',
  accessToken: accessToken || '',
})

export async function getBlogPosts() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost', // Assumes a content type with this ID exists
      order: ['-sys.createdAt'],
    })
    return entries.items
  } catch (error) {
    console.error('Error fetching Contentful entries:', error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
    })
    return entries.items[0]
  } catch (error) {
    console.error(`Error fetching Contentful entry with slug ${slug}:`, error)
    return null
  }
}
