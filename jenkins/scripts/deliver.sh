#!/usr/bin/env sh

npm run ng build
npm run ng serve -- --host 0.0.0.0 --port 4200 --disable-host-check &
sleep 3
echo $! > .pidfile

echo 'Now...'
echo 'Visit http://kuroneko.ano.ninja:4200.'
