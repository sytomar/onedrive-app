# onedrive-app(OneDrive Integration App)

This application allows you to interact with OneDrive to list files, download files, and manage file permissions. It also supports real-time notifications for permission changes.

## Prerequisites

- Node.js
- Azure AD App Registration
    - Set Up Azure AD App Registration
    - Go to the Azure portal.
    - Navigate to "Azure Active Directory" > "App registrations" > "New registration".
    - Fill in the required fields and register the application.
    - Note the "Application (client) ID" and "Directory (tenant) ID" from the overview page.
    - In "Certificates & secrets", create a new client secret and note it down.
    - In "API permissions", add the following permissions:
        - Files.Read.All
        - Files.ReadWrite.All
        - User.Read
 - For More Info Refer(https://learn.microsoft.com/en-us/onedrive/developer/rest-api/getting-started/graph-oauth?view=odsp-graph-online#register-your-app)

## Setup

1. Clone the repository.
2. Navigate to the project directory and install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add your Azure AD credentials:

    ```env
    CLIENT_ID=your_client_id
    TENANT_ID=your_tenant_id
    CLIENT_SECRET=your_client_secret
    ```

4. Start the application:

    ```bash
    npm run start
    ```

## Endpoints

- `GET /auth/signin` - Initiates the authentication flow.
- `GET /auth/redirect` - Handles the OAuth2 callback.
- `GET /drive` - Lists files in OneDrive.
- `GET /drive/download/:itemId` - Downloads a file by item ID.
- `GET /drive/permissions/:itemId` - Lists permissions for a file.

## Real-Time Updates

This app uses webhooks to receive real-time notifications for file permission changes. The notifications are broadcasted to connected clients using Socket.IO.
