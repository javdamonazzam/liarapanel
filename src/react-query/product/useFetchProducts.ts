
import { useQuery } from '@tanstack/react-query';
import { getToken } from '@utils/jwt.ts';
import ApiService from '@utils/axios.ts';
// export default function useFetchProducts() {
//   // const title = useFilterProduct((state) => state.title);
//   const { rowPerPage, page } = useProductPagination(
//     useShallow((state) => ({ page: state.activePage, rowPerPage: state.rowPerPage }))
//   );
//   async function fetchProducts() {
//     const res = await Axios.get<Product[]>('/product', { filter: { title }, take: rowPerPage, page });
//     return res.data;
//   }
//   return useQuery({ queryKey: ['products', { title, rowPerPage, page }], queryFn: fetchProducts });
// }
export function useFetchServer() {
  console.log("start find server")
  async function fetchServer() {
    const res = await ApiService.get('server/find', {}, { Authorization: `Bearer ${getToken()}` });
    return res.data;
  }
  return useQuery({ queryKey: ['factor'], queryFn: fetchServer });
}