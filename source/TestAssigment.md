#### Цель задания 
Требуется написать табличный компонент для приложения с помощью которого пользователь сможет подобрать продукты по диетическим показателям.
Задание разбито на три составляющих: 1. Функционал компонента. 2. Работа с промисами 3. Работа со стилями
Компонент должен работать как показано в примере.

#### Функционал компонента:
- У таблицы будут следующие колонки: Product, Calories, Fat, Carbs, Protein, Iron 
- Пользователь может выбирать колонки которые он хочет видеть. По умолчанию все колонки видимы.
- Пользователь может выбирать колонку которую хочет видеть первой в таблице.
- Пользователь может удалить продукт который ему не нравится из таблицы. Перед удалением нужно попросить пользователя подвердить действие.

#### Работа с промисами
В приложении к тестовому заданию есть два файла: `products.json` и `request.js`. 
Компонент таблицы должен получить входные данные через метод `emulateGetRequest()` который возвращает данные через промис.
Будьте бдительны, этот промис может вернуть ошибку с вероятностью 1/3. Как обработать эту ошибку решать вам, но обработать её обязательно.

#### Работа со стилями
- МОЖНО использовать любую библиотеку UI компонентoв для VueJS
- ЖЕЛАТЕЛЬНО следовать стилям в директории `design`


#### Дополнительная информация
- Требуется использовать VueJS и любые UI компоненты.
- Нельзя использовать JQuery
- Если у вас не остается времени на работу со стилями - достаточно сделать только чекбокс. Однако, желательно следовать спецификации дизайнера.
- Задание расчитано на 4 дня максимум. Не отчаивайтесь если вы не успели! Обязательно отправьте то, что успели сделать. 
