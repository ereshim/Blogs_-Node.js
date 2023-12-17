import {body} from 'express-validator'

export  const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password','Пароль должен быть как минимум 6 символов').isLength({min:6}),
];

export  const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password','Пароль должен быть как минимум 6 символов').isLength({min:6}),
    body('fullName', 'Укажите имя').isLength({min: 3}),
    body('avatrUrl','неверная ссылка на аватарку ').optional().isURL(),

];

export  const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min:3}).isString(),
    body('text','Введите текст статьи').isLength({min:10}).isString(),
    body('tags','Невереный формать тегов(укажите массив)').optional().isString (),
    body('imageUrl','Неверная ссылка на изоброжение').optional().isString ()

];