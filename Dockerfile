# ---- Development ----
FROM node:16-alpine AS development

WORKDIR /@dev

CMD [ "npm", "run", "dev"]

# ---- Base Node ----
FROM node:16-alpine AS base

WORKDIR /app
COPY package*.json ./
 
#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
 
#
# ---- Build ----
FROM dependencies AS build
# copy project file
COPY . .
# install ALL node_modules, including 'devDependencies'
RUN npm install
RUN npm run build
 
#
# ---- Test ----
# run linters, setup and tests
# FROM dependencies AS test
# COPY . .
# RUN  npm run lint && npm run setup && npm run test
 
#
# ---- Production ----
FROM node:16-alpine AS production

WORKDIR /app
# copy production node_modules
COPY --from=build /app/dist .
COPY --from=build /app/prod_node_modules ./node_modules

CMD ["node", "."]
