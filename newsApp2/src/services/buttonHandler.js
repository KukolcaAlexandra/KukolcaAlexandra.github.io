import { getNews } from './newsLoader';
import renderNewsBlock from './renderNewsBlock';

const addButtonHandler = async (button, data, input) => {
  button.addEventListener('click', async () => {
    renderNewsBlock(await getNews(data.get(input.value)));
  });
};

export default addButtonHandler;
