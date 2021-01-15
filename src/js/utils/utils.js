import { newsApiConfig, } from "../constants/config";
import { baseTime, months } from "../constants/constants";

export function getDate() {
  const lengthPeriod = newsApiConfig.days * baseTime.min * baseTime.sec * baseTime.ms;
  const currentDate = new Date();
  const toDate = currentDate.toISOString();
  const fromDate = new Date(currentDate.getTime() - lengthPeriod).toISOString();
  return { fromDate, toDate }
}

//возвращает строку для запроса к newApi
export function getQuery(word) {
  const query = new URLSearchParams({
    q: word,
    from: getDate().fromDate,
    to: getDate().tromDate,
    language: newsApiConfig.language,
    pageSize: newsApiConfig.pageSize,
    apiKey: newsApiConfig.apiKey
  })
  return query.toString();
}

//преобразование даты для карточка
export function convertDateCard(data) {
  const dataCard = new Date(data);
  return `${dataCard.getDate()} ${months[dataCard.getMonth()]}, ${dataCard.getFullYear()}`;
}