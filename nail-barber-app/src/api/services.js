// src/api/services.js
import api from '../utils/api';

/** 
 * Public: lấy danh sách service với pagination, filter, search 
 * Backend trả về { total: number, items: ServiceResponse[] }
 */
export async function listServices({
  search,
  category,
  provider_id,       // <-- thêm
  page = 1,
  size = 50,
}) {
  const params = { page, size };
  if (search)        params.search      = search;
  if (category && category!=='all') params.category    = category;
  if (provider_id)   params.provider_id = provider_id;  // <-- thêm

  const res = await api.get('/services/', { params });
  return res.data;  
}

/** 
 * Provider-only: lấy danh sách service của chính provider đang login 
 * Backend trả về ServiceResponse[]
 */
export async function listMyServices({
  page = 1,
  size = 50,
} = {}) {
  const params = { page, size };
  const res = await api.get('/services/me', { params });
  return res.data; // array of ServiceResponse
}

/** 
 * Provider-only: tạo mới service 
 * data = { name, category, price, duration, description?, image_url?, popular? }
 */
export async function createService(data) {
  const res = await api.post('/services/', data);
  return res.data; // ServiceResponse
}

/** 
 * Provider-only: cập nhật service 
 * id = service_id, data = partial ServiceUpdate
 */
export async function updateService(id, data) {
  const res = await api.patch(`/services/me/${id}`, data);
  return res.data; // ServiceResponse
}

/** 
 * Provider-only: xóa service 
 * id = service_id
 */
export async function deleteService(id) {
  const res = await api.delete(`/services/me/${id}`);
  // api.delete trả status 204, api mặc định resolve status < 300
  return res.status === 204;
}
export async function rateService(serviceId, score) {
  const res = await api.post(`/services/${serviceId}/rating`, { score });
  // { rating, reviews_count }
  return res.data;
}
export async function fetchService(id) {
  const res = await api.get(`/services/${id}`);
  return res.data;
}