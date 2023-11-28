#!/bin/bash
set -e
BUCKET=popify-react
DIST_ID=E2YBHX8H5MU75L
PROFILE=popify

echo ">>>>>>>>>>>>>> Building  <<<<<<<<<<<<<<<<<<<"

npm run build

echo ">>>>>>>>>>>>>> Deploying  <<<<<<<<<<<<<<<<<<<"

aws s3 sync ./build/ s3://$BUCKET --delete --profile $PROFILE

echo ">>>>>>>>>>>>>> Invalidating CloudFront  <<<<<<<<<<<<<<<<<<<"
aws cloudfront create-invalidation --profile $PROFILE --distribution-id $DIST_ID --paths "/*"