FROM node:18.10-alpine3.15

WORKDIR /app_f

COPY package.json package.json

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
