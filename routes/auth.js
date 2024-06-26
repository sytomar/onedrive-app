const express = require('express');
const msal = require('@azure/msal-node');
const router = express.Router();
require('dotenv').config();

const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

router.get('/signin', (req, res) => {
    const authCodeUrlParameters = {
        scopes: ["user.read", "files.read.all", "files.readwrite.all"],
        redirectUri: "http://localhost:3000/auth/callback",
    };

    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => console.log(JSON.stringify(error)));
});

router.get('/callback', (req, res) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read", "files.read.all", "files.readwrite.all"],
        redirectUri: "http://localhost:3000/auth/callback",
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        req.session.accessToken = response.accessToken;
        res.redirect('/drive');
    }).catch((error) => console.log(JSON.stringify(error)));
});

module.exports = router;
