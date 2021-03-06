import Link from 'next/link'
import { useState } from 'react'

const BlogLayout = ({ children, banner }: {
  children: React.ReactNode
  banner: string
}) => {
  const [isNavExpanded, setNavExpanded] = useState(false)

  return (
    <section>
      <nav className="navbar has-shadow is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <h1 className="tw-font-bold">{banner}</h1>
            </a>
          </Link>

          <a
            role="button"
            className={['navbar-burger', 'burger', isNavExpanded ? 'is-active' : ''].join(' ')}
            aria-label="menu"
            aria-expanded={isNavExpanded}
            onClick={() => setNavExpanded(!isNavExpanded)}
            onKeyPress={() => setNavExpanded(!isNavExpanded)}
            tabIndex={0}
            data-target="navbarMain">
            <span aria-hidden="true">-</span>
            <span aria-hidden="true">-</span>
            <span aria-hidden="true">-</span>
          </a>
        </div>

        <div id="navbarMain" className={['navbar-menu', isNavExpanded ? 'is-active' : ''].join(' ')}>
          {/* <div className="navbar-start">
          </div> */}
        </div>
      </nav>

      <article style={{ marginTop: '3.25rem' }}>
        <div className="container">
          <div className="columns">
            <main className="column is-8-desktop is-offset-2-desktop">
              {children}
            </main>
          </div>
        </div>
      </article>
    </section>
  )
}

export default BlogLayout
