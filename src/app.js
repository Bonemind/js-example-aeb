import {inject} from 'aurelia-framework';
import {FlashMessages} from './flash_messages'
import {ApplicationState} from './application_state'

//Index.html defines aurelia-app='main', which tells aurelia to run main.js after bootstrapping
//main.js configures aurelia to use the standard config and enable default config
//The default config assumes the main entrypoint of the application is app.js, and so, we end up here
// Inject the flashmessages and applicationstate classes
@inject(FlashMessages, ApplicationState)
export class App {
  //Since we inject the classes they get passed to the constructor, in the order defined above
  //The things passed here are actually instances of Flashmessages and Applicationstate treated as singletons
  //If you need for example the class FlashMessages itself, you can instantiate it with new FlashMessages as normal.
  //In that case there is no need to inject
  constructor(flashMessages, appState) {
    this.messages = flashMessages;
    this.appstate = appState;
  }


  //This method configures the router
  configureRouter(config, router) {
    config.title = 'Aurelia';

    //Adds routes to the router config
    config.map([
      //Adds a router that either matches #/  #/welcome
      //Name is a name that can be used to generate urls later using router.generate('welcome', [params])
      //ModuleId is the module to load, in this case welcome.js
      //Nav tells us whether this route should show up in nav menus
      //Title is the title in the nav menu, and the title of the page
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      //This route maps any #/cities routes to the cities router, see cities_router.js for more information
      //Any routes defined in cities_router will be relative to #/cities
      { route: 'cities',  name: 'cities_router', moduleId: 'cities_router', nav: true, title: 'Cities' },
      { route: 'login',  name: 'login', moduleId: 'login', nav: false, title: 'Login' }
    ]);

    //It looks like this router appears magically
    //Every viewmodel can implement a router, that's where this one comes from
    this.router = router;
  }
}
