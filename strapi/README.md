# Strapi CMS - Docker Deployment

This directory contains the Strapi headless CMS application configured for Docker deployment in your NAS infrastructure.

## 🌐 Access URLs

The Strapi CMS is accessible via two routes:

1. **Subdomain**: `https://strapi.heronix.org` (Primary/Recommended)
2. **Path-based**: `https://heronix.org/strapi` (Alternative)

## 🚀 Initial Setup

### 1. Generate Security Keys

Strapi requires several secret keys for security. Generate them using:

```bash
# Navigate to project root
cd /home/matthieu/life/Cambelau/docker-compose-nas

# Generate all required secrets
echo "STRAPI_JWT_SECRET=$(openssl rand -base64 32)"
echo "STRAPI_ADMIN_JWT_SECRET=$(openssl rand -base64 32)"
echo "STRAPI_API_TOKEN_SALT=$(openssl rand -base64 32)"
echo "STRAPI_TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)"
echo "STRAPI_APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"
```

### 2. Configure Environment Variables

Add the generated values to your main `.env` file in the project root:

```bash
# Database
STRAPI_POSTGRES_USER=strapi
STRAPI_POSTGRES_PASSWORD=your_secure_password_here
STRAPI_POSTGRES_DB=strapi

# Strapi Secrets (paste generated values from step 1)
STRAPI_JWT_SECRET=<generated_value>
STRAPI_ADMIN_JWT_SECRET=<generated_value>
STRAPI_API_TOKEN_SALT=<generated_value>
STRAPI_TRANSFER_TOKEN_SALT=<generated_value>
STRAPI_APP_KEYS=<generated_value>
```

### 3. Deploy the Service

```bash
# Navigate to the root directory
cd /home/matthieu/life/Cambelau/docker-compose-nas

# Build and start Strapi services
docker compose -f docker-compose.services.yml up -d strapi strapi-postgres

# Check logs
docker compose -f docker-compose.services.yml logs -f strapi
```

### 4. Create Admin User

After deployment, visit `https://strapi.heronix.org/admin` to create your first admin user.

## 📁 Architecture

The Strapi service consists of:
- **Strapi Application**: Node.js-based headless CMS (port 1337)
- **PostgreSQL Database**: Persistent data storage (PostgreSQL 16)
- **Traefik Integration**: Automatic HTTPS routing with Let's Encrypt

### Data Persistence
- **Uploads**: `/opt/app/public/uploads` → `./strapi/uploads`
- **Database**: PostgreSQL data → `./strapi/postgres`
- **Temporary files**: `.tmp` directory → `./strapi/data`

## 🛠️ Management Commands

### View Logs
```bash
docker compose -f docker-compose.services.yml logs -f strapi
```

### Restart Service
```bash
docker compose -f docker-compose.services.yml restart strapi
```

### Stop Service
```bash
docker compose -f docker-compose.services.yml stop strapi strapi-postgres
```

### Access Database
```bash
docker exec -it strapi-postgres psql -U strapi -d strapi
```

### Rebuild Application
```bash
# After code changes
docker compose -f docker-compose.services.yml build strapi
docker compose -f docker-compose.services.yml up -d strapi
```

## 💾 Backup

### Database Backup
```bash
# Create backup
docker exec strapi-postgres pg_dump -U strapi strapi > strapi_backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
cat strapi_backup_YYYYMMDD_HHMMSS.sql | docker exec -i strapi-postgres psql -U strapi -d strapi
```

### File Uploads Backup
```bash
# Backup uploads directory
tar -czf strapi_uploads_$(date +%Y%m%d_%H%M%S).tar.gz ./strapi/uploads
```

## 🐛 Troubleshooting

### Container won't start
```bash
# Check logs
docker compose -f docker-compose.services.yml logs strapi

# Verify environment variables
docker compose -f docker-compose.services.yml config | grep -A 20 strapi:
```

### Database connection issues
```bash
# Check PostgreSQL health
docker exec strapi-postgres pg_isready -U strapi

# View PostgreSQL logs
docker compose -f docker-compose.services.yml logs strapi-postgres
```

### Permission issues
```bash
# Fix upload directory permissions
sudo chown -R 1000:1000 ./strapi/uploads ./strapi/data
```

## 🔒 Security Considerations

1. **Never commit secrets**: Keep all generated keys in `.env` file, not in git
2. **Strong passwords**: Use complex passwords for database access
3. **Regular updates**: Keep Strapi and dependencies updated
4. **API tokens**: Use API tokens for programmatic access, not admin credentials

## 🧑‍💻 Local Development

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
