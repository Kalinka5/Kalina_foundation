# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication for the Kalina Foundation application.

## Required Google Cloud Console Setup

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and select "New Project"
3. Provide a project name (e.g., "Kalina Foundation")
4. Click "Create"

### 2. Enable Google+ API

1. In the Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API" and enable it
3. Also enable "Google OAuth2 API" if available

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose "External" for user type
3. Fill in the required information:
   - App name: "Kalina Foundation"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `email`
   - `profile`
   - `openid`
5. Save and continue through the remaining steps

### 4. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as the application type
4. Provide a name (e.g., "Kalina Foundation Web Client")
5. Under "Authorized JavaScript origins", add:
   - `http://localhost:3000` (for development)
   - `https://your-domain.com` (for production)
6. Under "Authorized redirect URIs", add:
   - `http://localhost:3000/auth/google/callback` (for development)
   - `https://your-domain.com/auth/google/callback` (for production)
7. Click "Create"
8. Copy the **Client ID** and **Client Secret**

## Environment Variables Setup

### Backend Environment Variables

Add these to your backend `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory with:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important Notes:**

- The Client ID should be the same for both frontend and backend
- The Client Secret should only be in the backend `.env` file
- Make sure to add `.env` files to your `.gitignore` to avoid committing secrets

## Required Credentials from Google Console

You need these credentials from Google Cloud Console:

1. **Client ID** - Used by both frontend and backend
2. **Client Secret** - Used only by backend for token verification
3. **Authorized JavaScript origins** - Your frontend domain(s)
4. **Authorized redirect URIs** - Your callback URL(s)

## Testing the Implementation

1. Make sure all environment variables are set correctly
2. Start your backend server
3. Start your frontend development server
4. Navigate to the login/register page
5. Click the "Continue with Google" button
6. Complete the Google OAuth flow
7. Verify that the user is created/logged in successfully

## Troubleshooting

### Common Issues:

1. **"Invalid client" error**: Check that the Client ID is correct and matches in both frontend and backend
2. **"Redirect URI mismatch"**: Ensure the redirect URI in Google Console matches your application URL
3. **"Access blocked"**: Check OAuth consent screen configuration
4. **CORS errors**: Verify that your frontend URL is added to authorized JavaScript origins
5. **CSP (Content Security Policy) violations**: The application is configured with proper CSP headers to allow Google OAuth
6. **Popup blocked**: Users may need to allow popups for the site to use Google OAuth

### Debug Steps:

1. Check browser console for JavaScript errors
2. Check backend logs for authentication errors
3. Verify environment variables are loaded correctly
4. Test with a fresh Google account to ensure the flow works end-to-end

## Security Considerations

1. Never commit `.env` files to version control
2. Use HTTPS in production
3. Regularly rotate your Client Secret
4. Monitor OAuth usage in Google Cloud Console
5. Set up proper CORS policies for production
