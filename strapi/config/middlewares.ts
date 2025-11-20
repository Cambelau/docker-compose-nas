export default ({ env }) => [
    "strapi::logger",
    "strapi::errors",
    {
        name: "strapi::security",
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    "connect-src": ["'self'", "https:"],
                    "img-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        `https://${env("S3_BUCKET_NAME")}.s3.${env("S3_BUCKET_REGION")}.amazonaws.com`,
                    ],
                    "media-src": [
                        "'self'",
                        "data:",
                        "blob:",
                        "dl.airtable.com",
                        `https://${env("S3_BUCKET_NAME")}.s3.${env("S3_BUCKET_REGION")}.amazonaws.com`,
                    ],
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
