import {inject} from 'aurelia-framework';
import {FlashMessages} from './flash_messages'
import {ApplicationState} from './application_state'

@inject(FlashMessages, ApplicationState)
export class App {
  constructor(flashMessages, appState) {
    this.messages = flashMessages;
    this.appstate = appState;
  }
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      { route: 'cities',  name: 'cities_router', moduleId: 'cities_router', nav: true, title: 'Cities' },
      { route: 'login',  name: 'login', moduleId: 'login', nav: false, title: 'Login' }
    ]);

    this.router = router;
  }
}
