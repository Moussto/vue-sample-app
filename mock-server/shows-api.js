/**
 * Rules API.
 * GET /rest/shows
 * GET /rest/show/:is
 * POST /rest/show/:id/favorites
 */

const _ = require('lodash');
const shows = require('./shows');

module.exports = function showsRouter(app) {
  app.get('/rest/shows', (req, res) => {
    console.info('GET /rest/shows');
    return res.status(200).json(shows);
  });

  app.get('/rest/show/:id', async (req, res) => {
    console.info(`GET /rest/shows/${req.params.id}`);

    const paramId = Number(req.params.id);
    const show = _.find(shows, r => r.id === paramId);

    if (!show) {
      return res.status(404).send();
    }
    // add fake delay to show loading state
    await new Promise(done => setTimeout(() => done(), 1500));
    return res.status(200).json(show);
  });

  app.post('/rest/show/:id/favorites', (req, res) => {
    console.info(`POST /rest/shows/${req.params.id}/favorites`);
    console.info('  => body: ', req.body);

    const paramId = Number(req.params.id);
    const show = _.find(shows, r => r.id === paramId);

    if (!show) {
      return res.status(404).send();
    }

    const body = req.body;

    if (!body || body.isFavorite === undefined) {
      return res.status(400).send();
    }

    _.extend(show, body)

    return res.status(200).json(show);

  });

};
