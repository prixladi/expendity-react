#!/bin/sh

env
cp -v /configs/config.js /usr/share/nginx/html/config.js

sed -i "s~{{GRAPHQL_URL}}~$GRAPHQL_URL~" /usr/share/nginx/html/config.js
sed -i "s~{{AUTH_API_URL}}~$AUTH_API_URL~" /usr/share/nginx/html/config.js
sed -i "s~{{AUTH_API_CLIENT_ID}}~$AUTH_API_CLIENT_ID~" /usr/share/nginx/html/config.js
sed -i "s~{{GOOGLE_CLIENT_ID}}~$GOOGLE_CLIENT_ID~" /usr/share/nginx/html/config.js

cat /usr/share/nginx/html/config.js

echo "Starting nginx"
exec "$@"