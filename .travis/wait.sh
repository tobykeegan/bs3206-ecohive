
# Define the URL to curl
URL="localhost:3000/api/ping"

# Function to check if the message attribute is "pong"
check_message() {
    response=$(curl -s "$URL")  # Make the curl request and store the JSON response
    message=$(echo "$response" | jq -r '.message')  # Extract the value of the "message" attribute using jq

    if [ "$message" = "pong" ]; then
        echo $response | jq .
        exit 0
    else
        echo "Ping did not pong, waiting..."
    fi
}

# Main loop with a maximum of 20 iterations
for ((i=0; i<20; i++)); do
    check_message
    sleep 1  # Adjust the sleep duration as needed
done

echo "Maximum number of iterations reached. Exiting loop."
exit 1