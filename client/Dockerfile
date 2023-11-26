FROM node:18.18.2-alpine3.18 AS front-inventory

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

RUN npm run build

COPY . .


# FROM nginx:stable-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
# RUN chmod +x /usr/local/bin/docker-entrypoint

# ENTRYPOINT ["docker-entrypoint.sh"]

# CMD ["npm", "run", "start"]

CMD ["pm2", "start", "app.config.json"]