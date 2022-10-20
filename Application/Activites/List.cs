using Application.Cores;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activites
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivitiyDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<ActivitiyDto>>>
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

            public async Task<Result<List<ActivitiyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                .ProjectTo<ActivitiyDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername()})
                .ToListAsync(cancellationToken);
                return Result<List<ActivitiyDto>>.Success(activities);
            }
        }
    }
}