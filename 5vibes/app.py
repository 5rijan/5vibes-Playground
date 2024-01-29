from flask import Flask, render_template, request
from dotenv import load_dotenv
import os
import base64
import requests


app = Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html', playlist_id = "1hj3VMm3gbcvf5jFXxtJyi")

@app.route('/playlist_name')
def playlist_name():
    playlist_name = request.args.get('name')
    playlist_name = playlist_name.replace('/', '-')
    playlist_name += '-24-01-2024'
    print(playlist_name)    
    playlist_ids = create_embed(playlist_name)
    print (playlist_ids)
    return render_template('index.html', playlist_id=playlist_ids)

load_dotenv()
Client_id= os.getenv("Client_id")
Client_secret = os.getenv("Client_secret")

def get_token():
    auth_string = Client_id + ":" + Client_secret   
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {"grant_type": "client_credentials"}

    try:
        result = requests.post(url, headers=headers, data=data)
        result.raise_for_status()  # Raise an HTTPError for bad responses
        json_result = result.json()
        token = json_result.get("access_token")
        if token:
            return token
        else:
            print("Token not found in response:", json_result)
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error during token request: {errh}")
    except requests.exceptions.RequestException as err:
        print(f"Request Exception during token request: {err}")

    return None

# Attempt to get a new token
new_token = get_token()

if new_token:
    # Update the global token variable
    token = new_token
    print("Successfully obtained a new token.")
else:
    print("Failed to obtain a new token.")

# Function to get user authorization and return access token
def get_user_token(client_id, client_secret, redirect_uri):
    authorization_base_url = "https://accounts.spotify.com/authorize"
    token_url = "https://accounts.spotify.com/api/token"
    scope = "playlist-modify-public playlist-modify-private"  
    state = "123" 

    # Redirect the user to the Spotify Accounts service for authorization
    auth_url = f"{authorization_base_url}?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&state={state}"

    print(f"Please go to this URL and authorize access: {auth_url}")
    authorization_code = input("Enter the authorization code from the redirect URI: ")

    # Use the authorization code to request an access token
    headers = {
        "Authorization": "Basic " + base64.b64encode(f"{client_id}:{client_secret}".encode("utf-8")).decode("utf-8"),
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {
        "grant_type": "authorization_code",
        "code": authorization_code,
        "redirect_uri": redirect_uri
    }

    try:
        result = requests.post(token_url, headers=headers, data=data)
        result.raise_for_status()
        json_result = result.json()
        user_token = json_result.get("access_token")
        if user_token:
            return user_token
        else:
            print("User Token not found in response:", json_result)
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error during user token request: {errh}")
    except requests.exceptions.RequestException as err:
        print(f"Request Exception during user token request: {err}")

    return None

# Update the global token variable with the user token
redirect_uri = "https://www.google.co.in/" 
user_token = get_user_token(Client_id, Client_secret, redirect_uri)

if user_token:
    token = user_token
    print("Successfully obtained user token.")
else:
    print("Failed to obtain user token.")

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}


def get_user_detials(token):
    url = "https://api.spotify.com/v1/me"
    headers = get_auth_header(token)
    result = requests.get(url, headers=headers)
    json_result = result.json()
    return json_result

def get_playlist_id(token, playlist_name):
    url = "https://api.spotify.com/v1/me/playlists?limit=50"
    headers = get_auth_header(token)
    result = requests.get(url, headers=headers)
    json_result = result.json()
    for playlist in json_result.get('items', []):
        if playlist['name'] == playlist_name:
            return playlist['id']
    return json_result  

def create_embed(playlist_name):
    playlist_id = get_playlist_id(token, playlist_name)
    if playlist_id:
        return playlist_id
    else:
        return None


if __name__ == '__main__':
    app.run(debug=True)