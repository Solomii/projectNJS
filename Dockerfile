FROM node:14.3.0
ENV NODE_ENV = production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./" ]

RUN npm install --production

COPY . .

CMD ["npm run dev"]