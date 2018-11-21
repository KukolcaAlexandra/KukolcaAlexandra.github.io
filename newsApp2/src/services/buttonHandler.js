import { getNews } from './newsLoader';
import renderNewsBlock from './renderNewsBlock';

const addButtonHandler = async (button, data, input) => {
  button.addEventListener('click', async () => {
    const news = await getNews(data.get(input.value));
    renderNewsBlock(news);
  });
};

export default addButtonHandler;
