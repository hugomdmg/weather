FROM node:20

RUN npm install -g @angular/cli

WORKDIR /APP

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve"]