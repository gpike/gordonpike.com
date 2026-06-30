#!/bin/bash

# Exit on error
set -e

# Default values
ENV="production"
CONFIG_FILE="deploy.config.json"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --env=*)
      ENV="${1#*=}"
      shift
      ;;
    --config=*)
      CONFIG_FILE="${1#*=}"
      shift
      ;;
    --help)
      echo "Usage: ./deploy.sh [options]"
      echo "Options:"
      echo "  --env=<environment>   Environment to deploy to (production, staging) [default: production]"
      echo "  --config=<file>       Configuration file to use [default: deploy.config.json]"
      echo "  --help                Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help to see available options"
      exit 1
      ;;
  esac
done

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Error: jq is required but not installed."
  echo "Please install jq: https://stedolan.github.io/jq/download/"
  exit 1
fi

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Configuration file '$CONFIG_FILE' not found."
  exit 1
fi

# Get environment configuration
HOST=$(jq -r ".environments.$ENV.host" "$CONFIG_FILE")
REMOTE_PATH=$(jq -r ".environments.$ENV.path" "$CONFIG_FILE")
DESCRIPTION=$(jq -r ".environments.$ENV.description" "$CONFIG_FILE")
LOCAL_PATH=$(jq -r ".build.outputDir" "$CONFIG_FILE")
BUILD_COMMAND=$(jq -r ".build.command" "$CONFIG_FILE")

# Check if environment exists
if [ "$HOST" = "null" ] || [ "$REMOTE_PATH" = "null" ]; then
  echo "Error: Environment '$ENV' not found in configuration file."
  echo "Available environments:"
  jq -r '.environments | keys | join(", ")' "$CONFIG_FILE"
  exit 1
fi

echo "Deploying to $ENV environment: $DESCRIPTION"
echo "Host: $HOST"
echo "Remote path: $REMOTE_PATH"

# Build the static site
echo "Building static site..."
eval "$BUILD_COMMAND"

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi

# Deploy using rsync
echo "Deploying to $HOST:$REMOTE_PATH..."
rsync -av "$LOCAL_PATH/" "$HOST:$REMOTE_PATH" --delete

# Check if deployment was successful
if [ $? -ne 0 ]; then
  echo "Deployment failed."
  exit 1
fi

echo "Deployment completed successfully!"
