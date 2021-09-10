# Сайт сообщества «Krasnodar Dev Days»

## Помощь с разработкой

В разделе «Issues» можно найти задачи с лейблом «требуется помощь».
Выберите интересную вам задачу, проверьте в комментариях,
что её еще не начали делать и отпишитесь, что вы возьмете её в работу.
Если у вас возникли трудности, пришлите «Draft Pull Request» и опишите проблему
или отпишитесь в задаче.

## Разработка

### Необходимые инструменты

1. Node.js v14.17;

### Запуск для разработки

1. `npm run dev`
1. `open http://localhost:3000`

Чтобы подменить бекенд сервер:

1. `BACKEND_DOMAIN=localhost:8000 BACKEND_PROTOCOL=http: npm run dev`

### Производственная сборка и запуск

1. `npm run build`
1. `BACKEND_DOMAIN=krd.dev/backend BACKEND_PROTOCOL=https: npm run start`
