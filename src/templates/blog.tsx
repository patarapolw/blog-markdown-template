import { graphql } from 'gatsby'
import React from 'react'

import BlogLayout from '@/components/layouts/BlogLayout'
import PostQuery from '@/components/PostQuery'
import SEO from '@/components/seo'

export const pageQuery = graphql`
  query BlogPostQuery($skip: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
      skip: $skip
    ) {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            title
            tag
            date
          }
          rawBody
        }
      }
      pageInfo {
        totalCount
      }
    }
  }
`

const Blog = ({
  data: {
    allMdx: {
      edges,
      pageInfo: {
        totalCount: count
      }
    }
  }
}: {
  data: {
    allMdx: {
      edges: {
        node: {
          fileAbsolutePath: string
          frontmatter: {
            title: string
            tag?: string[]
            date?: string
          }
          rawBody: string
        }
      }[]
      pageInfo: {
        totalCount: number
      }
    }
  }
}) => {
  return (
    <>
      <SEO />
      <BlogLayout>
        <PostQuery defaults={{
          posts: edges.map((el) => {
            return {
              title: el.node.frontmatter.title,
              tag: el.node.frontmatter.tag,
              date: el.node.frontmatter.date,
              excerptBody: el.node.rawBody.split(/<!-- excerpt -->/)[0],
              slug: el.node.fileAbsolutePath.replace(/^.*\//, '').replace(/.\.+$/, '')
            }
          }),
          count
        }} />
      </BlogLayout>
    </>
  )
}

export default Blog
