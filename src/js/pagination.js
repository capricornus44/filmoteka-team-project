import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import ApiService from './servise/api';
import { printFilmography } from './gallery';
import { backToTop } from './scrollUp';

// const paginationRef = document.querySelector(`[data-pagination-value="pag"]`);

const apiService = new ApiService();
const container = document.getElementById('pagination');
const pagination = new Pagination(container, {
  totalItems: 16000,
  //   totalPage: apiService.pageCount,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});

pagination.on('beforeMove', async evt => {
  backToTop();
  apiService.page = evt.page;
  const movies = await apiService.fetch();
  printFilmography(movies);
  backToTop();
});

// pagination.movePageTo(5);*
// pagination.getCurrentPage(5)
// pagination.setItemsPerPage(30)
// pagination.setTotalItems(200)
