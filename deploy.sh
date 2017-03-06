export REACT_APP_BASE_URL=https://sqwak.kingofthestack.com 
export REACT_APP_API_URL=https://sqwak.kingofthestack.com/api/v0

npm run build

# Generate critical path css
critical build/index.html --base build --inline > build/index.critical.html
mv build/index.html build/index.old.html
mv build/index.critical.html build/index.html

scp -r ./build/* root@sqwak.kingofthestack.com:/usr/share/nginx/html/www

ssh root@sqwak.kingofthestack.com "service nginx restart"