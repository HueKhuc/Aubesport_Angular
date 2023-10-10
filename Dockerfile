#stage 1
FROM node:20.8.0

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @angular/cli@16

# RUN npm run build --prod
#stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/Aubesport_Angular /usr/share/nginx/html
