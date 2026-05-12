import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import Job from '../models/Job.js';

vi.mock('../models/Job.js', () => ({
  default: {
    find: vi.fn().mockReturnValue({
      populate: vi.fn().mockReturnValue({
        sort: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([])
        })
      })
    })
  }
}));

describe('TrustHire API Health Check', () => {
  it('should return 200 OK for health check', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Public Jobs API', () => {
  it('should fetch jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
