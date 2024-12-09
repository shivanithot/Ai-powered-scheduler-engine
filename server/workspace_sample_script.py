import requests

# Base URL for the API
BASE_URL = "https://counter-three-lilac.vercel.app"


# Function to hit the /hit endpoint
def hit_counter():
    response = requests.get(f"{BASE_URL}/hit")
    if response.status_code == 200:
        data = response.json()
        print(f"Counter: {data['counter']}, Message: {data['message']}")
    else:
        print(f"Failed to hit counter: {response.status_code}")


# Function to post a new message to /message endpoint
def update_message(new_message):
    payload = {"message": new_message}
    response = requests.post(f"{BASE_URL}/message", json=payload)
    if response.status_code == 200:
        data = response.json()
        print(f"Counter: {data['counter']}, Message: {data['message']}")
    else:
        print(f"Failed to update message: {response.status_code}")


hit_counter()
# Update the message on the /message endpoint
new_message = "Task 1 - From workspace databricks"
update_message(new_message)

# Check the updated message
response = requests.get(BASE_URL)
if response.status_code == 200:
    data = response.json()
    print(
        f"Updated Counter: {data['counter']}, Updated Message:\
    {data['message']}"
    )
else:
    print(f"Failed to get the updated data: {response.status_code}")
