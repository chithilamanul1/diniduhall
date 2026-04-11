import { createClient } from 'contentful'

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

if (!space || !accessToken) {
  console.warn('Contentful environment variables are missing. Blog features may not work.')
}

export const contentfulClient = (space && accessToken) 
  ? createClient({ space, accessToken })
  : null

export async function getBlogPosts() {
  if (!contentfulClient) return []
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-sys.createdAt'],
    })
    return entries.items
  } catch (error) {
    console.error('Error fetching Contentful entries:', error)
    return []
  }
}

export async function getBlogPost(slug: string) {
  if (!contentfulClient) return null
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
