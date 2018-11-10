import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Markdown from 'react-markdown'


const PostContent = ({ data: { loading, error, event } }) => {

  if (error) return <h1>Error loading post {JSON.stringify(error)}.</h1>
  if (!loading) {
    return (
      <article>
        <h1>{event.name}</h1>
        <Markdown
          source={event.description}
          escapeHtml={false}
        />
        <p>Weather is {event.venue.location.weather.summary}</p>
        <section>
        <h2>Talks</h2>
        <ul>
          {event.talks.map(talk => (
            <li key={`event-${talk.id}`}>
              <h3>{talk.title} by {
                talk.speakers
                .map(speaker => speaker.name)
              }</h3>
            </li>
          ))}
        </ul>
        </section>

        <style jsx>{`
          .placeholder {
            height: 366px;
            background-color: #eee;
          }
        `}</style>
      </article>
    )
  }
  return <h2>Loading post...</h2>
}

export const singlePost = gql`
  query singlePost($id: ID!) {
    event(where: {
      id: $id
    }) {
      id
      venue {
        location {
          coords
            weather {
            summary
          }
        }
      }
      name
      description
      talks {
        title
        speakers {
          name
        }
      }
    }
  }
`

export default graphql(singlePost, {
  options: ({ id }) => ({ variables: { id } })
})(PostContent)
