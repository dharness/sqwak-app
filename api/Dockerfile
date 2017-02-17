FROM python:2.7.13

RUN echo "deb http://ftp.uk.debian.org/debian jessie-backports main" >> /etc/apt/sources.list
RUN apt-get update

RUN apt-get install ffmpeg -y

RUN mkdir -p /usr/src/app /var/log/supervisor

WORKDIR /usr/src/app

COPY ./app /usr/src/app

RUN pip install supervisor

# This is due to a bug with resampy, it should be removed
# if the bug is fixed.
# https://github.com/bmcfee/resampy/issues/34
RUN pip install numpy

RUN pip install -r requirements.txt

EXPOSE 8080