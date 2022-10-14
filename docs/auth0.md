# Auth0
Like it or not, you need a [Auth0](https://auth0.com/) account to get Common Voice to work.
Add the following lines to `.env-local-docker` which is locate at the root of the git repository.
```
CV_AUTH0_DOMAIN="dev-24cisdir.us.auth0.com"
CV_AUTH0_CLIENT_ID="<YOUR_ID>"
CV_AUTH0_CLIENT_SECRET="<YOU_HAVE_A_SECRET>"
```

## Allowed Callbacks URLS
### Test
We've tried getting the login/signup to work by using `ngrok` to get a temporary domain name.
```bash
ngrok http 8070
```
which return https://f1bc-76-65-177-171.ngrok.io.
We then go to https://manage.auth0.com/dashboard/us/dev-24cisdir/applications and set `Common Voice` `Allowed Callback URLs` to:
```
http://f1bc-76-65-177-171.ngrok.io/callback
```

## Whitelisting emails
* [Auth0 Rules](https://auth0.com/docs/customize/rules)
* [Manage User Access to Applications](https://auth0.com/docs/manage-users/user-accounts/manage-user-access-to-applications)
* [Rules examples](https://github.com/auth0/rules/tree/aeaf93bc058408e260192d0941a688963449d6be/src/rules)
* [Whitelist for a Specific App](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist-for-app.js) Only allow access to users with whitelist email addresses on a specific app.
* [Whitelist](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist.js) Only allow access to users with specific whitelist email addresses.
* [Whitelist on Specific Connection](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-whitelist-on-a-connection.js) Only allow access to users coming from a whitelist on specific connection.
* [Email domain whitelist](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-domain-whitelist.js) Only allow access to users with specific whitelist email domains.
* [Whitelist on the cloud](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/dropbox-whitelist.js) Determine access to users based on a whitelist of emails stored in Dropbox.
* [Add country to the user profile](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/add-country.js) Add a country attribute to the user based on their IP address.
* [Disable social signups](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/disable-social-signup.js) Disable signups from social connections.
* [Force email verification](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/email-verified.js) Only allow access to users with verified emails.

Looking at [Whitelist for a Specific App](https://github.com/auth0/rules/blob/aeaf93bc058408e260192d0941a688963449d6be/src/rules/simple-user-whitelist-for-app.js) seems to be promising.
```javascript
/**
 * @title Whitelist for a Specific App
 * @overview Only allow access to users with whitelist email addresses on a specific app
 * @gallery true
 * @category access control
 *
 * This rule will only allow access to users with specific email addresses on a specific app.
 *
 */

function (user, context, callback) {

  // Access should only be granted to verified users.
  if (!user.email || !user.email_verified) {
    return callback(new UnauthorizedError('Access denied.'));
  }

  // only enforce for NameOfTheAppWithWhiteList
  // bypass this rule for all other apps
  if(context.clientName !== 'NameOfTheAppWithWhiteList'){
    return callback(null, user, context);
  }

  const whitelist = [ 'user1@example.com', 'user2@example.com' ]; // authorized users
  const userHasAccess = whitelist.some(function (email) {
    return email === user.email;
  });

  if (!userHasAccess) {
    return callback(new UnauthorizedError('Access denied.'));
  }

  callback(null, user, context);
}
```
