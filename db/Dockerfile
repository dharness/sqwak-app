FROM mongo:3

COPY ./classes.bson /data/db/dump/classes.bson
RUN mongorestore --db sqwak --collection classes /data/db/dump/urban_sound/classes.bson

EXPOSE 27017