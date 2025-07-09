FROM node:17-buster-slim
RUN useradd -ms /bin/bash volgactf
WORKDIR /home/volgactf/dist
COPY dist .
RUN npx browserslist@latest --update-db && npm install && npm install --save-dev @types/react@18.0.1 &&  chown -R volgactf:volgactf /home/volgactf/dist && npm run build
USER volgactf
EXPOSE 3000
CMD npm start
