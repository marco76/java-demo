import { browser, element, by } from 'protractor';

export  class MainPage {
  navigateTo() {
    return browser.get('http://localhost:4200');
  }

  navigateToURL(url : string) {
    return browser.get(url);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
