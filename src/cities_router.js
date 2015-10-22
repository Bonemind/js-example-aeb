export class CitiesRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], name: 'cities',       moduleId: 'cities/cities',       nav: true, title: 'List' },
      { route: 'new',         name: 'cities_create',         moduleId: 'cities/cities_create',         nav: true, title: 'Add a city' },
      { route: ['edit/:cityid'],         name: 'cities_edit',         moduleId: 'cities/cities_edit',         nav: false, title: 'Edit a city' },
    ]);

    this.router = router;
  }
}
