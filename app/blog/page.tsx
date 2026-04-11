import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts } from '@/lib/contentful'
import { CalendarIcon, UserIcon, ArrowRightIcon } from 'lucide-react'

export default async function BlogIndex() {
  let posts: any[] = []
  try {
    posts = await getBlogPosts()
  } catch (e) {
    // Contentful not configured yet — show empty state
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="font-body text-sm text-gold uppercase tracking-[0.3em] block mb-4">
            Insights & Stories
          </span>
          <h1 className="font-heading text-5xl md:text-7xl text-neutral-900 mb-6">
            Dinidu <span className="italic font-light">Journal</span>
          </h1>
          <div className="w-24 h-[2px] bg-gold mx-auto mb-8" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length > 0 ? (
            posts.map((post: any, index: number) => (
              <article
                key={post.sys.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  {post.fields.featuredImage?.fields?.file?.url ? (
                    <Image
                      src={`https:${post.fields.featuredImage.fields.file.url}`}
                      alt={post.fields.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200" />
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-body font-semibold text-gold tracking-wider uppercase">
                      {post.fields.category || 'News'}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4 text-xs font-body text-neutral-400 uppercase tracking-widest">
                    <span className="flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1.5 text-gold" />
                      {new Date(post.sys.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <UserIcon className="w-3 h-3 mr-1.5 text-gold" />
                      Admin
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl text-neutral-900 mb-4 group-hover:text-gold transition-colors line-clamp-2">
                    {post.fields.title}
                  </h2>
                  <p className="font-body text-neutral-600 mb-8 line-clamp-3 leading-relaxed">
                    {post.fields.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.fields.slug}`}
                    className="inline-flex items-center text-gold font-body font-semibold tracking-widest text-sm group-hover:translate-x-2 transition-transform"
                  >
                    READ ARTICLE
                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="bg-white rounded-[3rem] p-16 border border-neutral-100 max-w-lg mx-auto">
                <CalendarIcon className="w-12 h-12 text-gold/20 mx-auto mb-6" />
                <h3 className="font-heading text-2xl text-neutral-900 mb-3">
                  Coming Soon
                </h3>
                <p className="font-body text-neutral-500">
                  Our journal is being prepared. Check back soon for insights, event tips, and stories from Dinidu Gardens.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
