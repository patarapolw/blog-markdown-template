import styled from '@emotion/styled'
import { Link } from 'gatsby'
import qs from 'query-string'
import tw from 'tailwind.macro'

const Pagination = (props: {
  current: number
  total: number
  q: string
}) => {
  const { current: page, total, q } = props
  const { location: { pathname } } = props as any

  const setPageUrl = (p: number) => {
    const path0 = pathname.replace(/\/(\d+)?$/, '')
    return `${path0 || '/blog'}${p === 1 ? '' : `/${p}`}?${qs.stringify({
      q
    })}`
  }

  const Nav = styled.nav`
    ${tw`mx-2 my-4`}


  `

  return (
    <Nav
      className="pagination is-rounded"
      role="navigation"
      aria-label="pagination">
      {page > 1 ? (
        <Link to={setPageUrl(page - 1)} className="pagination-previous">
          <span className="icon">
            <i className="fa fa-caret-left">Previous</i>
          </span>
        </Link>
      ) : null}

      {page < total - 1 ? (
        <Link to={setPageUrl(page - 1)} className="pagination-next">
          <span className="icon">
            <i className="fa fa-caret-right">Next</i>
          </span>
        </Link>
      ) : null}

      <ul className="pagination-list">
        {page > 1 ? (
          <li>
            <Link to={setPageUrl(1)} className="pagination-link" aria-label="go to page 1">
              1
            </Link>
          </li>
        ) : null}

        {page > 3 ? (
          <li><span className="pagination-ellipsis">&hellip;</span></li>
        ) : null}

        {page > 2 ? (
          <li>
            <Link to={setPageUrl(page - 1)} className="pagination-link" aria-label={`go to page ${page - 1}`}>
              {page - 1}
            </Link>
          </li>
        ) : null}

        <li>
          <Link to={setPageUrl(page)} className="pagination-link is-current" aria-label={`page ${page}`} aria-current="page">
            {page}
          </Link>
        </li>

        {page < total - 1 ? (
          <li>
            <Link to={setPageUrl(page + 1)} className="pagination-link" aria-label={`go to page ${page + 1}`}>
              {page + 1}
            </Link>
          </li>
        ) : null}

        {page < total - 2 ? (
          <li><span className="pagination-ellipsis">&hellip;</span></li>
        ) : null}

        {page < total ? (
          <li>
            <Link to={setPageUrl(total)} className="pagination-link" aria-label={`go to page ${total}`}>
              {total}
            </Link>
          </li>
        ) : null}
      </ul>
    </Nav>
  )
}

export default Pagination