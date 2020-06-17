import styled from '@emotion/styled'
import { Link } from 'gatsby'
import tw from 'tailwind.macro'

import PostHeader from './PostHeader'

const PostFull = ({ post }: {
  post: {
    title: string
    image?: string
    tag?: string[]
    html: string
  }
}) => {
  const Section = styled.section`
    article {
      ${tw`my-4`}
    }

    footer {
      ${tw`my-4`}
    }

    .tw-break-word {
      ${tw`break-words`}
    }

    .u-tag + .u-tag {
      margin-left: 0.5em;
    }

    .image-full {
      text-align: center;
      margin: 1rem;
    }

    .image-full img {
      min-width: 500px;
      width: auto;
    }

    @media only screen and (max-width: 800px) {
      .image-full {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
      }

      .image-full img {
        min-width: unset;
        width: auto;
      }
    }
  `

  return (
    <Section>
      <article>
        <div className="card-content content">
          <PostHeader post={post} />
          <h1 className="title">{post.title}</h1>

          {post.image ? (
            <div className="image-full">
              <img src={post.image} alt={post.title} />
            </div>
          ) : null}

          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
          <div className="tw-break-word">
            <span>Tags: {(post.tag || []).map((t: string) => (
              <span className="u-tag" key={t}>
                <Link to={`/tag/${t}`}>{t}</Link>
              </span>
            ))}</span>
          </div>
        </div>
      </article>

      <footer className="card">
        <div className="card-content">
          <div id="remark42"></div>
        </div>
      </footer>
    </Section>
  )
}

export default PostFull