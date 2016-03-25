import registerBuildAvatarFilter from './build_avatar_filter'
import registerThumbnailService from './thumbnail_service'

export default function register() {
  return this
    ::registerBuildAvatarFilter()
    ::registerThumbnailService()
}
