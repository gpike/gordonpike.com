# Deployment Guide

This document provides instructions for deploying the portfolio site to different environments.

## Prerequisites

- Node.js and npm installed
- SSH access to the deployment server
- `jq` command-line tool installed (for parsing JSON)

## Available Scripts

The following npm scripts are available for deployment:

- `npm run static` - Build the static site and output to `.output/public`
- `npm run deploy` - Build and deploy to production
- `npm run deploy:staging` - Build and deploy to staging

## Using the Deployment Script

For more flexibility, you can use the `deploy.sh` script:

```bash
# Deploy to production (default)
./deploy.sh

# Deploy to staging
./deploy.sh --env=staging

# Use a custom configuration file
./deploy.sh --config=custom-config.json

# Show help
./deploy.sh --help
```

## Configuration

The deployment settings are stored in `deploy.config.json`. You can modify this file to add new environments or change existing ones.

Example configuration:

```json
{
  "environments": {
    "production": {
      "host": "agileike@agilepike.com",
      "path": "~/gordonpike.com",
      "description": "Production environment"
    },
    "staging": {
      "host": "agileike@agilepike.com",
      "path": "~/staging.gordonpike.com",
      "description": "Staging environment for testing"
    }
  },
  "build": {
    "outputDir": ".output/public",
    "command": "npm run static"
  }
}
```

## Adding a New Environment

To add a new environment:

1. Edit `deploy.config.json` and add a new entry to the `environments` object
2. Run `./deploy.sh --env=your-new-environment`

## Troubleshooting

- **Build fails**: Check for errors in the build output
- **Deployment fails**: Verify SSH access and remote path permissions
- **Configuration error**: Ensure `deploy.config.json` is valid JSON and contains the specified environment
