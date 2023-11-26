FROM node:18.18.2-alpine3.18 AS front-inventory

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY ngnix.conf /etc/nginx/conf.d/default.conf
# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 3100

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]


# COPY docker/next/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
# RUN chmod +x /usr/local/bin/docker-entrypoint

# ENTRYPOINT ["docker-entrypoint.sh"]

# CMD ["npm", "run", "start"]