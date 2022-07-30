export class AboutUs {
  id: number;

  imagePath: string;

  name: string;

  surname: string;

  role: string;

  contribution: string;

  url: string;

  constructor(
    id: number,
    imagePath: string,
    name: string,
    surname: string,
    role: string,
    contribution: string,
    url: string,
  ) {
    this.id = id;
    this.imagePath = imagePath;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.contribution = contribution;
    this.url = url;
  }
}
