const express = require('express');
const graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const router = express.Router();

const getAuthenticatedClient = (accessToken) => {
    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    return client;
};

router.get('/', async (req, res) => {
    if (!req.session.accessToken) {
        res.redirect('/auth/signin');
    } else {
        try {
            const client = getAuthenticatedClient(req.session.accessToken);
            const files = await client.api('/me/drive/root/children').get();
            res.json(files);
        } catch(err) {
            res.json({'error': err.message + " Please provide a user having SPO license. SPO stands for SharePoint Online. You can't use the Microsoft Graph API to access OneDrive without having SharePoint."});
        }
        
    }
});

router.get('/download/:itemId', async (req, res) => {
    if (!req.session.accessToken) {
        res.redirect('/auth/signin');
    } else {
        const client = getAuthenticatedClient(req.session.accessToken);
        const downloadUrl = await client.api(`/me/drive/items/${req.params.itemId}`).get();
        const downloadResponse = await fetch(downloadUrl['@microsoft.graph.downloadUrl']);
        const fileBuffer = await downloadResponse.buffer();
        res.send(fileBuffer);
    }
});

router.get('/permissions/:itemId', async (req, res) => {
    if (!req.session.accessToken) {
        res.redirect('/auth/signin');
    } else {
        const client = getAuthenticatedClient(req.session.accessToken);
        const permissions = await client.api(`/me/drive/items/${req.params.itemId}/permissions`).get();
        res.json(permissions);
    }
});

module.exports = router;
