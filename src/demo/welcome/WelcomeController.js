export default class WelcomeController {
  constructor() {
    this.items = [
      { title: 'Webpack', image: require('./img/what-is-webpack.png') },
      { title: 'Babel', image: require('./img/babel-logo.png') },
      { title: 'Node Sass', image: require('./img/libsass-logo.png') },
    ];
  }
}
