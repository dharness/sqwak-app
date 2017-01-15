FROM python:2.7.13

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./app /usr/src/app

RUN pip install -r requirements.txt

EXPOSE 50051