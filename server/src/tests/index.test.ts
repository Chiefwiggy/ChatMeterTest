import request from 'supertest';
import App from '../index'

describe('Test the routes', () => {
  it('should get a 200 code when /database/getAll is called', async () => {
    const response: any = await request(App.app).get('/database/getAll');
    expect(response.statusCode).toBe(200);
  });

  it ('should get a 201 code when /database/sendURL is called', async() => {
    const testdata = {
      "url": `https://randomtest499494.com`,
      "title": "Breaking News, Latest News and Videos | CNNClose icon",
      "favicon": "https://cnn.com/media/sites/cnn/favicon.ico"
    }
    const response: any = await request(App.app)
      .post('/database/sendURL')
      .set('X-User', '0')
      .send(testdata)
    
    expect(response.statusCode).toEqual(201);
  })

  it ('should should get a 202 code when making the same call for the same user', async() => {
    const testdata = {
      "url": `https://randomtest499494.com`,
      "title": "Breaking News, Latest News and Videos | CNNClose icon",
      "favicon": "https://cnn.com/media/sites/cnn/favicon.ico"
    }
    const response: any = await request(App.app)
      .post('/database/sendURL')
      .set('X-User', '0')
      .send(testdata)
    
    expect(response.statusCode).toEqual(202);
  })

  it('should get 1 result from the user 0', async () => {
    const response: any = await request(App.app)
    .get('/database/getAll')
    .set('X-User', '0');
    expect(response.body.length).toBe(1);
  });

  it('should respond with 404 for unknown routes', async () => {
    const response: any = await request(App.app).get('/randomroute');
    expect(response.statusCode).toBe(404);
  });

  afterAll(async () => {
    await App.server.close();
    await request(App.app).delete(`/database/deleteAllUser/0`);
    await request(App.app).delete(`/database/deleteAllUser/1`);
  });
});

