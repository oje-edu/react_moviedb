import Badge from '@material-ui/core/Badge'
import { img300, unavailable } from '../../config/config'
import './SingleContent.css'

const SingleContent = ({ id, poster, title, date, mediaType, voteAverage }) => {
  return (
    <div className='media'>
      <Badge badgeContent={voteAverage} color={voteAverage > 6 ? 'primary' : 'secondary'} />
      <img className='poster' src={poster ? `${img300}/${poster}` : unavailable} alt={title} />
      <b className='title'>{title}</b>
      <span className='subTitle'>
        {mediaType === 'tv' ? 'Serie' : 'Film'}
        <span className='subTitle'>{date}</span>
      </span>
    </div>
  )
}

export default SingleContent
