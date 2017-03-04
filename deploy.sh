(cd ./app/ && export REACT_APP_BASE_URL=https://sqwak.kingofthestack.com && export REACT_APP_API_URL=https://sqwak.kingofthestack.com/api/v0 && npm run build)

scp -r ./app/build/* root@sqwak.kingofthestack.com:/usr/share/nginx/html/www

ssh root@sqwak.kingofthestack.com "service nginx restart"