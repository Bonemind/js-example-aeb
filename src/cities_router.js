export class CitiesRouter {
  heading = 'CitiesRouter';


  //Defines the routes for this child router, this router is defined as a child of /cities
  //so the first route would map to either #/cities/ or #/cities/list
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'cities',       moduleId: 'cities/cities',       nav: true, title: 'List' },
      { route: 'new',         name: 'cities_create',         moduleId: 'cities/cities_create',         nav: true, title: 'Add a city' },
      //Adds an edit route with :cityid as a variable param, as above, this route is relative to /cities
      //so this maps to #/cities/edit/5 or /cities/edit/IAmAParam
      //Moduleid maps to ./cities/cities_edit.js
      { route: ['edit/:cityid'],         name: 'cities_edit',         moduleId: 'cities/cities_edit',         nav: false, title: 'Edit a city' },
    ]);

    this.router = router;
  }
}
