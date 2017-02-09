FROM python:2.7.13

RUN mkdir -p /usr/src/app /var/log/supervisor

WORKDIR /usr/src/app

COPY ./app /usr/src/app

RUN pip install supervisor

RUN pip install numpy

RUN pip install -r requirements.txt

EXPOSE 5000