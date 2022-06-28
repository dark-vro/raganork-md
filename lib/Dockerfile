FROM fusuf/whatsasena:latest

RUN git clone https://github.com/dark-vro/raganork-md /5hefin/Raganork
WORKDIR /5hefin/Raganork
ENV TZ=Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --ignore-engines

CMD ["node", "index.js"]
