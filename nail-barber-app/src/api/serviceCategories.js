import axios from '../utils/api';

/** Lấy tất cả service categories (admin/public) */
export async function listServiceCategories() {
  // adjust the URL if your FastAPI is mounted under /api
  const res = await axios.get('/services/categories');
  return res.data; // e.g. ["hair","nails","color","beard"]
}