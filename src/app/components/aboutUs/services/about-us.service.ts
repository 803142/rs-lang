import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AboutUs } from '../models/about-us.model';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private aboutUs: AboutUs[] = [
    new AboutUs(
      1,
      'https://w7.pngwing.com/pngs/146/888/png-transparent-laptop-hacker-computer-icons-user-laptop-white-electronics-computer.png',
      'Aleh',
      'Serhiyenia',
      'Mentor',
      'Консультации, координация и поддержка команды.',
      'https://github.com/Pulya10c',
    ),
    new AboutUs(
      2,
      'https://w7.pngwing.com/pngs/146/888/png-transparent-laptop-hacker-computer-icons-user-laptop-white-electronics-computer.png',
      'Andrey',
      'Amelchenia',
      'Team-lead',
      'Реализовал бэкенд проекта, электронный учебник.',
      'https://github.com/andreyamelchenia',
    ),
    new AboutUs(
      3,
      'https://w7.pngwing.com/pngs/146/888/png-transparent-laptop-hacker-computer-icons-user-laptop-white-electronics-computer.png',
      'Sergei',
      'Talai',
      'Software Engineer',
      'Создатель игры "Саваннна".',
      'https://github.com/tsaminsk',
    ),
    new AboutUs(
      4,
      'https://w7.pngwing.com/pngs/146/888/png-transparent-laptop-hacker-computer-icons-user-laptop-white-electronics-computer.png',
      'Evgeniy',
      'Vasilko',
      'Software Engineer',
      'Реализовал форму входа пользователей на сайт, словарь.',
      'https://github.com/shadezp',
    ),
    new AboutUs(
      5,
      'https://w7.pngwing.com/pngs/505/27/png-transparent-computer-icons-symbol-staff-miscellaneous-white-black.png',
      'Maria',
      'Riazanova',
      'Software Engineer',
      'Реализовала страницу с играми. Создатель игры "Спринт".',
      'https://github.com/mariariazanova',
    ),
    new AboutUs(
      6,
      'https://w7.pngwing.com/pngs/146/888/png-transparent-laptop-hacker-computer-icons-user-laptop-white-electronics-computer.png',
      'Maksim',
      'Stankevich',
      'Software Engineer',
      'Реализовал стартовую страницу. Создатель игры "Аудиовызов".',
      'https://github.com/803142',
    ),
    new AboutUs(
      7,
      'https://w7.pngwing.com/pngs/146/888/png-transparent-laptop-hacker-computer-icons-user-laptop-white-electronics-computer.png',
      'Nikolay',
      'Nikityuk',
      'Software Engineer',
      'Реализовал навигацию по сайту. Создатель системы подсчета статистики.',
      'https://github.com/micolka',
    ),
    new AboutUs(
      8,
      'https://w7.pngwing.com/pngs/505/27/png-transparent-computer-icons-symbol-staff-miscellaneous-white-black.png',
      'Elena',
      'Dobrovskaya',
      'Software Engineer',
      'Реализовала страницу "О команде". Создатель игры "Моя игра".',
      'https://github.com/dobrovskayaelena',
    ),
  ];

  getTeam(): Observable<AboutUs[]> {
    return of(this.aboutUs);
  }
}
