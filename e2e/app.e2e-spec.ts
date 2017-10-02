import { FruitPage } from './app.po';

describe('fruit App', () => {
  let page: FruitPage;

  beforeEach(() => {
    page = new FruitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
