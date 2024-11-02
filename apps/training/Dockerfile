FROM node:20.18.0-slim
RUN apt-get update && apt-get install -y openssl libssl-dev
WORKDIR /opt/fit-friends-training
COPY ./dist/apps/training/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/training/assets/prisma/schema.prisma ./schema.prisma

RUN npx prisma@5.5.0 generate --schema schema.prisma
RUN cp -R ../../node_modules/.prisma ./node_modules && rm -rf ../../node_modules

COPY ./dist/apps/training .
CMD ["node", "./main.js"]

COPY ./dist/apps/training/assets/prisma/docker-entrypoint.sh ./docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]
