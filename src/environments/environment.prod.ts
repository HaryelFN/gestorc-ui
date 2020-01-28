export const environment = {
  production: true,
  apiUrl: 'https://gestorc.com/api',

  tokenWhitelistedDomains: [ new RegExp('gestorc.com/api') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
