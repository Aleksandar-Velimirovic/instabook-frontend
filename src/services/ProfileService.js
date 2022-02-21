import { HttpService } from './HttpService'

class ProfileService extends HttpService {
  getProfileByUser(userId) {
    return this.axios.get('profile-user', {
        params: {
            user_id: userId
        }
    })
  }
  
  getProfile(profileId) {
    return this.axios.get('profile', {
        params: {
            profile_id: profileId
        }
    })
  }

  follow(data) {
    return this.axios.post('follow-profile', data)
  }

  unfollow(data) {
    return this.axios.post('unfollow-profile', data)
  }

  isFollowing(data) {
    return this.axios.get('is-following-profile', {
        params: {
            profile_id: data.profile_id,
            user_profile_id: data.user_profile_id
        }
    })
  }

  getPopularProfiles(searchTerm, profileId) {
    return this.axios.get('popular-profiles', {
      params: {
          search_term: searchTerm,
          profile_id: profileId
      }
    })
  }
  
  updateProfilePicture(data) {
    return this.axios.post('profile-picture', data)
  }
  
  updateProfileDescription(data) {
    return this.axios.post('profile-description', data)
  }

  addImage(data) {
    return this.axios.post('add-image', data)
  }

  getImages(userId) {
    return this.axios.get('images', {
        params: {
            user_id: userId
        }
    })
  }
}

export const profileService = new ProfileService()