FROM python:3.8.11-alpine

COPY . /back-end
WORKDIR /back-end

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD python3 manage.py migrate && \
    gunicorn recomendation.asgi:application -w 3 -k uvicorn.workers.UvicornWorker -t 1000 -b 0.0.0.0:8000 --access-logfile -