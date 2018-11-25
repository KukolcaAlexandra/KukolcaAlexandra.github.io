//import { getNews } from './newsLoader';
// import renderNewsBlock from './renderNewsBlock';

const addButtonHandler = async (button, data, input) => {
  
  button.addEventListener('click', async () => {
    import("./newsLoader" /* webpackChunkName: "newsLoader" */ ).then(async function(foo) {
      console.log('foo:', foo);
      const news = await foo.getNews(data.get(input.value));
      alert(news);
      import("./renderNewsBlock").then(async function(render) {
        console.log('render', render);
        render.renderNewsBlock(news);
      });
    })
  });
  
  // async function handler() {
    // alert('hello');
    // const news = await getNews(data.get(input.value));
    // import(/* webpackChunkName: "renderNewsBlock" */ './renderNewsBlock')
    // .then((renderNewsBlock) => {
    //  renderNewsBlock(news);
    // }, (e) => alert(e));
  // }

  //button.addEventListener('click', handler);

  //button.addEventListener('click', async () => {
    //const news = await getNews(data.get(input.value));
    //const news = ['hello'];
    //import(/* webpackChunkName: "renderNewsBlock" */ './renderNewsBlock')
    //  .then(({default: renderNewsBlock}) => {
    //    return renderNewsBlock(news);
    //  });
    /*require.ensure([], function(require) {
      let module = require('./renderNewsBlock');
      module.renderNewsBlock(news);
    });*/
    //let module = await import('./renderNewsBlock');
    //renderNewsBlock(news);
  //});
};

export default addButtonHandler;
