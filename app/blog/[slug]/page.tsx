import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { CalendarIcon, UserIcon, ArrowLeftIcon } from 'lucide-react'

interface ContentfulPost {
  fields: {
    title: string;
    category?: string;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    content: any;
  };
  sys: {
    createdAt: string;
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = (await getBlogPost(slug)) as unknown as ContentfulPost

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.fields.title,
    description: `Read more about ${post.fields.title} at Dinidu Gardens.`,
    openGraph: {
      title: post.fields.title,
      description: post.fields.category || 'Dinidu Gardens Insights',
      images: post.fields.featuredImage?.fields?.file?.url 
        ? [`https:${post.fields.featuredImage.fields.file.url}`] 
        : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = (await getBlogPost(slug)) as unknown as ContentfulPost

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gold font-body font-semibold tracking-widest text-sm mb-12 hover:-translate-x-2 transition-transform"
        >
          <ArrowLeftIcon className="mr-2 w-4 h-4" />
          BACK TO JOURNAL
        </Link>

        {/* Post Metadata */}
        <div className="text-center mb-12">
          <span className="font-body text-sm text-gold uppercase tracking-[0.3em] block mb-4">
            {post.fields.category || 'Insights'}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl text-neutral-900 mb-8 leading-tight">
            {post.fields.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-sm font-body text-neutral-400 uppercase tracking-widest">
            <span className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-gold" />
              {new Date(post.sys.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2 text-gold" />
              Admin
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {post.fields.featuredImage?.fields?.file?.url && (
          <div className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <Image
              src={`https:${post.fields.featuredImage.fields.file.url}`}
              alt={post.fields.title || 'Blog Post'}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-gold prose-lg max-w-none font-body text-neutral-600 leading-relaxed prose-headings:font-heading prose-headings:text-neutral-900 prose-a:text-gold hover:prose-a:text-gold/80 transition-colors">
          {documentToReactComponents(post.fields.content)}
        </div>

        <div className="mt-20 pt-10 border-t border-neutral-200">
          <div className="bg-neutral-900 rounded-[3rem] p-10 md:p-16 text-center">
            <h3 className="font-heading text-3xl text-white mb-6">
              Plan Your <span className="italic font-light">Cherished Moment</span>
            </h3>
            <p className="font-body text-neutral-400 mb-10 max-w-2xl mx-auto">
              Our venue at Dinidu Gardens provides the perfect backdrop for weddings, corporate gatherings, and special celebrations.
            </p>
            <Link
              href="/booking"
              className="bg-gold text-white px-10 py-4 rounded-full font-body font-semibold tracking-widest hover:bg-gold/90 transition-all inline-block"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
