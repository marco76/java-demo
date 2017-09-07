import { MainPage } from './app.po';
import {browser} from "protractor";

describe('main App', () => {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    var some_name = 'Some Name';
    let title = browser.getTitle().then(title => title);
    expect<any>(title).toEqual('Java EE 8 Demo, powered by Angular');
  });


});
