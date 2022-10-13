using Application.Cores;
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

            public Handler(DataContext context , IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ActivitiyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                .ProjectTo<ActivitiyDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                return Result<List<ActivitiyDto>>.Success(activities);
            }
        }
    }
}