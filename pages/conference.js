import withData from '../lib/withData'
import App from '../components/App'
import Conference from '../components/Conference'

const PostPage = withData(props => (
  <App pathname={props.url.pathname}>
    <Conference id={props.url.query.id} />
  </App>
))

export default PostPage
