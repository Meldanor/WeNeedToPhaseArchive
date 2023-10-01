##################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine as build

WORKDIR /app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV production

USER node

###################
# PRODUCTION
###################

FROM node:20-alpine As production

WORKDIR /app

COPY --chown=node:node --from=build /app/build /app/node_modules ./
COPY --chown=node:node --from=build /app/package.json /app/yarn.lock ./

CMD [ "node", "index.js" ]
