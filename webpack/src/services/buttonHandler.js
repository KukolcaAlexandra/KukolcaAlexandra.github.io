const addButtonHandler = async (button, data, input) => {
  
  button.addEventListener('click', async () => {
    import('./newsLoader' /* webpackChunkName: 'newsLoader' */ )
      .then(async (module) => {
        const news = await module.getNews(data.get(input.value));
        import('../newsBlock/renderNewsBlock' /* webpackChunkName: 'renderNewsBlock' */)
          .then(async (render) => {
            import('../newsBlock/css/style.less' /* webpackChunkName: 'newsBlockStyle' */);
            return render.renderNewsBlock(news);
          })
      });
  });
};

export default addButtonHandler;
