import months from '../consts/months';

const removeNewsBlocks = () => {
  const newsContainer = document.querySelector('.news-container');
  const childs = [...newsContainer.children];
  childs.forEach((elem) => {
    newsContainer.removeChild(elem);
  });
};

const renderNewsBlock = (news) => {
  const newsContainer = document.querySelector('.news-container');
  const items = [];

  removeNewsBlocks();

  news.forEach((item) => {
    const newsBlock = document.createElement('div');
    const {
      title,
      urlToImage,
      description,
      url,
    } = item;
    const date = new Date(item.publishedAt);
    const displayDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    newsBlock.classList.add('news-block');
    newsBlock.innerHTML = `
        <div class="title-block">
          <img class="image" src="${urlToImage}">
          <div class="title-date">
            <h3 class="title">${title}</h3>
            <div class="date-block">${displayDate}</div>
          </div>
        </div>
        <div class="description-block">
          <p class="description">${description}</p>
        </div>
        <div class="link-block">
          <a href="${url}" target="_blank">read more</a>
        </div>`;
    items.push(newsBlock);
  });
  items.forEach((newsBlock) => {
    newsContainer.appendChild(newsBlock);
  });
};

export default renderNewsBlock;
