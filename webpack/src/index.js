import main from './services/main';
import config from './configs/config.json';
import './css/style.less';

console.log(config);

const input = document.getElementById('myInput');
const button = document.getElementById('button');

main(input, button);
