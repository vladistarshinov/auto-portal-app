# Интернет-магазин гаджетов

Разработать интернет-магазин гаджетов с возможностью авторизации пользователя и работой с товарами и заказами со стороны администратора. Каждому товару можно оставить комментарий и оценку от авторизованного пользователя.

## Требования к системе
    •	Система должна содержать 3 роли: незарегистрированный пользователь, зарегистрированный пользователь, администратор.
    •	Система должна позволять просматривать незарегистрированному пользователю страницу аутентификации, список товаров, детальное описание товара, корзину.
    •	Система должна позволять просматривать зарегистрированному пользователю страницу аутентификации, список товаров, детальное описание товара с комментариями, корзину, страницу со всеми этапами формирования итогового заказа и итоговой суммы, страницы профиля и заказов.
    •	Система должна позволять просматривать администратору страницу аутентификации, список товаров, детальное описание товара с комментариями, корзину, административную страницу с пользователями (возможность редактирования и удаления), административную страницу с товарами (возможность создания, редактирования и удаления), административную страницу с заказами (детальный просмотр и установка флага о доставке).
    •	Данные о пользователе, списке выбранных пользователем товаров в корзине и данных о заказе должны храниться в localStorage браузера в формате JSON.
    •	На главной странице системы должен быть расположены карточки всех товаров с возможностью фильтрации по категориям и значению.
    •	Карточка товара должна содержать фотографию, заголовок, рейтинг товара, количество комментариев и цену.
    •	Детальная страница товара должна содержать фотографию товара, заголовок, рейтинг, цену, описание, статус, 
    •	При клике на запись должны показываться полные данные о посте: название поста, полное описание, дата создания, комментарии (если они имеются).
    •	Система позволяет пользователю поставить оценку товару и/или комментарий.
    •	Комментарий должен содержать имя пользователя и текст комментария.
    •	Система позволяет пользователю увидеть в корзине информацию о выбранных товарах (количество, цена, сумма заказа).
    •	Для формирования заказа пользователь должен быть авторизирован в системе.
    •	Для формирования заказа система позволяет пользователю ввести данные для доставки товара, выбрать способ оплаты, а также просмотреть итоговую страницу со всеми данными о заказе.
    •	Страница доставки должна содержать следующую информацию: адрес доставки, город, почтовый индекс и страну.
    •	Страница выбора способов оплаты должна содержать чекпоинты разных способов оплаты с возможностью выбора одного из них.
    •	Страница итогового заказа должна содержать информацию о доставке, оплате, выбранных товарах (количество, цена) и информацию об итоговой оплате, включая налог и стоимость доставки.
    •	Страница просмотра заказа должна содержать полную информацию о заказе, аналогично странице итогового заказа, включая статус оплаты и статус доставки, если товар оплачен.
    •	Страница просмотра заказа должна позволять пользователю совершить оплату пользователю и возможность сгенерировать чек-накладную с полной информацией о заказе.
    •	Администратор может управлять пользователями, товарами и заказами.
    •	Административная страница с пользователями должна предоставлять следующую информацию о пользователе: id, имя, почту и статус администратора.
    •	Администратор может изменять имя, почту и статус администратора (сделать администратором либо лишить статуса), либо удалять пользователя из системы.
    •	Административная страница с товарами должна предоставлять следующую информацию о товарами: id, название, цену, бренд, категорию.
    •	Администратор может создавать новый товар, изменять данные о товаре, либо удалять товар.
    •	Система предоставляет возможность администратору загрузить фотографию товара, либо ввести ссылку на открытый источник размещения фотографии.
    • Административная страница с заказами должна предоставлять следующую информацию о заказах: id, имя клиента, дату создания, общую стоимость, статус оплаты и статус отправки. 
    • Страница просмотра заказа должна позволять администратору изменить статус доставки, если заказ был оплачен.

# Ветка main
    
## Стек технологий/библиотек (Front-end)
    * React
    * Next
    * Typescript
    * MUI (v5)
    * Tanstack Query
    * Redux Toolkit
    * Redux Persist
    * Axios
    * Yookassa
    * React-hook-form
    * Draft.js

## Стек технологий/библиотек (Dashboard)
    * Angular
    * Typescript
    * SCSS
    * Tailwind
    * Rx.js
    * Axios
    * Chart.js
    * Ngx-toastr
    * Draft.js

  ## Стек технологий/библиотек (Back-end)
    * Nest.js
    * TypeScript
    * Jwt
    * Argon2
    * MongoDB
    * Mongoose
    * Multer
    * Sharp
    * Passport
    * Swagger
    * Telegraf
    * Yookassa


# Ветка version/node

## Стек технологий/библиотек (Front-end)
    * React.js
    * MUI (v5)
    * Redux
    * Redux-thunk
    * Styled-components
    * Axios
    * React-router
    * React-paypal
    * Jspdf
    * Html2canvas
    * Mdbreact
    * Moment

## Стек технологий/библиотек (Back-end)
    * Node.js
    * Express
    * JsonWebToken
    * Bcryptjs
    * MongoDB
    * Mongoose
    * Multer
    * Colors
    * Express-async-handler
    * Morgan


  ## Основные команды
    ```
    npm run dev -- Запустить проект
    ```
    ```
    npm run server -- Запустить сервер 
    ```
    ```
    npm run client -- Запустить Клиент
    ```
```
