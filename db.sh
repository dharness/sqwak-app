today=$(date +%Y_%m_%d__%H_%M_%S)
(cd db; mongodump -h sqwak.kingofthestack.com:27017 --archive=$today.gz --gzip --db sqwaks)
