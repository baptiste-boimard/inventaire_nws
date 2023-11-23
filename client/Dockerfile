FROM node:18.18.2-alpine3.18 AS front-inventory

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

# RUN npm run build

# COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
# RUN chmod +x /usr/local/bin/docker-entrypoint

# ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "run", "start"]