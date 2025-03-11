   # Инструкции по настройке Strapi для сайта Plakor Divisiones

## 1. Настройка типа контента "Projects" (Проекты)

### Шаги создания:

1. Войдите в админ-панель Strapi (http://localhost:1337/admin)
2. Перейдите в раздел "Content-Type Builder" в левом меню
3. Нажмите кнопку "Create new collection type"
4. Введите следующую информацию:
   - Display name: `Project`
   - API ID: `project` (должно заполниться автоматически)
5. Нажмите "Continue"
6. Добавьте следующие поля:

   a. **Название проекта**
   - Нажмите на "Text"
   - Выберите "Short text"
   - Имя: `title`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   b. **Описание проекта**
   - Выберите "Text" -> "Long text"
   - Имя: `description`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   c. **SEO-описание**
   - Выберите "Text" -> "Long text"
   - Имя: `seoDescription`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   d. **Местоположение**
   - Выберите "Text" -> "Short text"
   - Имя: `location`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   e. **Теги**
   - Выберите "JSON"
   - Имя: `tags`
   - Нажмите "Add another field"

   f. **Площадь**
   - Выберите "Text" -> "Short text"
   - Имя: `area`
   - Нажмите "Add another field"

   g. **Услуги**
   - Выберите "JSON"
   - Имя: `services`
   - Нажмите "Add another field"

   h. **Изображения**
   - Выберите "Media" -> "Multiple media"
   - Имя: `images`
   - Отметьте "Required field"

7. Нажмите "Save" для сохранения типа контента
8. Дождитесь перезапуска сервера Strapi

### Настройка разрешений:

1. Перейдите в "Settings" -> "Roles" в левом меню
2. Выберите роль "Public"
3. В разделе "Permissions" найдите "Project"
4. Отметьте разрешения "find" и "findOne"
5. Нажмите "Save"

## 2. Настройка типа контента "Reviews" (Отзывы)

### Шаги создания:

1. Перейдите в раздел "Content-Type Builder"
2. Нажмите "Create new collection type"
3. Введите:
   - Display name: `Review`
   - API ID: `review` (должно заполниться автоматически)
4. Нажмите "Continue"
5. Добавьте следующие поля:

   a. **Имя клиента**
   - Выберите "Text" -> "Short text"
   - Имя: `name`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   b. **Email**
   - Выберите "Email"
   - Имя: `email`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   c. **Оценка**
   - Выберите "Number" -> "Integer"
   - Имя: `rating`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   d. **Текст отзыва**
   - Выберите "Text" -> "Long text"
   - Имя: `text`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   e. **Услуга**
   - Выберите "Text" -> "Short text"
   - Имя: `service`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   f. **Статус**
   - Выберите "Enumeration"
   - Имя: `status`
   - Значения: `pending,approved,rejected` (введите через запятую без пробелов)
   - Отметьте "Required field"
   - Нажмите "Add another field"

   g. **Источник**
   - Выберите "Text" -> "Short text"
   - Имя: `source`
   - Значение по умолчанию: `Web`

6. Нажмите "Save" для сохранения типа контента
7. Дождитесь перезапуска сервера Strapi

### Настройка разрешений:

1. Перейдите в "Settings" -> "Roles"
2. Выберите роль "Public"
3. В разделе "Permissions" найдите "Review"
4. Отметьте разрешения "find", "findOne" и "create"
5. Нажмите "Save"

## 3. Настройка типа контента "Contact Forms" (Контактные формы)

### Шаги создания:

1. Перейдите в раздел "Content-Type Builder"
2. Нажмите "Create new collection type"
3. Введите:
   - Display name: `Contact Form`
   - API ID: `contact-form` (должно заполниться автоматически)
4. Нажмите "Continue"
5. Добавьте следующие поля:

   a. **Имя клиента**
   - Выберите "Text" -> "Short text"
   - Имя: `name`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   b. **Email**
   - Выберите "Email"
   - Имя: `email`
   - Нажмите "Add another field"

   c. **Телефон**
   - Выберите "Text" -> "Short text"
   - Имя: `phone`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   d. **Услуга**
   - Выберите "Text" -> "Short text"
   - Имя: `service`
   - Нажмите "Add another field"

   e. **Сообщение**
   - Выберите "Text" -> "Long text"
   - Имя: `message`
   - Отметьте "Required field"
   - Нажмите "Add another field"

   f. **Статус заявки**
   - Выберите "Enumeration"
   - Имя: `requestStatus`
   - Значения: `new,in-progress,completed,cancelled` (введите через запятую без пробелов)
   - Отметьте "Required field"
   - Значение по умолчанию: `new`

6. Нажмите "Save" для сохранения типа контента
7. Дождитесь перезапуска сервера Strapi

### Настройка разрешений:

1. Перейдите в "Settings" -> "Roles"
2. Выберите роль "Public"
3. В разделе "Permissions" найдите "Contact Form"
4. Отметьте разрешение "create"
5. Нажмите "Save"

## 4. Создание API-токена

1. Перейдите в "Settings" -> "API Tokens" в левом меню
2. Нажмите "Create new API Token"
3. Заполните форму:
   - Name: `Website Integration`
   - Description: `Token for website integration with Strapi`
   - Token duration: `Unlimited` (или выберите срок действия)
   - Token type: `Full access` (или настройте разрешения вручную)
4. Нажмите "Save"
5. **ВАЖНО**: Скопируйте сгенерированный токен, так как он будет показан только один раз
6. Добавьте токен в файл `.env.local` в корне вашего проекта:
   ```
   STRAPI_API_TOKEN=ваш_скопированный_токен
   ```

## 5. Добавление тестовых данных

### Добавление проекта:

1. Перейдите в "Content Manager" -> "Project" в левом меню
2. Нажмите "Create new entry"
3. Заполните поля:
   - Title: `Reforma integral Casino de Reus`
   - Description: `Reforma integral del casino de Reus, combinando historia y modernidad en un espacio exclusivo`
   - SEO Description: `Proyecto emblemático de reforma integral del Casino de Reus: restauración histórica y modernización de espacios interiores, preservando el patrimonio arquitectónico mientras se incorporan elementos contemporáneos.`
   - Location: `Reus`
   - Tags: `["comercial", "reforma integral", "diseño interior"]` (введите в формате JSON)
   - Area: `450m²`
   - Services: `["Restauración histórica", "Modernización", "Acabados exclusivos"]` (введите в формате JSON)
   - Images: загрузите несколько изображений проекта
4. Нажмите "Save"
5. Нажмите "Publish" для публикации проекта

### Добавление отзыва:

1. Перейдите в "Content Manager" -> "Review" в левом меню
2. Нажмите "Create new entry"
3. Заполните поля:
   - Name: `María García`
   - Email: `maria@example.com`
   - Rating: `5`
   - Text: `Excelente trabajo en la reforma de mi cocina. El equipo fue muy profesional y cumplieron con los plazos establecidos.`
   - Service: `reforma`
   - Status: `approved`
   - Source: `Web`
4. Нажмите "Save"
5. Нажмите "Publish" для публикации отзыва

## 6. Проверка интеграции

После настройки всех типов контента, создания API-токена и добавления тестовых данных:

1. Убедитесь, что в файле `.env.local` указан правильный токен API и URL Strapi:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=ваш_токен
   ```

2. Запустите сайт:
   ```
   npm run dev
   ```

3. Проверьте, что данные загружаются и отображаются на соответствующих страницах:
   - Проекты: http://localhost:3000/proyectos
   - Отзывы: http://localhost:3000/resenas
   - Контактная форма: http://localhost:3000/contacto

4. Проверьте отправку форм:
   - Отправьте контактную форму на странице /contacto
   - Отправьте отзыв на странице /resenas (кнопка "Dejar una reseña")

5. Проверьте, что данные появляются в админ-панели Strapi 