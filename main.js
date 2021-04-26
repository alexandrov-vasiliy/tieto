// Эта функция по идее должна быть импортирована,

// но упрощено и нужно её простейшим образом реализовать

const serverApiRequest = async a => {
  /*simulate request*/
  try {
    let response = await fetch("http://127.0.0.1:3000" + a);//дольше всего делал сервер
    return response.json();
  } catch (e) {
    throw Error(e)
  }

};

// Можно выполнить по аналогии с serverApiRequest(), а можно лучше, см. подсказку ниже
const sendAnalytics = (apiRoute, data) => {
  /*sendBeacon maybe*/
  navigator.sendBeacon("http://127.0.0.1:3000" + apiRoute, data)

};

/* Нужно:
    1 Сделать функцию рабочей в принципе не меняя логики но доступно ES8+
    2 Общая логика: запрос, если успех, то отправка данных в аналитику, обработка данных и их возврат
    3 Подсветить места, где ТЗ недостаточно
    4 Подсветить места, вероятно проблемные
*/
const requestData = async ({ id, param }) => {
  // should return [null, {v: 1}, {v: 4}, null] or Error (may return array (null | {v: number}) []) 
  //!!! при каком условии должна быть ошибка? и как происхожит return [null, {v: 1}, {v: 4}, null]

  var array = await serverApiRequest(`/query/data/${id}/param/${param}`)
    .then(
      sendAnalytics("/requestDone", {
        type: "data",
        id: id,
        param: param
      })).catch((e) => { throw Error(e) })


  let array2 = [];

  for (el of array) {
    console.log(el)
    if (el && el.hasOwnProperty('v')) {
      array2.push(el.v)
    }
  }

  // магия, описать
  return array2; // return [1, 4]
};

// app proto
// START DO NOT EDIT app
(async () => {
  const log = text => {
    const app = document.querySelector("#app");
    app.appendChild(document.createTextNode(JSON.stringify(text, null, 2)));
    app.appendChild(document.createElement("br"));
  };

  log(await requestData({ id: 1, param: "any" }));
  log(await requestData({ id: 4, param: "string" }));
  log(await requestData({ id: 4, param: 404 }));
})();
// END DO NOT EDIT app