export default ({ env }) => ({
    upload: {
        config: {
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
            sizeLimit: 250 * 1024 * 1024, // 250MB
        },
    },
});
