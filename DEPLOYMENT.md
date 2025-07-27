# Deployment Guide

This guide covers deployment strategies for the Nail-It application across different environments.

## Table of Contents
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Logging](#monitoring--logging)
- [Scaling Considerations](#scaling-considerations)

## Local Development

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Git

### Setup Steps

1. **Clone and Install**
   ```bash
   git clone https://github.com/nagendrakathi/Nail-It.git
   cd Nail-It
   
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend/Nail-It
   npm install
   ```

2. **Environment Configuration**
   Create `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/nail-it-dev
   JWT_SECRET=your-development-jwt-secret
   GEMINI_API_KEY=your-google-ai-api-key
   OPENAI_API_KEY=your-openai-api-key
   ```

3. **Start Services**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend/Nail-It
   npm run dev
   ```

## Production Deployment

### Option 1: Traditional VPS/Server

#### Server Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 20GB+ SSD
- **OS**: Ubuntu 20.04+ or CentOS 8+

#### Deployment Steps

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   ```

2. **Application Deployment**
   ```bash
   # Clone repository
   git clone https://github.com/nagendrakathi/Nail-It.git /var/www/nail-it
   cd /var/www/nail-it
   
   # Backend setup
   cd backend
   npm ci --production
   
   # Frontend build
   cd ../frontend/Nail-It
   npm ci
   npm run build
   ```

3. **Environment Configuration**
   ```bash
   # Backend environment
   sudo nano /var/www/nail-it/backend/.env
   ```
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/nail-it-prod
   JWT_SECRET=your-super-secure-jwt-secret
   GEMINI_API_KEY=your-google-ai-api-key
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **PM2 Configuration**
   ```bash
   # Create ecosystem file
   nano /var/www/nail-it/ecosystem.config.js
   ```
   ```javascript
   module.exports = {
     apps: [{
       name: 'nail-it-backend',
       script: '/var/www/nail-it/backend/server.js',
       cwd: '/var/www/nail-it/backend',
       instances: 2,
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production'
       },
       error_file: '/var/log/nail-it/error.log',
       out_file: '/var/log/nail-it/out.log',
       log_file: '/var/log/nail-it/combined.log'
     }]
   };
   ```

5. **Nginx Configuration**
   ```bash
   sudo nano /etc/nginx/sites-available/nail-it
   ```
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       # Frontend
       location / {
           root /var/www/nail-it/frontend/Nail-It/dist;
           try_files $uri $uri/ /index.html;
           
           # Cache static assets
           location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
               expires 1y;
               add_header Cache-Control "public, immutable";
           }
       }
   
       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   
       # File uploads
       location /uploads {
           alias /var/www/nail-it/backend/uploads;
           expires 1y;
           add_header Cache-Control "public";
       }
   }
   ```

6. **Start Services**
   ```bash
   # Enable Nginx site
   sudo ln -s /etc/nginx/sites-available/nail-it /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   
   # Start application with PM2
   cd /var/www/nail-it
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Option 2: Cloud Platforms

#### Heroku Deployment

1. **Prepare Application**
   ```bash
   # Add Procfile to backend
   echo "web: node server.js" > backend/Procfile
   
   # Update package.json engines
   nano backend/package.json
   ```
   ```json
   {
     "engines": {
       "node": "18.x",
       "npm": "9.x"
     }
   }
   ```

2. **Deploy Backend**
   ```bash
   # From backend directory
   heroku create nail-it-backend
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set GEMINI_API_KEY=your-api-key
   heroku config:set OPENAI_API_KEY=your-openai-key
   
   # Add MongoDB addon
   heroku addons:create mongolab:sandbox
   
   git subtree push --prefix backend heroku main
   ```

3. **Deploy Frontend (Vercel)**
   ```bash
   # From frontend/Nail-It directory
   npm install -g vercel
   vercel --prod
   
   # Set environment variables in Vercel dashboard
   VITE_API_URL=https://your-backend.herokuapp.com/api
   ```

#### Railway Deployment

1. **Backend Deployment**
   ```bash
   # Connect GitHub repository to Railway
   # Set environment variables in Railway dashboard
   NODE_ENV=production
   JWT_SECRET=your-jwt-secret
   GEMINI_API_KEY=your-api-key
   OPENAI_API_KEY=your-openai-key
   MONGO_URL=your-mongodb-connection-string
   ```

2. **Frontend Deployment**
   Similar to Vercel, can be deployed on Netlify or Railway.

## Environment Configuration

### Development
```env
NODE_ENV=development
PORT=5000
MONGO_URL=mongodb://localhost:27017/nail-it-dev
JWT_SECRET=dev-jwt-secret
GEMINI_API_KEY=your-api-key
OPENAI_API_KEY=your-api-key
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=debug
```

### Staging
```env
NODE_ENV=staging
PORT=5000
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/nail-it-staging
JWT_SECRET=staging-jwt-secret
GEMINI_API_KEY=your-api-key
OPENAI_API_KEY=your-api-key
CORS_ORIGIN=https://staging.nail-it.com
LOG_LEVEL=info
```

### Production
```env
NODE_ENV=production
PORT=5000
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/nail-it-prod
JWT_SECRET=super-secure-production-jwt-secret
GEMINI_API_KEY=your-api-key
OPENAI_API_KEY=your-api-key
CORS_ORIGIN=https://nail-it.com
LOG_LEVEL=error
RATE_LIMIT_ENABLED=true
```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Configure network access (whitelist IPs)
   - Create database user

2. **Connection String**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

3. **Indexes (Production)**
   ```javascript
   // Connect to MongoDB and create indexes
   db.users.createIndex({ email: 1 }, { unique: true })
   db.sessions.createIndex({ user: 1 })
   db.questions.createIndex({ Session: 1 })
   db.questions.createIndex({ isPinned: 1 })
   ```

### Local MongoDB
```bash
# Install MongoDB
sudo apt-get install -y mongodb

# Start service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
use nail-it-prod
db.createUser({
  user: "nail-it-user",
  pwd: "secure-password",
  roles: [{ role: "readWrite", db: "nail-it-prod" }]
})
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: |
          backend/package-lock.json
          frontend/Nail-It/package-lock.json
    
    - name: Install Backend Dependencies
      run: |
        cd backend
        npm ci
    
    - name: Install Frontend Dependencies
      run: |
        cd frontend/Nail-It
        npm ci
    
    - name: Run Backend Tests
      run: |
        cd backend
        npm test
    
    - name: Run Frontend Tests
      run: |
        cd frontend/Nail-It
        npm test
    
    - name: Build Frontend
      run: |
        cd frontend/Nail-It
        npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Production
      run: |
        # Add your deployment script here
        echo "Deploying to production..."
```

### Deployment Script

Create `scripts/deploy.sh`:

```bash
#!/bin/bash

set -e

# Configuration
REMOTE_HOST="your-server.com"
REMOTE_USER="ubuntu"
APP_DIR="/var/www/nail-it"

echo "🚀 Starting deployment..."

# Pull latest changes
ssh $REMOTE_USER@$REMOTE_HOST "cd $APP_DIR && git pull origin main"

# Backend deployment
ssh $REMOTE_USER@$REMOTE_HOST "cd $APP_DIR/backend && npm ci --production"

# Frontend build
ssh $REMOTE_USER@$REMOTE_HOST "cd $APP_DIR/frontend/Nail-It && npm ci && npm run build"

# Restart services
ssh $REMOTE_USER@$REMOTE_HOST "pm2 restart nail-it-backend"
ssh $REMOTE_USER@$REMOTE_HOST "sudo systemctl reload nginx"

echo "✅ Deployment completed successfully!"
```

## Monitoring & Logging

### PM2 Monitoring
```bash
# View logs
pm2 logs nail-it-backend

# Monitor in real-time
pm2 monit

# Restart if needed
pm2 restart nail-it-backend
```

### Application Monitoring

1. **Add Monitoring Tools**
   ```bash
   npm install --save helmet compression morgan
   ```

2. **Update server.js**
   ```javascript
   const helmet = require('helmet');
   const compression = require('compression');
   const morgan = require('morgan');
   
   app.use(helmet());
   app.use(compression());
   app.use(morgan('combined'));
   ```

### Log Aggregation

Create `config/logger.js`:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'nail-it-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

## SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Backup Strategy

### Database Backup
```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/mongodb"
DB_NAME="nail-it-prod"

# Create backup
mongodump --db $DB_NAME --out $BACKUP_DIR/$DATE

# Compress
tar -czf $BACKUP_DIR/nail-it-$DATE.tar.gz $BACKUP_DIR/$DATE

# Remove uncompressed backup
rm -rf $BACKUP_DIR/$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: nail-it-$DATE.tar.gz"
```

### Application Files Backup
```bash
#!/bin/bash
# backup-files.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/files"
APP_DIR="/var/www/nail-it"

# Backup uploads directory
tar -czf $BACKUP_DIR/uploads-$DATE.tar.gz $APP_DIR/backend/uploads

# Backup configuration
tar -czf $BACKUP_DIR/config-$DATE.tar.gz $APP_DIR/backend/.env

echo "Files backup completed"
```

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Multiple application instances
- Session storage in Redis
- Database read replicas

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching (Redis)
- CDN for static assets

### Performance Optimization
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Compression
app.use(compression());

// Security headers
app.use(helmet());
```

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   pm2 logs nail-it-backend
   
   # Check environment variables
   pm2 env 0
   ```

2. **Database connection issues**
   ```bash
   # Test MongoDB connection
   mongo "your-connection-string"
   
   # Check network connectivity
   telnet your-db-host 27017
   ```

3. **High memory usage**
   ```bash
   # Monitor memory
   pm2 monit
   
   # Restart if needed
   pm2 restart nail-it-backend
   ```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure JWT secret
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Regular security audits
- [ ] Backup encryption

## Rollback Strategy

1. **Quick Rollback**
   ```bash
   # Revert to previous commit
   git reset --hard HEAD~1
   pm2 restart nail-it-backend
   ```

2. **Database Rollback**
   ```bash
   # Restore from backup
   mongorestore --db nail-it-prod /backup/mongodb/latest/
   ```

This deployment guide provides comprehensive instructions for deploying Nail-It in various environments while maintaining security and performance best practices.