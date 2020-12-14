docker start 2ab &&
cd /home/blog/app/nextjs-blog &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build -t fang/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d fang/node-web-app &&
echo 'OK!'