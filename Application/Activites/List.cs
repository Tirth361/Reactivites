using Application.Cores;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activites
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivitiyDto>>> 
        { 
            public AcitvityParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<ActivitiyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<ActivitiyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                .Where(d => d.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                .ProjectTo<ActivitiyDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername()})
                .AsQueryable();

                if(request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(a => a.username == _userAccessor.GetUsername()));
                }
                if(request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }
                return Result<PagedList<ActivitiyDto>>.Success(
                    await PagedList<ActivitiyDto>.CreateAsynce(query , request.Params.PageNumber , request.Params.PageSize)
                );
            }
        }
    }
}