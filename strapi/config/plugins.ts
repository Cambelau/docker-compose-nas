export default ({ env }) => ({
    upload: {
        config: {
            // Use local storage if S3 credentials are not provided, otherwise use S3
            ...(env("S3_BUCKET_REGION") ? {
                provider: "aws-s3",
                providerOptions: {
                    rootPath: 'strapi/uploads',
                    s3Options: {
                        region: env("S3_BUCKET_REGION"),
                        endpoint: env('S3_BUCKET_ENDPOINT'),
                        credentials: {
                            accessKeyId: env("S3_BUCKET_ACCESS_KEY"),
                            secretAccessKey: env("S3_BUCKET_ACCESS_SECRET"),
                        },
                        params: {
                            ACL: 'private',
                            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
                            Bucket: env("S3_BUCKET_NAME"),
                        },
                    },
                },
                actionOptions: {
                    upload: {},
                    uploadStream: {},
                    delete: {},
                },
            } : {
                // Local file storage fallback
                provider: 'local',
                providerOptions: {
                    sizeLimit: 250 * 1024 * 1024, // 250MB
                }
            }),
            sizeLimit: 250 * 1024 * 1024, // 250MB
        },
    },
    // Enable internationalization plugin for multilingual content
    i18n: {
        enabled: true,
        config: {
            defaultLocale: 'fr',
            locales: ['fr', 'en', 'ar']
        }
    },
    // Enable upload plugin for media management
    'users-permissions': {
        enabled: true,
        config: {
            jwt: {
                expiresIn: '30d'
            }
        }
    }
});
