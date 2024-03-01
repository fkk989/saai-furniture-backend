FROM node:18 as builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY tsconfig.json tsconfig.json
COPY src/ src/
COPY prisma/ prisma/

RUN npx prisma generate
RUN npm run build 

FROM node:18 as runner

WORKDIR /home/app


COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules
COPY --from=builder build/dist  dist/
COPY --from=builder build/prisma  prisma



ENTRYPOINT [ "npm" , "start"]