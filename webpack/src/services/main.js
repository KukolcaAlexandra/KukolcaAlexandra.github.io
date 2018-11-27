import { getNewsSources } from './newsLoader';
import Autocomplete from './autocomplete';
import addButtonHandler from '../services/buttonHandler';
import { getSourceNames, getSourceNamesWithId } from './getSourceNames';

const main = async (input, button) => {
  const sourceData = await getNewsSources();
  const autocomplete = new Autocomplete(input, getSourceNames(sourceData));
  autocomplete.addHandlers();
  addButtonHandler(button, getSourceNamesWithId(sourceData), input);
};

export default main;
