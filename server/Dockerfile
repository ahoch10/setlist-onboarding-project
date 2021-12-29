FROM python:3.7.4-slim as base
ARG USERID=1000

RUN apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -yq \
      bash \
      curl \
      g++ \
      libpcre3 \
      libpcre3-dev \
      libpq-dev \
      python3-dev \
      && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install pip==20.1.1
RUN pip install poetry==1.0.5

RUN useradd -u $USERID -m anat
USER anat
RUN mkdir /home/anat/src
RUN chown anat:anat /home/anat/src
WORKDIR /home/anat/src

COPY --chown=anat:anat pyproject.toml .
COPY --chown=anat:anat poetry.lock .

RUN poetry config virtualenvs.in-project true
RUN poetry install

COPY --chown=anat:anat app ./app
COPY --chown=anat:anat migrations ./migrations
COPY --chown=anat:anat tests ./tests
COPY --chown=anat:anat run.py .
COPY --chown=anat:anat .env .

EXPOSE 5000
ENTRYPOINT ["poetry", "run"]
CMD flask run --host=0.0.0.0 --port=5000


