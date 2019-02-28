FROM node:8-alpine

EXPOSE 3000
WORKDIR /usr/src/krddevdays

COPY . .

RUN npm install \
	&& npm run build

CMD [ "npm", "start" ]
