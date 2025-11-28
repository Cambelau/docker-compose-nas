export default ({ env }) => [
    "strapi::logger",
    "strapi::errors",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "connect-src": ["'self'", "https:", "http:"],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        ...(env("S3_BUCKET_NAME") && env("S3_BUCKET_REGION") 
                            ? [`https://${env("S3_BUCKET_NAME")}.s3.${env("S3_BUCKET_REGION")}.amazonaws.com`]
                            : []
                        ),
                    ],
                    "media-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        ...(env("S3_BUCKET_NAME") && env("S3_BUCKET_REGION")
                            ? [`https://${env("S3_BUCKET_NAME")}.s3.${env("S3_BUCKET_REGION")}.amazonaws.com`]
                            : []
                        ),
                    ],
                    "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                    "frame-src": ["'self'", "data:", "blob:"],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
];
