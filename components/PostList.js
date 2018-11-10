import Link from 'next/link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const PostList = ({ data: { loading, error, events } }) => {
  if (error) return <h1>Error loading posts.</h1>
  if (!loading) {
    return (
      <section>
        <ul>
          {events.map(event => (
            <li key={`event-${event.id}`}>
              <Link prefetch href={`/conference?id=${event.id}`} as={`/conference/${event.id}`}>
                <a>
                  <h3>{event.name} @ {event.venue.name}</h3>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <style jsx>{`
          ul {
            padding: 0;
          }
          li {
            display: flex;
            align-items: stretch;
            margin-bottom: 16px;
            border: 1px solid #eee;
            overflow: hidden;
            border-radius: 5px;
          }
          a {
            display: flex;
            color: #000;
            width: 100%;
          }
          a:hover {
            box-shadow: 1px 1px 5px #999;
          }
          h3 {
            width: 100%;
            padding: 10px;
          }
          img {
            display: block;
            height: 100%;
          }
          button {
            width: 100%;
            font-size: 16px;
            color: white;
            text-transform: uppercase;
            font-weight: bold;
            padding: 16px 24px;
            background: deepskyblue;
            border: none;
            border-radius: 0;
            cursor: pointer;
          }
        `}</style>
      </section>
    )
  }
  return <h2>Loading events...</h2>
}

export const events = gql`
  query {
    events {
      id
      name
      description
      venue {
        name
        location {
          weather {
            temperature
          }
        }
      }
      talks {
        title
        description
        speakers {
          name
          bio
        }
      }
    }
  }
`

export default graphql(events, {
  options: {
  },
  props: ({ data }) => ({
    data
  })
})(PostList)
