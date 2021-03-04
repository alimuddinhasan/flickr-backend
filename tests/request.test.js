const request = require('supertest')
const app = require('../')

let server, agent

beforeEach((done) => {
    server = app.listen(3030, (err) => {
      if (err) return done(err);

       agent = request.agent(server); 
       done();
    });
});

afterEach((done) => {
  return server && server.close(done);
});

describe('Images Service', () => {
  it('should return images without filtering', async () => {
    const res = await agent.get('/images')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('items')
  })

  it('should return images with tags filtering', async () => {
    const res = await agent.get('/images?tags=indonesia&tagmode=any')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('items')

    const numberOfMatches = res.body.items.filter(doc => doc.tags.includes('indonesia')).length;
    expect(numberOfMatches).toEqual(res.body.items.length)
  })
})