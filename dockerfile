FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install && npm install @rollup/rollup-linux-x64-gnu

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]