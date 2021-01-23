const NODE_ENV = process.env.NODE_ENV || 'development';
const MY_SERVER = NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://api.murnews.students.nomoreparties.xyz';
//const NEWS_SERVER = NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything?' : 'https://nomoreparties.co/news/v2/everything?';
const NEWS_SERVER = 'https://nomoreparties.co/news/v2/everything?';

export const myServerConfig = {
  baseUrl: `${MY_SERVER}`,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const newsApiConfig = {
  baseUrl: `${NEWS_SERVER}`,
  apiKey: 'e487423936f948508cbe9646373e3ac5', // 156f7904dc2d42ceb53313c90cd0f241
  pageSize: 100,
  language: 'ru',
  sortBy: 'popularity',
  days: 7
}