import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import ApiService from './servise/api';
import { printFilmography } from './gallery';

const paginationRef = document.querySelector(`[data-pagination-value="pag"]`);

const apiService = new ApiService();
const container = document.getElementById('pagination');
const pagination = new Pagination(container, {
  totalItems: 16000,
  //   totalPage: apiService.pageCount,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
});

pagination.on('beforeMove', async evt => {
  apiService.page = evt.page;
  const movies = await apiService.fetch();
  printFilmography(movies);
});
