# Environment Variables Documentation

## Overview
This document explains all environment variables used in SMART CALIS services.

## Frontend (.env.local)

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000` | Yes |
| `NEXT_PUBLIC_ML_API_URL` | ML Service base URL | `http://localhost:5001` | Yes |
| `NEXT_PUBLIC_ENV` | Application environment | `development` | No |

**Notes:**
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Copy `.env.local.example` to `.env.local` for development
- Never commit `.env.local` to Git

## Backend (.env)

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `PORT` | Express server port | `5000` | Yes |
| `NODE_ENV` | Environment (dev/prod) | `development` | Yes |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/smart_calis` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_change_in_prod` | Yes |
| `JWT_EXPIRE` | JWT token expiration | `7d` | Yes |
| `ML_SERVICE_URL` | ML Service base URL | `http://localhost:5001` | Yes |
| `OPENAI_API_KEY` | OpenAI API key for chatbot | `sk-...` | Yes (Stage 11) |
| `CORS_ORIGIN` | Frontend URL for CORS | `http://localhost:3000` | Yes |
| `SMTP_HOST` | Email SMTP host | `smtp.gmail.com` | No |
| `SMTP_PORT` | Email SMTP port | `587` | No |
| `SMTP_USER` | Email username | `your_email@gmail.com` | No |
| `SMTP_PASS` | Email password | `app_specific_password` | No |
| `SMTP_FROM` | From email address | `noreply@smartcalis.com` | No |

**Notes:**
- Copy `.env.example` to `.env` for development
- Use environment variables from hosting platform in production
- Never commit `.env` to Git
- Keep JWT_SECRET and OpenAI key secure
- Production JWT_SECRET must be strong (32+ characters)

### MongoDB URI Formats

**MongoDB Atlas (Cloud):**
```
mongodb+srv://username:password@cluster-name.mongodb.net/smart_calis?retryWrites=true&w=majority
```

**Local MongoDB:**
```
mongodb://localhost:27017/smart_calis
```

### JWT Configuration

- `JWT_SECRET`: Should be at least 32 characters in production
- `JWT_EXPIRE`: Can be set to different values:
  - `7d` - 7 days
  - `7d` - Shorter for sensitive operations
  - `30d` - Longer for remember-me functionality

## ML Service (.env)

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `FLASK_PORT` | Flask server port | `5001` | Yes |
| `FLASK_ENV` | Environment (dev/prod) | `development` | Yes |
| `FLASK_DEBUG` | Enable debug mode | `True` | No |
| `MODEL_PATH` | Path to trained model file | `./models/calorie_model.pkl` | Yes (Stage 8+) |
| `SCALER_PATH` | Path to feature scaler | `./models/scaler.pkl` | Yes (Stage 8+) |
| `CORS_ORIGIN` | Backend URL for CORS | `http://localhost:5000` | Yes |

**Notes:**
- Copy `.env.example` to `.env` for development
- Model paths are relative to ML service root directory
- FLASK_DEBUG should never be True in production

## Production Considerations

### Security
1. **Generate Strong Secrets**
   - Use `openssl rand -base64 32` to generate JWT_SECRET
   - Use unique, complex API keys from providers

2. **Environment-Specific Values**
   - Use different values for dev, staging, and production
   - Never use development values in production

3. **Secret Management**
   - Use platform-specific secret management:
     - Vercel: Environment Variables in project settings
     - Render: Environment variables in dashboard
     - GitHub Actions: Secrets tab
   - Never hardcode sensitive data

### Database
- Use MongoDB Atlas in production with IP whitelist
- Use separate database for each environment
- Enable automatic backups

### API Keys
- Rotate API keys regularly
- Monitor API usage and costs
- Use read-only keys where applicable
- Set up alerts for unusual activity

## Development Workflow

1. Copy `.example` files to actual files:
   ```bash
   cp .env.example .env           # Backend
   cp .env.local.example .env.local   # Frontend
   cp .env.example .env           # ML Service
   ```

2. Update values with local development settings

3. Start services:
   ```bash
   npm run dev  # Backend
   npm run dev  # Frontend
   python app.py  # ML Service
   ```

## Troubleshooting

### Connection Refused
- Verify service is running on correct port
- Check CORS_ORIGIN and API_URL match exactly
- Ensure firewall allows connections

### Authentication Failures
- Verify JWT_SECRET matches across requests
- Check token not expired
- Verify MongoDB user has correct permissions

### ML Service Errors
- Verify MODEL_PATH and SCALER_PATH exist
- Check model version compatibility
- Ensure features match training features

### MongoDB Connection Error
- Test MONGODB_URI directly in MongoDB Compass
- Verify IP whitelist includes your IP (Atlas)
- Check database user permissions
- Ensure MongoDB is running (if local)

## References

- [MongoDB Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [12-Factor App - Configuration](https://12factor.net/config)
