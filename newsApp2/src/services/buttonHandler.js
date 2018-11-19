import { getNews } from './newsLoader';
import renderNewsBlock from './renderNewsBlock';

const addButtonHandler = (button, data, input) => {
  button.addEventListener('click', () => {
    getNews(data.get(input.value))
      .then(renderNewsBlock);
  });
};

export default addButtonHandler;
