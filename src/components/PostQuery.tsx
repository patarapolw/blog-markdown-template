import styled from '@emotion/styled'
import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind.macro'

import { normalizeArray } from '@/lib/util'

import Empty from './Empty'
import Pagination from './Pagination'
import PostTeaser from './PostTeaser'

const PostQuery = (props: {
  defaults: {
    posts: {
      title: string
      date?: string
      tag?: string[]
      excerptBody: string
      slug: string
    }[]
    count: number
  }
}) => {
  const { defaults } = props

  const [count, setCount] = useState(defaults.count)
  const [posts, setPosts] = useState(defaults.posts)

  const { query: { q, page, tag } } = props as any
  const [isQReady, setQReady] = useState(!q)

  if (!isQReady) {
    useEffect(() => {
      (async () => {
        const { count, result } = await fetch(`/.netlify/function/search?${qs.stringify({
          q,
          offset: (parseInt(normalizeArray(page) || '1') - 1) * 5,
          tag
        })}`).then((r) => r.json())

        setCount(count)
        setPosts(result)
        setQReady(true)
      })().catch(console.error)
    }, [])
  }

  const Section = styled.section`
    .post-query-entry {
      margin-top: 1rem;
    }

    header {
      ${tw`m-4`}
    }

    .tw-font-bold {
      ${tw`font-bold`}
    }
  `

  return (
    <Section>
      {tag ? (
        <header>
          Tag: <span className="tw-font-bold">{tag}</span>
        </header>
      ) : null}

      {isQReady ? (
        posts.length > 0 ? (
          <article>
            {posts.map((p) => (
              <div className="post-query-entry" key={p.slug}>
                <PostTeaser post={p} />
              </div>
            ))}
            <Pagination
              current={parseInt(normalizeArray(page) || '1')}
              total={Math.ceil(count / 5)}
              q={normalizeArray(q)} />
          </article>
        ) : <Empty />
      ) : null /* Loading */}
    </Section>
  )
}

export default PostQuery
