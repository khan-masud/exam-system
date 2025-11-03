export default () => ({
  app: {
    name: 'ProctorX Online Exam Suite',
    url: process.env.APP_URL || 'http://localhost:3000',
  },
  security: {
    jwtAccessTtl: parseInt(process.env.JWT_ACCESS_TTL || '900', 10),
    jwtRefreshTtl: parseInt(process.env.JWT_REFRESH_TTL || '604800', 10),
    otpTtl: parseInt(process.env.OTP_TTL || '300', 10),
  },
  storage: {
    s3Bucket: process.env.S3_BUCKET || 'exam-assets',
    region: process.env.S3_REGION || 'ap-south-1',
  },
});
