export enum AutoErrorConstants {
    IS_EXIST = 'Данный автомобиль уже существует',
    NOT_FOUND_BRAND = 'Нет такого бренда авто',
    NOT_FOUND = 'Автомобиль не обнаружен!'
}

export enum ProductErrorConstants {
    NOT_FOUND = 'Товар не найден'
}

export enum ReviewErrorConstants {
    MORE_ONE = 'Вы уже оставили свой отзыв о продукте!',
    IS_AUTH = 'Пожалуйста, авторизуйтесь',
    PRODUCT_ID = 'Не понимаю, у какого продукта удалять коммент',
    DONT_REMOVE = 'У вас нет возможности удалить комментарий'
}

export enum OrderErrorConstants {
    NOT_FOUND = 'Заказ с таким id не найден',
    ORDER_LENGTH_0 = 'Нет товаров для заказа',
    ORDER_LENGTH_1 = 'Количество товара',
    ORDER_LENGTH_MANY = 'Количество товаров',
    LESS_THAN = 'меньше запрашиваемого',
}

export enum CategoryErrorConstants {
    IS_EXIST = 'Такая категория уже существует',
    NOT_FOUND = 'Категория не найдена',
}

export enum AuthErrorConstants {
    MAIL_EXIST = 'Пользователь с такой эл. почтой уже существует',
    USER_NOT_FOUND = 'Пользователь с такой эл. почтой не найден',
    PASSWORD_INCORRECT =  'Неверный пароль',
    LOGIN = 'Войдите в систему',
    INVALID_TOKEN = 'Токен истек'
}

export enum UserErrorConstants {
    MAIL_EXIST = 'Пользователь с такой эл. почтой не найден',
    USER_NOT_FOUND = 'Пользователь с такой эл. почтой не найден',
    PASSWORD_INCORRECT =  'Неверный пароль',
    LOGIN = 'Войдите в систему',
    INVALID_TOKEN = 'Токен истек'
}