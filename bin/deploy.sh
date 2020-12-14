docker start 2ab &&
cd /home/blog/app/nextjs-blog &&
git pull &&
yarn install --production=false &&
yarn typeorm:build &&
yarn m:run &&
yarn build &&
docker build -t lzb/node-web-app . &&
docker kill app;
docker rm app;
docker run --name app --network=host -p 3000:3000 -d lzb/node-web-app &&
echo 'OK!'