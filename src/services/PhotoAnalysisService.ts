import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const PHOTO_ANALYSIS_URL = import.meta.env.VITE_BASE_SERVER_URL + '/photo-analysis/analyze'

export default class PhotoAnalysisService {
    static async sendPhotoBinary(photo: Blob | File): Promise<object> {
        const authStore = useAuthStore()
        const formData = new FormData()
        formData.append('imagem', photo)

        const headers: Record<string, string> = {
            'Content-Type': 'multipart/form-data',
        }

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await axios.post(PHOTO_ANALYSIS_URL, formData, {
            headers,
        })
        return response.data
    }
}
