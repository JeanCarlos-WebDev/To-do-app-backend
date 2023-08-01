# FROM node:latest as backend

# RUN mkdir ./app

# COPY  package.json .

# RUN npm install --production  --legacy-peer-deps

# COPY dist .

# COPY prisma .



# CMD ["npm", "run", "production"]


# EXPOSE 3000

FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . . 

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod --legacy-peer-deps

COPY . .

COPY --from=development /usr/src/app/dist ./dist
CMD ["npm", "run", "prod"]