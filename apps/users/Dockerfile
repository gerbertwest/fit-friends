FROM node:20.18-alpine
WORKDIR /opt/fit-friends-users
COPY ./dist/apps/users/package.json .
RUN npm install --omit=dev
RUN npm install nestjs-seeder@0.3.2
COPY ./dist/apps/users .
CMD ["node", "./main.js"]
