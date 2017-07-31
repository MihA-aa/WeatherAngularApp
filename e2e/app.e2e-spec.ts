import { DwNg2AppPage } from './app.po';

describe('dw-ng2-app App', () => {
  let page: DwNg2AppPage;

  beforeEach(() => {
    page = new DwNg2AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
