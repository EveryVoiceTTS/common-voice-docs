# Auth0
Like it or not, you need a [Auth0](https://auth0.com/) account to get Common Voice to work.
Start by following these [instructions](https://github.com/common-voice/common-voice/blob/main/docs/DEVELOPMENT.md#authentication)
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

### Once Registered
We can see that a user has registered in `mysql` by querying `user_clients`.
```mysql
mysql> SELECT * FROM user_clients;
+--------------------------------------+------------------------------+-------------------+----------------+-------------------+---------------------+-------------------+-------------------+----------+--------------+---------+--------------------------+------------+-----------+-----------------+--------------------+------------------------------------------+
| client_id                            | email                        | deprecated_accent | deprecated_age | deprecated_gender | created_at          | deprecated_bucket | deprecated_sso_id | username | basket_token | visible | skip_submission_feedback | avatar_url | has_login | avatar_clip_url | has_computed_goals | auth_token                               |
+--------------------------------------+------------------------------+-------------------+----------------+-------------------+---------------------+-------------------+-------------------+----------+--------------+---------+--------------------------+------------+-----------+-----------------+--------------------+------------------------------------------+
| 599a878e-1704-4549-b4a7-ff32dcd4ba94 | samuel.larkin@cnrc-nrc.gc.ca | NULL              | NULL           | NULL              | 2022-06-28 19:22:57 | NULL              | NULL              | Samuel   | NULL         |       0 |                        0 | NULL       |         1 | NULL            |                  1 | 29c93e8b800f74c4b5339b9bc6d445e05fc44a15 |
| d8ad8111-16ac-4c8d-bab6-7a0b8c2f29ae | NULL                         | NULL              | NULL           | NULL              | 2022-06-28 13:12:20 | NULL              | NULL              |          | NULL         |       0 |                        0 | NULL       |         0 | NULL            |                  0 | d82e8cdb3be3bd3c4d957d69a0bbf714831fdab2 |
+--------------------------------------+------------------------------+-------------------+----------------+-------------------+---------------------+-------------------+-------------------+----------+--------------+---------+--------------------------+------------+-----------+-----------------+--------------------+------------------------------------------+
2 rows in set (0.00 sec)
```
There are some indicatons under `sessions`.
```mysql
mysql> SELECT * FROM sessions;
+----------------------------------+------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| session_id                       | expires    | data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
+----------------------------------+------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| r7kzDd8ZvJrDKW54TedfNG1_4FSyX3ju | 1659038856 | {"cookie":{"originalMaxAge":2592000000,"expires":"2022-07-28T20:02:15.764Z","secure":false,"httpOnly":true,"path":"/"},"passport":{"user":{"id":"auth0|61e5a5b0a1e3ac0069eb122b","user_id":"auth0|61e5a5b0a1e3ac0069eb122b","name":{},"emails":[{"value":"samuel.larkin@cnrc-nrc.gc.ca"}],"_json":{"sub":"auth0|61e5a5b0a1e3ac0069eb122b","email":"samuel.larkin@cnrc-nrc.gc.ca","email_verified":true},"_raw":"{\"sub\":\"auth0|61e5a5b0a1e3ac0069eb122b\",\"email\":\"samuel.larkin@cnrc-nrc.gc.ca\",\"email_verified\":true}"}}} |
+----------------------------------+------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
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
