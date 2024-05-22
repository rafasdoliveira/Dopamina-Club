// import axios from './baseService'
import axios from 'axios';

const API_URL = 'http://localhost:8081/';

export async function cadastroEmpresa(formData) {
  try {
    const response = await axios.post(`${API_URL}/empresas`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
