# React + Vite

## Додаток для викладачів мов

**Огляд проекту**

Додаток створений для онлайн-платформи навчання мов. Він включає 3 сторінки:
"Головна", "Викладачі" та "Обрані". Додаток надає функції перегляду, фільтрації
викладачів, управління обраними та бронювання пробних занять. Реалізовано
авторизацію користувачів через Firebase.

## Основний функціонал

Сторінки

**Головна**:

Інформація про переваги компанії.

Кнопка для переходу до списку викладачів.

**Викладачі**:

Фільтри: мова, рівень учнів, ціна.

Картки викладачів з деталями та опціями: "Обрати", "Докладніше", "Бронювання".

Завантаження додаткових карток через "Load More".

**Обрані**:

Доступна тільки для авторизованих користувачів.

Відображає викладачів, доданих до обраного.

**Авторизація**

Реєстрація, вхід та вихід через Firebase Authentication.

Валідація форм за допомогою react-hook-form і yup.

**Додаткові функції**

Стан обраного: Зберігається між сесіями (Firebase/LocalStorage).

Бронювання уроку: Модальна форма з валідацією.

Детальна інформація: Відображення відгуків та деталей викладача через "Read
more".

## Технічні деталі

**Frontend**: React, React Router, Context API/Redux. **Firebase**: Realtime
Database для викладачів, Authentication для користувачів. **Форми**:
react-hook-form, yup. **Хостинг**: Vercel.

## Інформація про автора

- **Ім'я**: Olena Piatkivska
- **Email**: olena.piatkivska@gmail.com
- **GitHub**: olenapiatkivska
- **LinkedIn**: https://www.linkedin.com/in/olena-piatkivska/
