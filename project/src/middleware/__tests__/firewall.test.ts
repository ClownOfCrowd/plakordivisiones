import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ipFilter, securityHeaders, validateInput, blacklistedIPs } from '../firewall';

describe('Firewall Middleware', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

  beforeEach(() => {
    mockReq = {
      ip: '127.0.0.1',
      body: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      setHeader: vi.fn(),
    };
    mockNext = vi.fn();
    blacklistedIPs.length = 0;
    vi.clearAllMocks();
  });

  describe('ipFilter', () => {
    it('should allow non-blacklisted IPs', () => {
      ipFilter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should block blacklisted IPs', () => {
      blacklistedIPs.push('blacklisted-ip');
      mockReq.ip = 'blacklisted-ip';
      
      ipFilter(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Access denied' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('securityHeaders', () => {
    it('should set security headers', () => {
      securityHeaders(mockReq, mockRes, mockNext);
      expect(mockRes.setHeader).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
      expect(mockRes.setHeader).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('validateInput', () => {
    it('should sanitize input', () => {
      mockReq.body = {
        name: 'Test <script>alert("xss")</script>',
        email: 'test@example.com',
      };
      validateInput(mockReq, mockRes, mockNext);
      expect(mockReq.body.name).not.toContain('<script>');
      expect(mockNext).toHaveBeenCalled();
    });
  });
}); 