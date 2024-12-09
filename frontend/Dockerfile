FROM node:20.17.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 4200

RUN npm install -g @angular/cli

COPY . .

CMD [ "ng", "serve","--host","0.0.0.0" ]