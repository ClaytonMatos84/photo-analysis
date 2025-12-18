import axios from 'axios'

const PHOTO_ANALYSIS_URL = import.meta.env.VITE_BASE_SERVER_URL + '/photo-analysis/analyze'

export default class PhotoAnalysisService {
    static async sendPhotoBinary(photo: Blob | File): Promise<object> {
        const formData = new FormData()
        formData.append('imagem', photo)
        const response = await axios.post(PHOTO_ANALYSIS_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data
    }
}
