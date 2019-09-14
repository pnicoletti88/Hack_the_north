const express = require('express');
const request = require('request');
require('dotenv').config();

const baseUrl = 'https://api.freshbooks.com';
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const redirectURI = process.env.REDIRECT_URL;

const router = express.Router();

router.get('/TestAuthentication', (req, res) => {
  const authCode = req.query.code;
  const authData = {
    grant_type: 'authorization_code',
    client_secret: clientSecret,
    code: authCode,
    client_id: clientId,
    redirect_uri: redirectURI,
  };
  const oauthUrl = `${baseUrl}/auth/oauth/token`;
  const oauthRequest = request.post(oauthUrl, { json: authData }, (err, oauthResponse, oauthBody) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    const meOptions = {
      headers: {
        Authorization: `Bearer ${oauthBody.access_token}`,
      },
    };
    const meUrl = `${baseUrl}/auth/api/v1/users/me`;
    const meRequest = request.get(meUrl, meOptions, (meErr, meResponse, meBody) => {
      if (meErr) {
        console.error(meErr);
        res.send(err);
      }
      const meBodyJson = JSON.parse(meBody);
      const meProfile = meBodyJson.response.profile;
      res.send(`You have successfully logged in for ${meProfile.first_name} ${meProfile.last_name}`);
    });
  });
});


module.exports = router;
