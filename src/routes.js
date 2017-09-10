import App from './containers/App/App';
import Articles from './containers/Articles/Articles';
import About from './containers/About/About';

const routes = [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    component: Articles,
  }, {
    path: '/about',
    component: About,
  }],
}];

export default routes;
