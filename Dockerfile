# Image source
FROM node:16-alpine

# Docker working directory
WORKDIR /src/app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/main"]