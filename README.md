## Prepare env
### update nodejs using Ubuntu
- `curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -`
- `sudo apt-get install -y nodejs`

### update nodejs Debian, as root
- `curl -sL https://deb.nodesource.com/setup_5.x | bash -`
- `apt-get install -y nodejs`

## Installation
- clone `git clone https://github.com/ekrotenko/booking.test.git`
- `cd booking.test`
- `npm install`

## Run tests

- `npm test`
- run specific suite on specific env: `protractor conf.js --suite suite_name`

## Enjoy testing :)