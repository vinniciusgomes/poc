module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2a4e40992d32f357ae58428d1f61b44b'),
  },
});
