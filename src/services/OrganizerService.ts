import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // must be http://localhost:8080
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getOrganizers(perPage: number, page: number) {
    return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
  },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },
  createOrganizer(organizer: any) {
    return apiClient.post('/organizers', organizer)
  }
}
