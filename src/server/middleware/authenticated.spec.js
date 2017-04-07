import authenticated from './authenticated';

describe('middleware authenticated', ()=> {
  it('should return next() if authenticated', ()=> {
    const req = {isAuthenticated: ()=> true};
    const res = {};
    const next = ()=> {};
    
    expect(authenticated(req, res, next)).toBe(next());
  });
  it('should reurn 401 "Unauthorized" if not authenticated', ()=> {
    const req = {isAuthenticated: ()=> false};
    const res = {end: ()=> {}, status: (code)=> {}};
    const next = ()=> {};
    
    spyOn(res, 'status');
    spyOn(res, 'end');
    
    authenticated(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.end).toHaveBeenCalled();
  });
});