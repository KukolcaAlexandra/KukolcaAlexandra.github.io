import { getNews } from './newsLoader';
import renderNewsBlock from './renderNewsBlock';

const addButtonHandler = (button, data, input) => {
  button.addEventListener('click', () => {
    getNews(data.get(input.value))
      .then(res => res)
      .then((res) => {
        renderNewsBlock(res);
      });
  });
};

export default addButtonHandler;
