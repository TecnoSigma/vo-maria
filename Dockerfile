FROM ruby:3.1

# Install Debian
#RUN apt install curl
#RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
#RUN apt-get update -qq && apt-get install -y nodejs && apt-get install -y build-essential && apt-get install -y libpq-dev
#RUN apt-get update && apt-get install -y --no-install-recommends apt-utils

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    yarn

RUN apt-get install graphviz -y
RUN mkdir /necklace-generator
WORKDIR /necklace-generator
COPY Gemfile /necklace-generator/Gemfile
COPY Gemfile.lock /necklace-generator/Gemfile.lock
RUN bundle install
COPY . /necklace-generator

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["bundle", "exec",  "rails",  "s",  "-b",  "0.0.0.0"]
