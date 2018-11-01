export class Article {

  title : string;
  description : string;
  link: string;
  published: Date;
  icon?: string;


  constructor(title: string, description: string, link: string, published: Date,
              icon? : string) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.published = published;
    this.icon = icon;
  }
}
