import requests
import json

url = "http://localhost:8000/generate/fano_7"
payload = {"elements": [1, 2, 3, 4, 5, 6, 7]}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    print("Response JSON:")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
