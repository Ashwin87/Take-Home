
# Instructions to TEST

1. Download this project.

2. Run npm install to download the required modules.

3. Install Serverless.

4. Install AWS CLI and configure it with your account.

5. Change the name of the bucket in custom -> bucket.

6. Run sls deploy.

URL to get List of all Songs:
https://3zbhx480k2.execute-api.us-west-2.amazonaws.com/dev/spotify

URL to Search for a particular song:
https://3zbhx480k2.execute-api.us-west-2.amazonaws.com/dev/spotify/{songname}

Method to add song in the playlist:
curl -X POST https://3zbhx480k2.execute-api.us-west-2.amazonaws.com/dev/spotify --data '{ "songname": "file.txt","playlist": "myfirst" }'


