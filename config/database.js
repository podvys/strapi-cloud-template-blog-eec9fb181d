// config/database.js
module.exports = ({ env }) => {
  const isProd = env('NODE_ENV') === 'production';
  const client = isProd ? 'postgres' : 'sqlite';

  if (client === 'postgres') {
    // В Strapi Cloud обычно задана DATABASE_URL (или набор HOST/PORT/NAME/USER/PASSWORD)
    const fromUrl = env('DATABASE_URL');

    return {
      connection: {
        client: 'postgres',
        connection: fromUrl
          ? fromUrl
          : {
              host: env('DATABASE_HOST', '127.0.0.1'),
              port: env.int('DATABASE_PORT', 5432),
              database: env('DATABASE_NAME', 'strapi'),
              user: env('DATABASE_USERNAME', 'strapi'),
              password: env('DATABASE_PASSWORD', 'strapi'),
              ssl: env.bool('DATABASE_SSL', true),
            },
        pool: { min: 0, max: 10 },
      },
    };
  }

  // dev: sqlite
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};