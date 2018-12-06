import Model from './model/model';
import View from './view/view';
import Controller from './controller/controller';

const app = () => {
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(model, controller);
  view.init();
}

export default app;
